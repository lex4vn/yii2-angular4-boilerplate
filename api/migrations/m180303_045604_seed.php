<?php

use yii\db\Migration;

/**
 * Class m180303_045604_seed
 */
class m180303_045604_seed extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->batchInsert('school', ['id', 'name', 'description', 'address', 'master_id', 'number_class', 'status'],
            [
            [1, 'Thang Long Kidsmart', 'Truong Thang Long Kidsmart', 'Dich Vong', 1, 30,1],
            [2, 'Dich Vong Hau', 'Dich Vong Hau', 'Dich Vong Hau', 1, 50,1],
            [3, 'Sao Mai', 'Truong Sao Mai', 'Ba Dinh', 1, 30,1]
        ]);

        $this->batchInsert('school_class', ['id', 'name', 'description', 'teacher_id', 'number_kid',  'school_id', 'status'],
            [
                [1, 'Donal1', 'Donal1', 2, 30,1,1],
                [2, 'Donal2', 'Donal2', 2, 28,1,1],
                [3, 'Donal3', 'Donal3', 2, 25,1,1],
            ]);

        $this->batchInsert('event', ['id', 'name', 'description','event_time', 'teacher_id', 'class_id',  'school_id', 'status'],
            [
                [1, 'Chương trình học ngoại khóa', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ex nunc. Pellentesque tellus eros, molestie eget suscipit nec, lobortis vel diam. Ut congue lacus sit amet erat egestas, vitae bibendum turpis varius. Praesent eget ligula eget neque porttitor rutrum quis in ex. Integer at tellus nisl. Aliquam a auctor enim. In consectetur egestas odio ac ornare. Sed lacinia turpis tortor, vel vehicula quam sodales in. Fusce eu enim vitae odio feugiat vestibulum sed ac ligula.','2018-06-04 00:13:29', 2, 2,1,1],
                [2, 'Tham quan Bảo Tàng dân tộc học', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ex nunc. Pellentesque tellus eros, molestie eget suscipit nec, lobortis vel diam. Ut congue lacus sit amet erat egestas, vitae bibendum turpis varius. Praesent eget ligula eget neque porttitor rutrum quis in ex. Integer at tellus nisl. Aliquam a auctor enim. In consectetur egestas odio ac ornare. Sed lacinia turpis tortor, vel vehicula quam sodales in. Fusce eu enim vitae odio feugiat vestibulum sed ac ligula.','2018-06-05 00:13:29', 2, 2,1,1],
                [3, 'Vui chơi ở công viên Cầu Giấy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ex nunc. Pellentesque tellus eros, molestie eget suscipit nec, lobortis vel diam. Ut congue lacus sit amet erat egestas, vitae bibendum turpis varius. Praesent eget ligula eget neque porttitor rutrum quis in ex. Integer at tellus nisl. Aliquam a auctor enim. In consectetur egestas odio ac ornare. Sed lacinia turpis tortor, vel vehicula quam sodales in. Fusce eu enim vitae odio feugiat vestibulum sed ac ligula.','2018-06-06 00:13:29', 2, 2,1,1],
            ]);

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180303_045604_seed cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180303_045604_seed cannot be reverted.\n";

        return false;
    }
    */
}
