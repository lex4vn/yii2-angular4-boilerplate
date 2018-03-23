<?php

use yii\db\Migration;

/**
 * Class m180323_085724_article_link
 */
class m180323_085724_article_link extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('article', 'link', $this->string());
        //ALTER TABLE `article` CHANGE `body` `body` TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL;
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('article', 'link');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180323_085724_article_link cannot be reverted.\n";

        return false;
    }
    */
}
