<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\helper\FirebaseHelper;
use app\models\Activity;
use app\models\Post;
use app\models\User;
use Yii;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;

class PostController extends ActiveController
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

            $posts = Post::find()->limit($page_size)->offset($index)->all();
            $postsResult = [];

            foreach ($posts as $post) {

                $postsResult[] = array(
                    'id' => $post->id,
                    'content' => $post->content,
                    'count_like' => $post->count_like,
                    'count_comment' => $post->count_comment,
                    'created_by' => $post->created_by,
                    'created_name' => $post->user->fullName,
                    'created_at' => $post->created_at,
                    'updated_at' => $post->updated_at,
                );
            }
            return $postsResult;
        } else {
            // Validation error
            throw new NotFoundHttpException("Object not found");
        }
    }

    public function actionCreate()
    {

        $response = \Yii::$app->getResponse();
        $response->setStatusCode(200);

        $service = new FirebaseHelper(['authKey' => 'YOUR_KEY']);
        $tokens  = []; // Device token
        $service->sendNotification($tokens, 'Test notification');
        return 1;
    }

}