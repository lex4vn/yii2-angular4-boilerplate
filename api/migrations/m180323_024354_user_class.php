<?php

use yii\db\Migration;

/**
 * Class m180323_024354_user_class
 */
class m180323_024354_user_class extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('user', 'class_id', $this->integer()->after('full_name'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('user', 'class_id');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180323_024354_user_class cannot be reverted.\n";

        return false;
    }
    */
}
