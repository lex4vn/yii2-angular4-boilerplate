<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "schedule".
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $schedule_time
 * @property int $teacher_id
 * @property int $class_id
 * @property int $school_id
 * @property int $status
 */
class Schedule extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'schedule';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'description'], 'required'],
            [['description'], 'string'],
            [['schedule_time'], 'safe'],
            [['teacher_id', 'class_id', 'school_id', 'status'], 'integer'],
            [['title'], 'string', 'max' => 512],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'description' => 'Description',
            'schedule_time' => 'Schedule Time',
            'teacher_id' => 'Teacher ID',
            'class_id' => 'Class ID',
            'school_id' => 'School ID',
            'status' => 'Status',
        ];
    }
}
