<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "schedule".
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property date $schedule_date
 * @property int $teacher_id
 * @property int $class_id
 * @property int $school_id
 * @property int $status
 */
class Schedule extends \yii\db\ActiveRecord
{
    const STATUS_DELETED = -1;
    const STATUS_DISABLED = 0;
    const STATUS_PENDING = 1;
    const STATUS_ACTIVE = 10;
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
            [['schedule_date'], 'safe'],
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
            'schedule_date' => 'Schedule Time',
            'teacher_id' => 'Teacher ID',
            'class_id' => 'Class ID',
            'school_id' => 'School ID',
            'status' => 'Status',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDetails()
    {
        return $this->hasMany(ScheduleDetail::className(), ['schedule_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSchoolClass()
    {
        return $this->hasOne(SchoolClass::className(), ['id' => 'class_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTeacher()
    {
        return $this->hasOne(User::className(), ['id' => 'teacher_id']);
    }


    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNote()
    {
        return $this->hasOne(Note::className(),  ['schedule_id' => 'id']);
    }
}
