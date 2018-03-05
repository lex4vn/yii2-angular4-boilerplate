<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "activity_attachment".
 *
 * @property int $id
 * @property int $activity_id
 * @property string $path
 * @property string $type
 * @property int $size
 * @property string $name
 * @property string $created_at
 */
class ActivityAttachment extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'activity_attachment';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['activity_id'], 'required'],
            [['activity_id', 'size'], 'integer'],
            [['created_at'], 'safe'],
            [['path', 'type', 'name'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'activity_id' => 'Activity ID',
            'path' => 'Path',
            'type' => 'Type',
            'size' => 'Size',
            'name' => 'Name',
            'created_at' => 'Created At',
        ];
    }
}
