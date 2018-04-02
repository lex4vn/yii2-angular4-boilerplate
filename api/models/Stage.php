<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "stage".
 *
 * @property int $id
 * @property int $kid_id
 * @property int $class_id
 * @property int $status
 * @property string $commented_at
 */
class Stage extends \yii\db\ActiveRecord
{
    const STATUS_DELETED = -1;
    const STATUS_DISABLED = 3;
    const STATUS_PENDING = 2;
    const STATUS_ACTIVE = 1;

    public $kid_name;
    public $class_name;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'stage';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['kid_id', 'class_id', 'status'], 'integer'],
            [['commented_at'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'kid_id' => 'Kid ID',
            'class_id' => 'Class ID',
            'status' => 'Status',
            'commented_at' => 'Commented At',
        ];
    }

    public function fields()
    {
        $fields = [
            'id',
            'kid_id',
            'class_id',
            'status',
            'commented_at',
            'kid_name',
            'class_name',
        ];
        return $fields;
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getKid()
    {
        return $this->hasOne(User::className(), ['id' => 'kid_id']);
    }
}
