<?php

    namespace app\controllers;

    use app\models\Schedule;
    use Yii;
    use yii\base\Object;
    use yii\web\Controller;
    use yii\web\Response;

    class SiteController extends Controller
    {

        public function actionPing()
        {
            $this->actionGenerate();
            $response = new Response();
            $response->statusCode = 200;
            $response->data = Yii::t('app','pong');

            return $response;
        }

        public function actionGenerate()
        {
            for ($i = 1; $i < 20; $i++) {

                $schedule = new Schedule();
                $schedule->class_id = 1;
                $schedule->teacher_id = 2;
                $schedule->school_id = 1;
                $schedule->title = 'Tiêu đề ';
                $schedule->description = 'Mô tả lịch trình ';
                $schedule->save();
            }
        }

        public function actionError() {

            $response = new Response();
            $response->statusCode = 400;
            $response->data = json_encode([
                "name"      => "Bad Request",
                "message"   => Yii::t('app', 'The system could not process your request. Please check and try again.'),
                "code"      => 0,
                "status"    => 400,
                "type"      => "yii\\web\\BadRequestHttpException"
            ]);

            return $response;
        }


    }
