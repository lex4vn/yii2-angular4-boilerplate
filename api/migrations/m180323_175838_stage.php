<?php

use yii\db\Migration;

/**
 * Class m180323_175838_stage
 */
class m180323_175838_stage extends Migration
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

        $this->createTable('{{%stage}}', [
            'id' => $this->primaryKey(),
            'kid_id' => $this->integer(),
            'class_id' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(1),
            'commented_at' => $this->date(),
        ], $tableOptions);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%stage}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180323_175838_stage cannot be reverted.\n";

        return false;
    }
    */
}
