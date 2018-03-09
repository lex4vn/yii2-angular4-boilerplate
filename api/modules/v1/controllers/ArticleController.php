<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\Article;
use Yii;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\rest\ActiveController;

class ArticleController extends ActiveController
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
                'view' => ['get'],
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
        $behaviors['authenticator']['except'] = ['index', 'view'];
        // setup access
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['index', 'view'], //only be applied to
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index', 'view'],
                    'roles' => ['?'],
                ],
            ],
        ];

        return $behaviors;
    }

    public function actionIndex()
    {
        $page_size = Yii::$app->request->get('page_size');
        $page_index = Yii::$app->request->get('page_index');
        if (!$page_size) {
            $page_size = 3;
        }

        if (!$page_index) {
            $page_index = 1;
        }

        $index = $page_size * ($page_index - 1);

        $response = \Yii::$app->getResponse();
        $response->setStatusCode(200);

        $articles = Article::find()->limit($page_size)->offset($index)->all();
        $articlesResult = [];

        foreach ($articles as $article) {

            $articlesResult[] = array(
                'id' => $article->id,
                'title' => $article->title,
                'thumbnail' => $article->thumbnailUrl,
                'link' => $article->link,
                'created_at' => date('Y/m/d h:i:s', $article->created_at),

            );
        }
        return $articlesResult;
    }

    public function actionView($id)
    {
        $article = Article::find()->where([
            'id' => $id
        ])->andWhere([
            '!=', 'status', -1
        ])->one();
        if ($article) {
            return array(
                'id' => $article->id,
                'title' => $article->title,
                'body' => $article->body,
                'thumbnail' => $article->thumbnailUrl,
                'created_at' => date('Y/m/d h:i:s', $article->created_at)
            );
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }
}