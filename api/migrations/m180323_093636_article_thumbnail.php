<?php

use yii\db\Migration;

/**
 * Class m180323_093636_article_thumbnail
 */
class m180323_093636_article_thumbnail extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('article', 'thumbnail', $this->string());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('article', 'thumbnail');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180323_093636_article_thumbnail cannot be reverted.\n";

        return false;
    }
    */
}
