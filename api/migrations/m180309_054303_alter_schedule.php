<?php

use yii\db\Migration;

/**
 * Class m180309_054303_alter_schedule
 */
class m180309_054303_alter_schedule extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->renameColumn('schedule', 'schedule_time', 'schedule_date');
        $this->alterColumn('schedule', 'schedule_date','date');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180309_054303_alter_schedule cannot be reverted.\n";

        return false;
    }
    */
}
