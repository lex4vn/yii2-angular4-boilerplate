<?php

use yii\db\Migration;

/**
 * Class m180323_033000_user_kid
 */
class m180323_033000_user_kid extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('user', 'kid_name', $this->string());
        $this->addColumn('user', 'kid_avatar', $this->string());

        //ALTER TABLE `user` CHANGE `kid_name` `kid_name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE `kid_avatar` `kid_avatar` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('user', 'kid_name');
        $this->dropColumn('user', 'kid_avatar');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180323_033000_user_kid cannot be reverted.\n";

        return false;
    }
    */
}
