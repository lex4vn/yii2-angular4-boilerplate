<?php

use yii\db\Migration;

/**
 * Class m180302_080543_user_address
 */
class m180302_080543_user_address extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('user', 'address', $this->string(200)->after('full_name'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('user', 'address');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180302_080543_user_address cannot be reverted.\n";

        return false;
    }
    */
}
