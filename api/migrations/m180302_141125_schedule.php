<?php

use yii\db\Migration;

/**
 * Class m180302_141125_schedule
 */
class m180302_141125_schedule extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%school}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(512)->notNull(),
            'description' => $this->text(),
            'address' => $this->string(512)->notNull(),
            'master_id' => $this->integer(),
            'number_class' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
        ], $tableOptions);

        $this->createTable('{{%school_class}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(512)->notNull(),
            'description' => $this->text(),
            'teacher_id' => $this->integer(),
            'school_id' => $this->integer(),
            'number_kid' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
        ], $tableOptions);

        $this->createTable('{{%event}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(512)->notNull(),
            'description' => $this->text()->notNull(),
            'event_time' => $this->timestamp()->notNull(),
            'teacher_id' => $this->integer(),
            'class_id' => $this->integer(),
            'school_id' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
        ], $tableOptions);

        $this->createTable('{{%schedule}}', [
            'id' => $this->primaryKey(),
            'title' => $this->string(512)->notNull(),
            'description' => $this->text()->notNull(),
            'schedule_time' => $this->timestamp()->notNull(),
            'teacher_id' => $this->integer(),
            'class_id' => $this->integer(),
            'school_id' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
        ], $tableOptions);

        $this->createTable('{{%schedule_detail}}', [
            'id' => $this->primaryKey(),
            'schedule_id' => $this->integer(),
            'description' => $this->text()->notNull(),
            'start_time' => $this->time()->notNull(),
            'end_time' => $this->time()->notNull(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
        ], $tableOptions);

        $this->createTable('{{%note}}', [
            'id' => $this->primaryKey(),
            'schedule_id' => $this->integer(),
            'kid_id' => $this->integer(),
            'note' => $this->text()->notNull()->comment('Ghi chú của giáo viên'),
            'created_at' => $this->timestamp(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
        ], $tableOptions);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%note}}');
        $this->dropTable('{{%schedule_detail}}');
        $this->dropTable('{{%schedule}}');
        $this->dropTable('{{%event}}');
        $this->dropTable('{{%school_class}}');
        $this->dropTable('{{%school}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180302_141125_schedule cannot be reverted.\n";

        return false;
    }
    */
}
