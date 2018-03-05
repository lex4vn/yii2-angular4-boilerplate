<?php

namespace app\models;

use app\models\query\ActivityQuery;
use Yii;

/**
 * This is the model class for table "activity".
 *
 * @property int $id
 * @property string $title
 * @property int $class_id
 * @property int $teacher_id
 * @property int $status
 * @property int $created_by
 * @property int $updated_by
 * @property string $created_at
 * @property string $updated_at
 * @property User $teacher
 * @property SchoolClass $schoolClass
 * @property ActivityAttachment[] $activityAttachments
 */
class Activity extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'activity';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title'], 'required'],
            [['class_id', 'teacher_id', 'status', 'created_by', 'updated_by'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
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
            'class_id' => 'Class ID',
            'teacher_id' => 'Teacher ID',
            'status' => 'Status',
            'created_by' => 'Created By',
            'updated_by' => 'Updated By',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getActivityAttachments()
    {
        return $this->hasMany(ActivityAttachment::className(), ['activity_id' => 'id']);
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
     * @return ActivityQuery
     */
    public static function find()
    {
        return new ActivityQuery(get_called_class());
    }
}
