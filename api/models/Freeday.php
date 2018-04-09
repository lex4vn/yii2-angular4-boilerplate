<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "freeday".
 *
 * @property int $frid
 * @property int $userid
 * @property int $classid
 * @property int $schoolid
 * @property string $date
 * @property string $comment
 */
class Freeday extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'freeday';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['userid', 'classid', 'schoolid'], 'integer'],
            [['date'], 'safe'],
            [['comment'], 'string', 'max' => 300],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'frid' => 'Frid',
            'userid' => 'Userid',
            'classid' => 'Classid',
            'schoolid' => 'Schoolid',
            'date' => 'Date',
            'comment' => 'Comment',
        ];
    }
}
