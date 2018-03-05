<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "schedule_detail".
 *
 * @property int $id
 * @property int $schedule_id
 * @property string $description
 * @property string $start_time
 * @property string $end_time
 * @property int $status
 */
class ScheduleDetail extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'schedule_detail';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['schedule_id', 'status'], 'integer'],
            [['description', 'start_time', 'end_time'], 'required'],
            [['description'], 'string'],
            [['start_time', 'end_time'], 'safe'],
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
            'description' => 'Description',
            'start_time' => 'Start Time',
            'end_time' => 'End Time',
            'status' => 'Status',
        ];
    }
}
