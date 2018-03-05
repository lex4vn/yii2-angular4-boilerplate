<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "school".
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $address
 * @property int $master_id
 * @property int $number_class
 * @property int $status
 */
class School extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'school';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'address'], 'required'],
            [['description'], 'string'],
            [['master_id', 'number_class', 'status'], 'integer'],
            [['name', 'address'], 'string', 'max' => 512],
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
            'address' => 'Address',
            'master_id' => 'Master ID',
            'number_class' => 'Number Class',
            'status' => 'Status',
        ];
    }
}
