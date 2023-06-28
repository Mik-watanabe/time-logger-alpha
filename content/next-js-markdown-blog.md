---
title: 'Next.jsでmarkdownブログを構築'
date: '2023-06-01'
description: '我日記(仮)の開発日記'
---



## 背景
自分の頑張りを見える化したら、モチベにつながるんじゃなかろうか？
Next.js触ったことないから使ってみたい。と思い、作り始めた今日この頃
上司に、資料のまとめ方として教えてもらった"背景"セクションをちゃっかり使ってしまうワイは、すでに前職に染まっておる。
2年弱という数字にしたら長くない期間だが、初めての社会、初めての、、、初めてだらけで、特に最初の一年は沢山もがいて、悩んで、そして周りにも迷惑をかけて、、少しは成長できたのだろうか、、。

### 0601_2023 色々な作業
- Markdownの導入
    admin/create-contentページを作成した。UIとか細かな仕様はまだまだ全然先だが。
    このページは左側でマークダウンを書いて、右側にHTMLとして出力されるページ。ここにtitle部分なども追加して、saveを押すとデータベースに保存される仕様にしていきたい。

- Prettierの導入
    [Prettierの導入時に使用した記事](://zenn.dev/hungry_goat/articles/b7ea123eeaaa44)
    [Prettier公式サイト](://prettier.io/docs/en/options.html)

### 0603_2023 StopWatch部分の作成
- admin/record_logページの作成
    最初はライブラリで行うと思ったが、エラーがでてうまく解決できなかったので、スクラッチで実装した。useStateやらuseRefなど、知らないものがたくさん出てきた。りあクト！という本が良さそうなので、購入してみることにした。つぎは、そろそろOpenApiを用いて、バックエンドと繋いでいきたいです。

### 0606_2023 バックエンドをRailsで実装 / OpenAPIを導入して、フロントとつなげたい
- OpenAPIとSwaggerの違い
  - OpenAPI: RESTful APIの仕様を記述するためのフォーマット
  - Swagger: OpenAPIを使用するツールのこと
    [OpenAPIとSwagger入門](https://zenn.dev/chida/articles/25f4016560f6bf)
    [OpenAPI（Swagger)まとめ](https://qiita.com/KNR109/items/7e094dba6bcf37ed73cf)

    見様見真似で、client側にopenapi.ymlを追加してみたが、バックエンドと更新できないとうまく実装できているのか確かめようもないので、バックエンドから実装してみることにした。

### 0607_2023 バックエンドにrswagを入れてみる
- rswag
  - [rswag](https://github.com/rswag/rswag#getting-started)
  詳しくは、上記のサイトに載っているが、、

```
  group :development, :test do
    gem 'rswag'
    gem 'rswag-specs'
  end

  rails g rswag:install
  bundle exec rails g rspec:install

  specファイルやswagger_helper.rbを更新した後、以下のコマンドでymlファイルを生成する。
  rake rswag:specs:swaggerize
```

  `rake rswag:specs:swaggerize`

1年半くらい働かせてもらって、初めてAPI系のアプリを作成してみて知らないことがどんどん出てくる。
そして、久しぶりにgemのgithubを見にいくと何を言っているかが理解できるできるー！嬉しい。

jsonを自分で作成するのは、とても手間（？）
こちらのgemを使用して、返すjsonを成形するべき。
- [jsonapi-serializer](https://github.com/jsonapi-serializer/jsonapi-serializer)

`rails g serializer Movie name year`

一旦ここで、リモートにgithubを作成しました。
https://github.com/Mik-watanabe/time-logger-alpha-service

### 0612_2023 バックエンドで生成したAPIをフロントで使用できるようにしていく。
<!-- これでフロントを変えていく！ -->
https://openapi-generator.tech/#try
これをいれてみたけれど、この場合Next.jsで用意されているfetch()などを使用しなくて良いのか、よくわからない。