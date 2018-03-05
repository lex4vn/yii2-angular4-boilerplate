<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\Activity;
use app\models\Event;
use app\models\LoginForm;
use app\models\PasswordResetForm;
use app\models\PasswordResetRequestForm;
use app\models\PasswordResetTokenVerificationForm;
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

class HomeController extends ActiveController
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
                    'actions' => ['index'],
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

        if ($user) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(200);
            $events = Event::find()->limit(3)->all();
            $eventsResult = [];
            foreach($events as $event){
                $eventsResult[] = array(
                    'id'=> $event->id,
                    'name'=> $event->name,
                    'description'=> $event->description,
                    'event_time'=> $event->event_time,
                    'teacher_id'=> $event->teacher_id,
                    'teacher_name'=> $event->teacher->fullName,
                    'class_id'=> $event->class_id,
                    'class_name'=> $event->schoolClass->name,
                    'school_id'=> $event->school_id,
                    'school_name'=> $event->school->name,
                    'status'=> $event->status,
                );
            }

            $activities = Activity::find()->limit(3)->all();
            $activitiesResult = [];

            foreach($activities as $activity){

                $images = $activity->activityAttachments;

                $activitiesResult[] = array(
                    'id'=> $activity->id,
                    'title'=> $activity->title,
                    'class_id'=> $activity->title,
                    'class_name'=> $activity->schoolClass->name,
                    'teacher_id'=> $activity->teacher_id,
                    'teacher_name'=> $activity->teacher->fullName,
                    'status'=> $activity->status,
                    'created_at'=> $activity->created_at,
                    'images'=> $images,
                );
            }
            return [
                'events' => $eventsResult,
                'activities' => $activitiesResult,
                'emotion' => 1
            ];
        } else {
            // Validation error
            throw new NotFoundHttpException("Object not found");
        }
    }
}