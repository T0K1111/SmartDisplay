setInterval(function () {
    // 時間を取得
    var now = new Date();

    // 針の角度
    var deg_h = now.getHours() * (360 / 12) + now.getMinutes() * (360 / 12 / 60);
    var deg_m = now.getMinutes() * (360 / 60);
    var deg_s = now.getSeconds() * (360 / 60);

    // それぞれの針に角度を設定
    document.querySelector(".hour").style.transform = `rotate(${deg_h}deg)`;
    document.querySelector(".min").style.transform = `rotate(${deg_m}deg)`;
    document.querySelector(".sec").style.transform = `rotate(${deg_s}deg)`;
}, 100);

window.onload = function () {
    // メモリを追加
    for (let i = 1; i <= 12; i++) {
        // scaleクラスの要素の最後にdiv要素を追加
        let scaleElem = document.querySelector(".scale");
        let addElem = document.createElement("div");
        scaleElem.appendChild(addElem);

        // 角度をつける
        document.querySelector(".scale div:nth-child(" + i + ")").style.transform = `rotate(${i * 30}deg)`;
    }
}

let gpsInfo,btnGpsCheck;

let WP;
let lat = 0;
let lng = 0;
function SccCB(position){
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    // 緯度・経度を表示
	document.getElementById("table_lat").innerHTML = lat;
	document.getElementById("table_lon").innerHTML = lng;

    stopWP();
    
    alert("位置情報を更新しました");
    showGPS();
  }
  
  function ErrCB(error){
    alert("位置情報を取得できませんでした");
  }
  
  function stopWP(error){
    navigator.geolocation.clearWatch(WP);
  }
  
  function updateWP(error){
    stopWP();
    // 端末の位置情報を継続的に取得する(navigator.geolocation.watchPosition)
    WP = navigator.geolocation.watchPosition(SccCB, ErrCB, {enableHighAccuracy: true});
  }
  
  
  
  window.addEventListener("load", ()=>{
    // DOM取得
    gpsInfo = document.getElementById("gpsInfo");
    btnGpsCheck = document.getElementById("btnGpsCheck");
  
    // GPSチェックボタンイベント
    btnGpsCheck.addEventListener("click", updateWP);
     
  });

  // 時計のメインとなる関数
function clock()
{
    // 曜日を表す各文字列の配列
    var weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat");
    // 現在日時を表すインスタンスを取得
    var now = new Date();
    // 年
    var y = now.getFullYear();
    // 月 0~11で取得されるので実際の月は+1したものとなる
    var mo = now.getMonth() + 1;
    // 日
    var d = now.getDate();
    // 曜日 0~6で日曜始まりで取得されるのでweeks配列のインデックスとして指定する
    var w = weeks[now.getDay()];
    // 時
    var h = now.getHours();
    // 分
    var mi = now.getMinutes();
    // 秒
    var s = now.getSeconds();

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (mi < 10) mi = "0" + mi;
    if (s < 10) s = "0" + s;

    //　HTML: <span id="clock_date">(ココの日付文字列を書き換え)</span>
    document.getElementById("clock_date").innerHTML =  y + "/" + mo + "/" + d + " (" + w + ")";
    //　HTML: <span id="clock_time">(ココの時刻文字列を書き換え)</span>
    document.getElementById("clock_time").innerHTML = h + ":" + mi;
    //　HTML: <div id="clock_frame"> の内部要素のフォントサイズをウインドウサイズの10分の1ピクセルに設定
    document.getElementById("clock_frame").style.fontSize =  window.innerWidth / 40 + "px";
}

// 上記のclock関数を1000ミリ秒ごと(毎秒)に実行する
setInterval(clock, 1000);

