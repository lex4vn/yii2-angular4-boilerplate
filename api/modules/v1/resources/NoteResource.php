<?php

namespace app\modules\v1\resources;


class NoteResource extends \app\models\Note
{
    public $kid_name;
    public $schedule_title;
    public function fields()
    {
        return ['id',
            'schedule_id',
            'schedule_title',
            'kid_id',
            'kid_name',
            'note',
            'created_at',
            'status'];
    }

    public function extraFields()
    {
        return ['kid'];
    }
}
