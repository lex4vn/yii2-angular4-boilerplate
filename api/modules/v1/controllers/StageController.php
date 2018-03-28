<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\SchoolClass;
use app\models\Stage;
use app\models\User;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

class StageController extends ActiveController
{
    public $modelClass = 'app\models\Stage';

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
                'view' => ['get'],
                'create' => ['post'],
                'update' => ['put'],
                'delete' => ['delete'],
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
        $behaviors['authenticator']['except'] = ['options'];


        // setup access
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['index', 'view', 'create', 'update', 'delete'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index','kids', 'view', 'create', 'update', 'delete'],
                    'roles' => ['admin', 'manageUsers'],
                ],
            ],
        ];

        return $behaviors;
    }

    public function actionKids()
    {
        $user = User::findIdentity(\Yii::$app->user->getId());
        //return $user;
        // Role Staff
        if(50 == $user->role){
            //Find class
            $schoolClass = SchoolClass::find()->where(['teacher_id'=>$user->id])->one();
            if($schoolClass){
                return new ActiveDataProvider([
                    'query' => User::find()
                        ->where([
                            '!=', 'status', -1
                        ])->andWhere([
                            'role' => User::ROLE_USER,
                            'class_id' => $schoolClass->id,
                        ])
                ]);
            }else{
                return null;
            }
        }

        return new ActiveDataProvider([
            'query' => User::find()->where([
                '!=', 'status', -1
            ])->andWhere([
                'role' => User::ROLE_USER
            ])
        ]);
    }

    public function actionIndex()
    {
        $class_id = 1;
        $date = Yii::$app->request->get('date');
        if (!$date) {
            $date = date('Y-m-d');
        }
        $exists = Stage::find()->where(['class_id'=>$class_id,'commented_at'=>$date])->exists();
        if(!$exists){
            //create stage for all student in class id
            $students = User::find()->where(['class_id'=>1])->all();

            foreach($students as $student){
                $stage = new Stage();
                $stage->class_id = $class_id;
                $stage->kid_id = $student->id;
                $stage->commented_at = $date;
                $stage->status = Stage::STATUS_ACTIVE;
                $stage->save();
            }

        }
        return new ActiveDataProvider([
            'query' => Stage::find()
                ->select('stage.*,user.username as kid_name')
                ->joinWith(['kid'])
                ->where([
                '!=', 'stage.status', -1
            ])
//                ->andWhere([
//                'class_id' => 1
//            ])
        ]);
    }

    public function actionView($id)
    {
        $staff = Stage::find()->where([
            'id' => $id
        ])->andWhere([
            '!=', 'status', -1
        ])
//            ->andWhere([
//            'role' => User::ROLE_USER
//        ])
            ->one();


        if ($staff) {
            return $staff;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate()
    {
        $model = new Stage();
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

        $model->status = User::STATUS_DELETED;

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