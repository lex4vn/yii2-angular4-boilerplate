<?php

namespace app\models\query;

use app\models\Activity;
use yii\db\ActiveQuery;

class ActivityQuery extends ActiveQuery
{
    public function published()
    {
        $this->andWhere(['status' => Activity::STATUS_PUBLISHED]);
        $this->andWhere(['<', '{{%article}}.published_at', time()])->orderBy('id Desc');
        return $this;
    }

    public function edu()
    {
        $this->andWhere(['category_id' => 1]);
        return $this;
    }

    public function category($id)
    {
        $this->andWhere(['category_id' => $id]);
        return $this;
    }
}
