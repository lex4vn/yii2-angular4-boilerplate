<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\LoginForm;
use app\models\PasswordResetForm;
use app\models\PasswordResetRequestForm;
use app\models\PasswordResetTokenVerificationForm;
use app\models\SchoolClass;
use app\models\SignupConfirmForm;
use app\models\SignupForm;
use app\models\User;
use app\models\UserEditForm;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\HttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

class ClazzController extends ActiveController
{
    public $modelClass = 'app\models\SchoolClass';

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
        $behaviors['authenticator']['except'] = ['options', 'login', 'signup', 'confirm', 'password-reset-request', 'password-reset-token-verification', 'password-reset'];


        // setup access
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['index','list','view', 'create', 'update', 'delete'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index','list', 'view', 'create', 'update', 'delete'],
                    'roles' => ['admin', 'manageUsers'],
                ]
            ],
        ];

        return $behaviors;
    }

    public function actionList()
    {
        //$user = User::findIdentity(\Yii::$app->user->getId());
        return new ActiveDataProvider([
            'query' => SchoolClass::find()->where([
                '!=', 'status', -1
            ])
        ]);
    }

    public function actionIndex()
    {
        $user = User::findIdentity(\Yii::$app->user->getId());
        return new ActiveDataProvider([
            'query' => SchoolClass::find()->where([
                '!=', 'status', -1
            ])->andWhere([
                'teacher_id' => $user->id
            ])
        ]);
    }

    public function actionView($id)
    {
        $user = User::findIdentity(\Yii::$app->user->getId());
        $schoolClass = SchoolClass::find()->where([
            'id' => $id
        ])->andWhere([
            '!=', 'status', -1
        ])
//            ->andWhere([
//            'teacher_id' => $user->id
//        ])
            ->one();


        if ($schoolClass) {
            return $schoolClass;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate()
    {
        $user = User::findIdentity(\Yii::$app->user->getId());
        $model = new SchoolClass();
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

        $model->status = SchoolClass::STATUS_DELETED;

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