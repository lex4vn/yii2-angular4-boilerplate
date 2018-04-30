<?php

use yii\db\Migration;

/**
 * Class m180323_175838_stage
 */
class m180409_175838_freeday extends Migration
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

        $this->createTable('{{%freeday}}', array(
            'frid' => $this->primaryKey(),
            'userid' => $this->integer(),
            'classid' => $this->integer(),
            'schoolid' => $this->integer(),
            'date' => $this->date(),
            'comment' => $this->string(300),
        ), $tableOptions);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%freeday}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180409_175838_freeday cannot be reverted.\n";

        return false;
    }
    */
}
