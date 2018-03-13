<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "school_class".
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $teacher_id
 * @property int $school_id
 * @property int $status
 */
class SchoolClass extends \yii\db\ActiveRecord
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
        return 'school_class';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['description'], 'string'],
            [['teacher_id', 'school_id', 'status'], 'integer'],
            [['name'], 'string', 'max' => 512],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'description' => 'Description',
            'teacher_id' => 'Teacher ID',
            'school_id' => 'School ID',
            'status' => 'Status',
        ];
    }
}
