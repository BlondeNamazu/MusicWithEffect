# Music with Effect

こちら(http://qiita.com/hosomichi/items/66b309a6c3c20d910218)のチャットアプリをベースにして、リアルタイムに音楽にエフェクトをかけることのできるアプリを開発しました。

## 概要

Node.jsを用いたサーバーとクライアントを用意し、専用のアプリを利用することでAndroidのセンサーの値から対応するエフェクトをかけることができます。

## 使い方

1.PCでhttp://musicviaweb.namazu.trap.show/ にアクセスします。
2.「ファイルを選択」をクリックし、流したいサウンドファイル（mp3限定）を選択します。
3.自分の好きなkeyを入力し、setKeyをクリックします。
4.専用のAndroidアプリを起動します。
5.先ほど入力したkeyと同じkeyを入力し、setKeyをクリックします。

6.Androidのセンサーに応じて画面の色や音楽にかかるエフェクトが変わります。

## 使用したエフェクト
- biquadFileter(低域通過フィルタ)
- gainNode (音量調整)
- PannerNode(左右の音量バランス調整)
- DelayNode(シンセサイズ)
