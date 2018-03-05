<?php

use yii\db\Migration;

/**
 * Class m180305_044535_seed_activity
 */
class m180305_044535_seed_activity extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->batchInsert('activity', ['id', 'title', 'class_id', 'teacher_id', 'status', 'created_by', 'updated_by', 'created_at', 'updated_at'],
            [
                [1, 'Chơi ở công viên Cầu Giấy', 1, 1, 1,1,1,'2018-06-04 00:13:29',null],
                [2, 'Tham quan Bảo Tàng Dân Tộc Học', 1, 1, 1,1,1,'2018-01-01 00:13:29',null],
            ]);

        $this->batchInsert('activity_attachment', ['id', 'activity_id', 'path', 'type', 'size', 'name', 'created_at'],
            [
                [1, 1, 'http://avengerapp.com/activity/1/images/1.jpg', 'jpg', 2,'ảnh 1','2018-06-04 00:13:29'],
                [2, 1, 'http://avengerapp.com/activity/1/images/2.jpg', 'jpg', 2,'ảnh 2','2018-06-04 00:13:29'],
                [3, 1, 'http://avengerapp.com/activity/1/images/3.jpg', 'jpg', 2,'ảnh 3','2018-06-04 00:13:29'],
                [4, 1, 'http://avengerapp.com/activity/2/images/1.jpg', 'jpg', 2,'ảnh 1','2018-06-04 00:13:29'],
                [5, 1, 'http://avengerapp.com/activity/2/images/2.jpg', 'jpg', 2,'ảnh 2','2018-06-04 00:13:29'],
            ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {

    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180305_044535_seed_activity cannot be reverted.\n";

        return false;
    }
    */
}
