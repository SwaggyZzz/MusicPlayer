(function ($,root) {
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPrecent = 0;
    var startTime;
    var nowTime = "[00:00]";

    // 转换时间格式
    function formatTime(duration) {
        duration = Math.round(duration);
        var min = Math.floor(duration / 60);
        var sec = duration % 60;
        if(min < 10){
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }
    function renderAllTime(duration) {
        lastPrecent = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find(".all-time").html(allTime);
    }
    function update(precent) {
        var curTime = precent * curDuration;
        curTime = formatTime(curTime);
        $scope.find(".cur-time").html(curTime);
        var precentage = (precent - 1) * 100 + "%";
        $scope.find(".process-top").css({
            transform: `translateX(${precentage})`
        })
        // 将歌词已经播放的时间添加到全局作用域下 并保持播放时能实时更新
        root.process.nowTime = `[${curTime}]`;
    }
    function startProcess(precent=lastPrecent) {
        lastPrecent = precent;
        // 取消上一次开启的requestAnimationFrame 避免暂停切换下一首时 会开启两个进度条
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var precent = lastPrecent + (curTime - startTime) / (curDuration * 1000);
            if(precent < 1){
                frameId = requestAnimationFrame(frame);
                update(precent);
            }else {
                cancelAnimationFrame(frameId);
            }
        }
        frame()
    }
    function stopProcess() {
        var stopTime = new Date().getTime();
        lastPrecent = lastPrecent + (stopTime - startTime) / (curDuration * 1000)
        cancelAnimationFrame(frameId)
    }

    root.process = {
        renderAllTime,
        startProcess,
        update,
        stopProcess,
        nowTime,
        formatTime
    }
})(window.Zepto,window.player || (window.player = {}))