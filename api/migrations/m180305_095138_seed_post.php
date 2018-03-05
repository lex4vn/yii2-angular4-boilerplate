<?php

use yii\db\Migration;

/**
 * Class m180305_095138_seed_post
 */
class m180305_095138_seed_post extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {

        $this->batchInsert('post', ['id', 'content', 'count_like', 'count_comment', 'created_by', 'published_at', 'created_at', 'updated_at'],
            [
                [1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae tellus sit amet purus pulvinar fermentum. Vivamus ultrices scelerisque odio et euismod. Fusce id augue id metus placerat aliquet. Nulla ut lectus consequat, blandit orci id, tempor ligula. Etiam semper suscipit massa, et scelerisque enim egestas in. Integer et justo in felis sodales iaculis. Morbi nunc augue, faucibus nec lacus in, ultricies facilisis dui. Aliquam maximus lacus nec ipsum mattis, eget venenatis ipsum viverra.',0,0, 1, '2018-06-04 00:13:29','2018-06-04 00:13:29', '2018-06-04 00:13:29'],
                [2, 'Donec quam quam, dignissim nec euismod vel, dapibus eget libero. Quisque congue sem ut tincidunt maximus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin dictum leo non tortor facilisis, ut ultricies mauris rutrum. Quisque dapibus leo et ullamcorper faucibus. Ut interdum pulvinar enim, a pharetra sem sagittis sed. Curabitur laoreet, tortor in eleifend rhoncus, est lectus dignissim ligula, ac sodales lorem mauris at nisi. Phasellus maximus ac augue a tincidunt. In iaculis nibh non porta rhoncus. Suspendisse malesuada posuere erat in sodales. Phasellus tempor dictum tellus, in laoreet tellus bibendum sit amet. Phasellus sagittis sodales rutrum. Praesent accumsan, nunc in facilisis mattis, felis neque ullamcorper ligula, et ullamcorper sapien neque non nisl. Suspendisse porta viverra arcu, sit amet rutrum nibh blandit et.',0,0, 1, '2018-06-04 00:13:29','2018-06-04 00:13:29', '2018-06-04 00:13:29'],
                [3, 'Maecenas euismod vel libero id facilisis. Maecenas venenatis consectetur massa et scelerisque. Integer aliquam tincidunt felis non rhoncus. Nam vel orci vitae lectus porttitor dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet nisi eu luctus pharetra. Phasellus bibendum vehicula iaculis. Pellentesque rhoncus gravida semper. Sed scelerisque fringilla lorem, ut pharetra ipsum. Aliquam erat volutpat. Etiam hendrerit, velit ac imperdiet faucibus, lectus nisl scelerisque mi, nec auctor massa mauris ut sapien. Phasellus sed erat id risus feugiat maximus at vel tellus. Cras vulputate quam ac metus tempor feugiat. Maecenas tincidunt arcu eget elit semper ultricies. Cras nec eros dolor. Nunc vitae velit interdum, sollicitudin metus nec, dapibus ante.',0,0, 1, '2018-06-04 00:13:29','2018-06-04 00:13:29', '2018-06-04 00:13:29'],
                [4, 'Nunc vel erat at nisl pretium placerat. Duis at neque rutrum, auctor magna ac, tincidunt augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur quis lacus volutpat, venenatis libero ac, dictum mauris. Donec commodo dui vitae laoreet mattis. Praesent vestibulum massa rutrum eros suscipit molestie eget vel eros. Aenean magna eros, fringilla at arcu ac, eleifend tincidunt sapien. Sed elementum arcu eget tellus fermentum, a dignissim justo consectetur.',0,0, 1, '2018-06-04 00:13:29','2018-06-04 00:13:29', '2018-06-04 00:13:29'],
                [5, 'Suspendisse potenti. Vestibulum condimentum lobortis felis, ac accumsan nisl feugiat sollicitudin. Phasellus pulvinar, velit sit amet finibus porta, nisl orci lacinia orci, id semper ante sapien ut quam. Curabitur ut laoreet dolor, vel molestie felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque malesuada ac arcu ut vehicula. Pellentesque id nunc luctus, commodo nunc in, convallis nibh. Integer id fringilla urna. Duis fringilla finibus risus.',0,0, 1, '2018-06-04 00:13:29','2018-06-04 00:13:29', '2018-06-04 00:13:29'],
            ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180305_095138_seed_post cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180305_095138_seed_post cannot be reverted.\n";

        return false;
    }
    */
}
