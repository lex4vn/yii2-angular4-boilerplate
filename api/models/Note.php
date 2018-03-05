<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "note".
 *
 * @property int $id
 * @property int $schedule_id
 * @property int $kid_id
 * @property string $note Ghi chú của giáo viên
 * @property string $created_at
 * @property int $status
 */
class Note extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'note';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['schedule_id', 'kid_id', 'status'], 'integer'],
            [['note'], 'required'],
            [['note'], 'string'],
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
            'schedule_id' => 'Schedule ID',
            'kid_id' => 'Kid ID',
            'note' => 'Note',
            'created_at' => 'Created At',
            'status' => 'Status',
        ];
    }
}
