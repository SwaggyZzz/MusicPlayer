var $ = window.Zepto;
var root = window.player;
var songList;
var index = 0;
var $scope = $(document.body);
var controlmanager;
var audio = new root.audioManager();

function bindClick() {
    $scope.on("playChange",function (event,index,flag) {
        audio.setAudioSource(songList[index].audio);
        if(audio.status === "play" || flag){
            audio.play();

            // 切换下一首时会重新开启进度条
            root.process.startProcess();
        }
        root.process.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.process.update(0);  
        root.lrc.lrcSlider();
    })
    $scope.on("click",".prev-btn",function () {
        var index = controlmanager.prev();
        $scope.trigger("playChange",index);
    })
    $scope.on("click", ".next-btn", function () {
        var index = controlmanager.next();
        $scope.trigger("playChange", index);
    })
    $scope.on("click",".play-btn",function () {
        if(audio.status === "play"){
            audio.pause();
            root.process.stopProcess();
        }else {
            audio.play();
            root.process.startProcess();
        }
        $(this).toggleClass("playing");
    })
    $scope.on("click", ".list-btn", function () {
        root.playList.show(controlmanager);
    })
}

function bindTouch() {
    var $sliderPointer = $scope.find(".slider-point");
    var offset = $scope.find(".process-wrapper").offset();
    var left = offset.left;
    var width = offset.width;

    // 绑定拖拽事件 开始拖拽 取消进度条渲染
    $sliderPointer.on("touchstart",function () {
        root.process.stopProcess();
    }).on("touchmove",function (e) {
        // 计算拖拽百分比 更新当前事件和进度条
        var x = e.changedTouches[0].clientX;
        var precent = (x - left) / width;
        if(precent > 1 || precent < 0){
            precent = 0;
        }
        root.process.update(precent);
        
    }).on("touchend",function (e) {
        // 计算百分比 跳转播放 重新开始进度条渲染
        var x = e.changedTouches[0].clientX;
        precent = (x - left) / width;
        if (precent > 1 || precent < 0) {
            precent = 0;
        }
        var curDuration = songList[controlmanager.index].duration;
        var curTime = curDuration * precent;
        audio.jumpToplay(curTime);
        root.process.startProcess(precent);
        $scope.find(".play-btn").addClass("playing");
        audio.status = "play"
    })
}

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data);
            bindClick();
            bindTouch();
            controlmanager = new root.controlManager(data.data.length);
            songList = data.data;
            // root.render(data.data[0]);
            root.playList.renderList(songList);
            $scope.trigger("playChange",0)
        },
        error: function () {
            console.log('error')
        }
    })
}

getData('https://www.easy-mock.com/mock/5af18db2c90528275e3649bb/musicplayer/getmusic');