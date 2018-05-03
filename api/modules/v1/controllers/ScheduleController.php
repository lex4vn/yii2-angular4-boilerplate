<?php

namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\Schedule;
use app\models\User;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;

class ScheduleController extends ActiveController
{
    public $modelClass = 'app\models\Schedule';

    public function __construct($id, $module, $config = [])
    {
        parent::__construct($id, $module, $config);

    }

    public function actions()
    {
        return [];
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBearerAuth::className(),
            ],

        ];

        $behaviors['verbs'] = [
            'class' => \yii\filters\VerbFilter::className(),
            'actions' => [
                'index' => ['get'],
                'schedules' => ['get'],
            ],
        ];

        // remove authentication filter
        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);

        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
            ],
        ];

        // re-add authentication filter
        $behaviors['authenticator'] = $auth;
        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)

        // setup access
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['index'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index', 'schedules'],
                    'roles' => ['admin', 'manageUsers'],
                ],
                [
                    'allow' => true,
                    'actions' => ['index'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }

    public function actionIndex()
    {
        $user = User::findIdentity(\Yii::$app->user->getId());

        $date = Yii::$app->request->get('date');
        if (!$date) {
            $date = date('Y-m-d');
        }

        if ($user) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);

            $schedule = Schedule::find()->where(['schedule_date' => $date])->one();

            if ($schedule) {
                return array(
                    'id' => $schedule->id,
                    'title' => $schedule->title,
                    'class_id' => $schedule->class_id,
                    'class_name' => $schedule->schoolClass ? $schedule->schoolClass->name : '',
                    'teacher_id' => $schedule->teacher_id,
                    'teacher_name' => $schedule->teacher ? $schedule->teacher->fullName : '',
                    'status' => $schedule->status,
                    'schedule_date' => $schedule->schedule_date,
                    'details' => $schedule->details,
                    'note' => $schedule->note?$schedule->note->note:'',
                );
            } else {
                return null;
            }
        } else {
            // Validation error
            throw new NotFoundHttpException("Object not found");
        }
    }

    public function actionSchedules()
    {
        return new ActiveDataProvider([
            'query' => Schedule::find()->where([
                '!=', 'status', -1
            ])
        ]);
    }

    public function actionView($id)
    {
        $user = User::findIdentity(\Yii::$app->user->getId());
        $schedule = Schedule::find()->where([
            'id' => $id
        ])->andWhere([
            '!=', 'status', -1
        ])
//            ->andWhere([
//            'teacher_id' => $user->id
//        ])
            ->one();


        if ($schedule) {
            return $schedule;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate()
    {
        $user = User::findIdentity(\Yii::$app->user->getId());
        $model = new Schedule();
        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');
        $model->teacher_id = $user->id;

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', array_values($model->getPrimaryKey(true)));
            $response->getHeaders()->set('Location', Url::toRoute([$id], true));
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }

        return $model;
    }

    public function actionUpdate($id)
    {
        $model = $this->actionView($id);

        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

        if ($model->validate() && $model->save()) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);
        } else {
            // Validation error
            throw new HttpException(422, json_encode($model->errors));
        }

        return $model;
    }

    public function actionDelete($id)
    {
        $model = $this->actionView($id);

        $model->status = Schedule::STATUS_DELETED;

        if ($model->save(false) === false) {
            throw new ServerErrorHttpException('Failed to delete the object for unknown reason.');
        }

        $response = \Yii::$app->getResponse();
        $response->setStatusCode(204);
        return "ok";
    }

    public function actionOptions($id = null)
    {
        return "ok";
    }
}