<?php

use yii\db\Migration;

/**
 * Class m180303_042750_post
 */
class m180303_042750_post extends Migration
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

        $this->createTable('{{%post}}', [
            'id' => $this->primaryKey(),
            'content' => $this->text()->notNull(),
            'count_like' => $this->integer(),
            'count_comment' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
            'created_by' => $this->integer(),
            'published_at' => $this->timestamp(),
            'created_at' => $this->timestamp(),
            'updated_at' => $this->timestamp(),
        ], $tableOptions);

        $this->createTable('{{%comment}}', [
            'id' => $this->primaryKey(),
            'content' => $this->text()->notNull(),
            'post_id' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
            'created_by' => $this->integer(),
            'created_at' => $this->timestamp(),
            'updated_at' => $this->timestamp(),
        ], $tableOptions);

        $this->createTable('{{%like_post}}', [
            'id' => $this->primaryKey(),
            'post_id' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
            'created_by' => $this->integer(),
            'created_at' => $this->timestamp(),
        ], $tableOptions);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%like_post}}');
        $this->dropTable('{{%comment}}');
        $this->dropTable('{{%post}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180303_042750_post cannot be reverted.\n";

        return false;
    }
    */
}
