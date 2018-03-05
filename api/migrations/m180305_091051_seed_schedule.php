<?php

use yii\db\Migration;

/**
 * Class m180305_091051_seed_schedule
 */
class m180305_091051_seed_schedule extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {

        $this->batchInsert('schedule', ['id', 'title', 'description', 'schedule_time', 'teacher_id', 'class_id', 'school_id', 'status'],
            [
                [1, 'Chơi ở công viên Cầu Giấy', 'Chơi ở công viên Cầu Giấy', '2018-06-04 00:13:29',1,1,1,1],
                [2, 'Tham quan Bảo Tàng Dân Tộc Học', 'Tham quan Bảo Tàng Dân Tộc Học', '2018-01-01 00:13:29',1,1,1,1],
            ]);

        $this->batchInsert('schedule_detail', ['id', 'schedule_id', 'description', 'start_time', 'end_time', 'status'],
            [
                [1, 1, 'Đi chơi 1', '8:30','9:30',1],
                [2, 1, 'Đi chơi 2', '8:30','9:30',1],
                [3, 1, 'Đi chơi 3', '8:30','9:30',1],
                [4, 1, 'Đi chơi 4', '8:30','9:30',1],
                [5, 1, 'Đi chơi 5', '8:30','9:30',1],
            ]);

        $this->batchInsert('note', ['id', 'schedule_id', 'kid_id', 'note', 'created_at', 'status'],
            [
                [1, 1,1, 'Rất tốt', '2018-06-04 00:13:29',1],
                [2, 2,1, 'Hôm nay em rất giỏi', '2018-06-04 00:13:29',1],
                [3, 3,1, 'Em ngoan', '2018-06-04 00:13:29',1],
                [4, 4,1, 'Em hư', '2018-06-04 00:13:29',1],
                [5, 5,1, 'E rất nghịch', '2018-06-04 00:13:29',1],
            ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180305_091051_seed_schedule cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180305_091051_seed_schedule cannot be reverted.\n";

        return false;
    }
    */
}
