<?php
/**
 * Created by PhpStorm.
 * User: zein
 * Date: 7/4/14
 * Time: 2:31 PM
 */

namespace app\models\query;

use common\models\Article;
use yii\db\ActiveQuery;

class ArticleQuery extends ActiveQuery
{
    public function published()
    {
        $this->andWhere(['status' => Article::STATUS_PUBLISHED]);
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
