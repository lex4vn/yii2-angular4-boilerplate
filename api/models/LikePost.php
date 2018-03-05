<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "like_post".
 *
 * @property int $id
 * @property int $post_id
 * @property int $status
 * @property int $created_by
 * @property string $created_at
 */
class LikePost extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'like_post';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['post_id', 'status', 'created_by'], 'integer'],
            [['created_at'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'post_id' => 'Post ID',
            'status' => 'Status',
            'created_by' => 'Created By',
            'created_at' => 'Created At',
        ];
    }
}
