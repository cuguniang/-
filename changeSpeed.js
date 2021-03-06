// ==UserScript==
// @name         网盘倍速脚本
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       cgn
// @match        https://pan.baidu.com/mbox/streampage?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let speedStep  = 0.25; // 倍速的增量
    let initSpeed = 1.25; // 打开时默认的倍速
    let speed = initSpeed;

    function changeSpeed(e) {
        if(e.keyCode == 219){ // [ 减速
            speed -= speedStep;
        }
        else if(e.keyCode == 221){ // ] 加速
            speed += speedStep;
        }

        videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate(speed);
    }

    // 打开即自动initSpeed倍速
    let tId = setInterval(function(){
        if(videojs){
            videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate(initSpeed);
            let speed = initSpeed;
            clearInterval(tId);
        }},2000);

    //注册"[" "]"的键盘事件
    document.addEventListener("keydown", changeSpeed);
})();
