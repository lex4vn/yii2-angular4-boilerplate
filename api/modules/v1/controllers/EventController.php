<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\Event;
use app\models\User;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;

class EventController extends ActiveController
{
    public $modelClass = 'app\models\Event';
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
                'events' => ['get'],
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
                    'actions' => ['index', 'events'],
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

            $event = Event::find()->where(['event_time'=>$date])->one();

            if ($event) {
                return array(
                    'id' => $event->id,
                    'title' => $event->title,
                    'class_id' => $event->class_id,
                    'class_name' => $event->schoolClass->name,
                    'teacher_id' => $event->teacher_id,
                    'teacher_name' => $event->teacher->fullName,
                    'status' => $event->status,
                    'event_time' => $event->event_time,
                    'details' => $event->details,
                    'note' => $event->note->note,
                );
            } else {
                return null;
            }
        } else {
            // Validation error
            throw new NotFoundHttpException("Object not found");
        }
    }

    public function actionEvents()
    {
        return new ActiveDataProvider([
            'query' => Event::find()->where([
                '!=', 'status', -1
            ])
        ]);
    }

    public function actionOptions($id = null)
    {
        return "ok";
    }
}