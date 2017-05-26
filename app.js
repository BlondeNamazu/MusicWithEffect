// 1.モジュールオブジェクトの初期化
var fs = require("fs");
var server = require("http").createServer(function(req, res) {
     var output;
     if(req.url == "./audio.mp3" || req.url == "audio.mp3" || req.url == "http://musicviaweb.namazu.trap.show/audio.mp3"){
       console.log("This is mp3");
       var msg = "debug : " + "This is mp3";
       io.sockets.emit("debug", {value: msg});
       res.writeHead(200,{"Content-Type":"audio/mpeg"});
       output = fs.readFileSync("./audio.mp3");
     } else {
       console.log("This is html");
        var msg = "debug : " + "This is html";
       io.sockets.emit("debug", {value: msg});
       res.writeHead(200, {"Content-Type":"text/html"});
       output = fs.readFileSync("./index.html", "utf-8");
     }
     res.end(output);
}).listen(8080);
var io = require("socket.io").listen(server);

// ユーザ管理ハッシュ
var userHash = {};

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

  // 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
  socket.on("connected", function (name) {
    var msg = name + "が入室しました";
    userHash[socket.id] = name;
    io.sockets.emit("publish", {value: msg});
  });

  // メッセージ送信カスタムイベント
  socket.on("publish", function (data) {
    io.sockets.emit("publish", {value:data.value});
  });
  
  socket.on("debug", function (data) {
    var msg = "debug : " + data;
    io.sockets.emit("debug", {value: msg});
  });

  // 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
  socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      var msg = userHash[socket.id] + "が退出しました";
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: msg});
    }
  });
});