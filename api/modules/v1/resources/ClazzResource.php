<?php

namespace app\modules\v1\resources;


class ClazzResource extends \app\models\SchoolClass
{
    public $school_name;
    public $teacher_name;
    public function fields()
    {
        return ['id',
            'name',
            'description',
            'teacher_id',
            'school_id',
            'school_name',
            'teacher_name',
            'status'];
    }
}
