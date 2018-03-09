<?php

use yii\db\Migration;

class m180308_155103_article extends Migration
{
    public function safeUp()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%article_category}}', [
            'id' => $this->primaryKey(),
            'slug' => $this->string(1024)->notNull(),
            'title' => $this->string(512)->notNull(),
            'body' => $this->text(),
            'parent_id' => $this->integer(),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ], $tableOptions);

        $this->createTable('{{%article}}', [
            'id' => $this->primaryKey(),
            'slug' => $this->string(1024)->notNull(),
            'title' => $this->string(512)->notNull(),
            'body' => $this->text()->notNull(),
            'view' => $this->string(),
            'category_id' => $this->integer(),
            'thumbnail_base_url' => $this->string(1024),
            'thumbnail_path' => $this->string(1024),
            'status' => $this->smallInteger()->notNull()->defaultValue(0),
            'created_by' => $this->integer(),
            'updated_by' => $this->integer(),
            'published_at' => $this->integer(),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ], $tableOptions);

        $this->createTable('{{%article_attachment}}', [
            'id' => $this->primaryKey(),
            'article_id' => $this->integer()->notNull(),
            'path' => $this->string()->notNull(),
            'base_url' => $this->string(),
            'type' => $this->string(),
            'size' => $this->integer(),
            'name' => $this->string(),
            'created_at' => $this->integer()
        ], $tableOptions);

        $this->addForeignKey('fk_article_attachment_article', '{{%article_attachment}}', 'article_id', '{{%article}}', 'id', 'cascade', 'cascade');
        $this->addForeignKey('fk_article_author', '{{%article}}', 'created_by', '{{%user}}', 'id', 'cascade', 'cascade');
        $this->addForeignKey('fk_article_updater', '{{%article}}', 'updated_by', '{{%user}}', 'id', 'set null', 'cascade');
        $this->addForeignKey('fk_article_category', '{{%article}}', 'category_id', '{{%article_category}}', 'id', 'cascade', 'cascade');
        $this->addForeignKey('fk_article_category_section', '{{%article_category}}', 'parent_id', '{{%article_category}}', 'id', 'cascade', 'cascade');

        $this->insert('{{%article_category}}', [
            'id' => 1,
            'slug' => 'news',
            'title' => 'News',
            'status' => \app\models\ArticleCategory::STATUS_ACTIVE,
            'created_at' => time()
        ]);

        $this->insert('{{%article}}', [
            'id' => 1,
            'slug' => 'test1',
            'category_id' => 1,
            'title' => 'Lorem ipsum dolor sit amet',
            'body' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur leo quis gravida semper. Nullam lacinia lorem eu enim rutrum, in convallis erat iaculis. Integer lacinia blandit purus, auctor tempus sem efficitur at. In at varius ligula, vestibulum posuere risus. Aenean tincidunt laoreet risus, sit amet commodo urna finibus in. Morbi ac eros eros. Vivamus ornare, tellus accumsan blandit rutrum, sem magna convallis magna, non bibendum orci justo id nibh. Pellentesque magna nisl, rutrum non venenatis tempor, sagittis quis odio. Praesent eu tellus viverra, aliquet ligula a, pharetra libero. Ut venenatis ex justo, id viverra tellus ornare in. Praesent ultrices tristique elit a sodales. Fusce tortor sapien, feugiat malesuada tempor vel, ullamcorper eu augue.
Quisque dapibus purus eu tristique ornare. Vivamus accumsan mauris ac enim hendrerit, sed maximus arcu varius. Vivamus purus metus, euismod sit amet ultrices id, ultricies ut eros. In porta nibh vel laoreet condimentum. Ut gravida ipsum magna, vitae semper arcu efficitur non. Donec et turpis magna. Vestibulum nunc nibh, feugiat sit amet libero eu, imperdiet faucibus augue. Integer dictum ligula ac egestas varius. Pellentesque viverra vel nisi nec ornare. Ut faucibus sodales ante, vitae scelerisque lacus fringilla quis.
Donec sit amet volutpat leo. Quisque in est sollicitudin, auctor ante vitae, semper mauris. Etiam quis justo fermentum, varius elit nec, dapibus enim. Curabitur placerat varius magna, eget venenatis eros vehicula id. Etiam hendrerit convallis quam, vitae semper eros maximus at. Morbi auctor facilisis sodales. In consequat justo vitae semper volutpat. Duis convallis massa sit amet mi sollicitudin, eget convallis nisi semper. Donec eget eros vulputate, sodales ante id, elementum tellus. Etiam a lectus nisl.',
            'status' => \app\models\Article::STATUS_PUBLISHED,
            'created_at' => time()
        ]);

        $this->insert('{{%article}}', [
            'id' => 2,
            'slug' => 'test2',
            'category_id' => 1,
            'title' => 'Vivamus accumsan mauris ac enim hendrerit',
            'body' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur leo quis gravida semper. Nullam lacinia lorem eu enim rutrum, in convallis erat iaculis. Integer lacinia blandit purus, auctor tempus sem efficitur at. In at varius ligula, vestibulum posuere risus. Aenean tincidunt laoreet risus, sit amet commodo urna finibus in. Morbi ac eros eros. Vivamus ornare, tellus accumsan blandit rutrum, sem magna convallis magna, non bibendum orci justo id nibh. Pellentesque magna nisl, rutrum non venenatis tempor, sagittis quis odio. Praesent eu tellus viverra, aliquet ligula a, pharetra libero. Ut venenatis ex justo, id viverra tellus ornare in. Praesent ultrices tristique elit a sodales. Fusce tortor sapien, feugiat malesuada tempor vel, ullamcorper eu augue.
Quisque dapibus purus eu tristique ornare. Vivamus accumsan mauris ac enim hendrerit, sed maximus arcu varius. Vivamus purus metus, euismod sit amet ultrices id, ultricies ut eros. In porta nibh vel laoreet condimentum. Ut gravida ipsum magna, vitae semper arcu efficitur non. Donec et turpis magna. Vestibulum nunc nibh, feugiat sit amet libero eu, imperdiet faucibus augue. Integer dictum ligula ac egestas varius. Pellentesque viverra vel nisi nec ornare. Ut faucibus sodales ante, vitae scelerisque lacus fringilla quis.
Donec sit amet volutpat leo. Quisque in est sollicitudin, auctor ante vitae, semper mauris. Etiam quis justo fermentum, varius elit nec, dapibus enim. Curabitur placerat varius magna, eget venenatis eros vehicula id. Etiam hendrerit convallis quam, vitae semper eros maximus at. Morbi auctor facilisis sodales. In consequat justo vitae semper volutpat. Duis convallis massa sit amet mi sollicitudin, eget convallis nisi semper. Donec eget eros vulputate, sodales ante id, elementum tellus. Etiam a lectus nisl.',
            'status' => \app\models\Article::STATUS_PUBLISHED,
            'created_at' => time()
        ]);

        $this->insert('{{%article}}', [
            'id' => 3,
            'slug' => 'test3',
            'category_id' => 1,
            'title' => 'Quisque in est sollicitudin',
            'body' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur leo quis gravida semper. Nullam lacinia lorem eu enim rutrum, in convallis erat iaculis. Integer lacinia blandit purus, auctor tempus sem efficitur at. In at varius ligula, vestibulum posuere risus. Aenean tincidunt laoreet risus, sit amet commodo urna finibus in. Morbi ac eros eros. Vivamus ornare, tellus accumsan blandit rutrum, sem magna convallis magna, non bibendum orci justo id nibh. Pellentesque magna nisl, rutrum non venenatis tempor, sagittis quis odio. Praesent eu tellus viverra, aliquet ligula a, pharetra libero. Ut venenatis ex justo, id viverra tellus ornare in. Praesent ultrices tristique elit a sodales. Fusce tortor sapien, feugiat malesuada tempor vel, ullamcorper eu augue.
Quisque dapibus purus eu tristique ornare. Vivamus accumsan mauris ac enim hendrerit, sed maximus arcu varius. Vivamus purus metus, euismod sit amet ultrices id, ultricies ut eros. In porta nibh vel laoreet condimentum. Ut gravida ipsum magna, vitae semper arcu efficitur non. Donec et turpis magna. Vestibulum nunc nibh, feugiat sit amet libero eu, imperdiet faucibus augue. Integer dictum ligula ac egestas varius. Pellentesque viverra vel nisi nec ornare. Ut faucibus sodales ante, vitae scelerisque lacus fringilla quis.
Donec sit amet volutpat leo. Quisque in est sollicitudin, auctor ante vitae, semper mauris. Etiam quis justo fermentum, varius elit nec, dapibus enim. Curabitur placerat varius magna, eget venenatis eros vehicula id. Etiam hendrerit convallis quam, vitae semper eros maximus at. Morbi auctor facilisis sodales. In consequat justo vitae semper volutpat. Duis convallis massa sit amet mi sollicitudin, eget convallis nisi semper. Donec eget eros vulputate, sodales ante id, elementum tellus. Etiam a lectus nisl.',
            'status' => \app\models\Article::STATUS_PUBLISHED,
            'created_at' => time()
        ]);
    }

    public function safeDown()
    {
        $this->dropForeignKey('fk_article_attachment_article', '{{%article_attachment}}');
        $this->dropForeignKey('fk_article_author', '{{%article}}');
        $this->dropForeignKey('fk_article_updater', '{{%article}}');
        $this->dropForeignKey('fk_article_category', '{{%article}}');
        $this->dropForeignKey('fk_article_category_section', '{{%article_category}}');

        $this->dropTable('{{%article_attachment}}');
        $this->dropTable('{{%article}}');
        $this->dropTable('{{%article_category}}');
    }
}
