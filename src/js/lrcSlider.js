(function ($,root) {
    var $scope = $(document.body);
    var frameId;
    var flag = true;

    function lrcSlider() {
        // 将歌词时间数组中的时间转换成毫秒以便于比较
        var timeArr = root.timeArr.map(function (item) {
            var arr = item.split(":")
            return arr[0] * 60000 + arr[1] * 1000 + +(arr[2]) 
        });
        
        // 每次切换歌曲时将歌词位置重置到起始位
        var top = 0;
        $scope.find(".lrc-slider").css({
            top: top + 'px'
        })
        $scope.find(".lrc-slider p").eq(0).addClass("active");
        // 清除定时器避免切换时有多个定时器
        cancelAnimationFrame(frameId);
        var i = 0;
        function frame() {
            var nowTime = root.process.nowTime
            if (timeArr[i] <= nowTime < timeArr[i+1] && flag) {
                flag = false
                $(".active").removeClass("active");
                $scope.find(".lrc-slider p").eq(i).addClass("active");
                $scope.find(".lrc-slider").css({
                    top: top + 'px'
                })
            } else if (timeArr[i+1] <= nowTime) {
                flag = true
                top -= 30;
                i++;
            } else if (nowTime < timeArr[i]) {
                flag = true
                top += 30;
                i--;                
            }
            frameId = requestAnimationFrame(frame)
        }
        frame();
    }

    root.lrc = {
        lrcSlider
    }
})(window.Zepto,window.player || (window.player = {}))