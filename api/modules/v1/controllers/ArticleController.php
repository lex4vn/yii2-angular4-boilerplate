<?php
namespace app\modules\v1\controllers;

use app\filters\auth\HttpBearerAuth;
use app\models\Article;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\filters\auth\CompositeAuth;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\HttpException;

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
                'list' => ['get'],
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
                'thumbnail' => $article->thumbnail,
                'created_at' => date('Y/m/d h:i:s', $article->created_at)
            );
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionList()
    {
        return new ActiveDataProvider([
            'query' => Article::find()->where([
                '!=', 'status', -1
            ])
//                ->andWhere([
//                'role' => User::ROLE_USER
//            ])
        ]);
    }

    public function actionNew($id)
    {
        $article = Article::find()->where([
            'id' => $id
        ])->andWhere([
            '!=', 'status', -1
        ])
//            ->andWhere([
//            'role' => User::ROLE_USER
//        ])
            ->one();


        if ($article) {
            return $article;
        } else {
            throw new NotFoundHttpException("Object not found: $id");
        }
    }

    public function actionCreate()
    {
        $model = new Article();
        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');

        // requires php5
        define('UPLOAD_DIR', 'images/news/');

        $img = $model->thumbnail;
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR . uniqid() . '.png';
        $success = file_put_contents($file, $data);
        $model->thumbnail =  $success ? $file : '';

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
        $model = $this->actionNew($id);

        $model->load(\Yii::$app->getRequest()->getBodyParams(), '');
        // requires php5
        define('UPLOAD_DIR', 'images/news/');
        if($model->thumbnail) {
            $img = $model->thumbnail;
            $img = str_replace('data:image/png;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            $file = UPLOAD_DIR . uniqid() . '.png';
            $success = file_put_contents($file, $data);
            $model->thumbnail = $success ? $file : '';
        }
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
        $model = $this->actionNew($id);

        $model->status = Article::STATUS_DELETED;

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