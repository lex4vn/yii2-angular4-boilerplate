<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\Activity;
use app\models\User;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\rest\ActiveController;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;

class ActivityController extends ActiveController
{
    public $modelClass = 'app\models\User';

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
                'activities' => ['get'],
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
            'only' => ['index','activities'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index','activities'],
                    'roles' => ['admin', 'manageUsers'],
                ],
                [
                    'allow' => true,
                    'actions' => ['index','activities'],
                    'roles' => ['user']
                ]
            ],
        ];

        return $behaviors;
    }

    public function actionIndex()
    {
        $user = User::findIdentity(\Yii::$app->user->getId());
        $page_size = Yii::$app->request->get('page_size');
        $page_index = Yii::$app->request->get('page_index');
        if (!$page_size) {
            $page_size = 3;
        }

        if (!$page_index) {
            $page_index = 1;
        }

        $index = $page_size * ($page_index - 1);

        if ($user) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);

            $activities = Activity::find()->limit($page_size)->offset($index)->all();
            $activitiesResult = [];

            foreach ($activities as $activity) {

                $images = $activity->activityAttachments;

                $activitiesResult[] = array(
                    'id' => $activity->id,
                    'title' => $activity->title,
                    'class_id' => $activity->title,
                    'class_name' => $activity->schoolClass->name,
                    'teacher_id' => $activity->teacher_id,
                    'teacher_name' => $activity->teacher->fullName,
                    'status' => $activity->status,
                    'created_at' => $activity->created_at,
                    'images' => $images,
                );
            }
            return $activitiesResult;
        } else {
            // Validation error
            throw new NotFoundHttpException("Object not found");
        }
    }

    public function actionActivities()
    {
        return new ActiveDataProvider([
            'query' => Activity::find()->where([
                '!=', 'status', -1
            ])
//                ->andWhere([
//                'role' => User::ROLE_USER
//            ])
        ]);
    }

    public function actionView($id)
    {
        $activity = Activity::find()->where([
            'id' => $id
        ])->andWhere([
            '!=', 'status', -1
        ])
//            ->andWhere([
//            'role' => User::ROLE_USER
//        ])
            ->one();


        if ($activity) {
            return $activity;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate()
    {
        $model = new Activity();
        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

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

        $model->status = Activity::STATUS_DELETED;

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