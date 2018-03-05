<?php

use yii\db\Migration;

/**
 * Class m180303_122628_activity
 */
class m180303_122628_activity extends Migration
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

        $this->createTable('{{%activity}}', [
            'id' => $this->primaryKey(),
            'title' => $this->string(512)->notNull(),
            'class_id' => $this->integer(),
            'teacher_id' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
            'created_by' => $this->integer(),
            'updated_by' => $this->integer(),
            'created_at' => $this->timestamp(),
            'updated_at' => $this->timestamp(),
        ], $tableOptions);

        $this->createTable('{{%activity_attachment}}', [
            'id' => $this->primaryKey(),
            'activity_id' => $this->integer()->notNull(),
            'path' => $this->string(),
            'type' => $this->string(),
            'size' => $this->integer(),
            'name' => $this->string(),
            'created_at' => $this->timestamp()
        ], $tableOptions);

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%activity_attachment}}');
        $this->dropTable('{{%activity}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180303_122628_activity cannot be reverted.\n";

        return false;
    }
    */
}
