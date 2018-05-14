(function ($,root) {
    var timeArr = root.timeArr;
    var $scope = $(document.body);
    var i = 0;
    var frameId;
    
    function lrcSlider() {
        var top = 0;
        cancelAnimationFrame(frameId);
        function frame() {
            if(root.process.nowTime == timeArr[i]){
                $(".active").removeClass("active");
                $scope.find(".lrc-slider p").eq(i).addClass("active");
                i++; 
                $scope.find(".lrc-slider").css({
                    top: top + 'px'
                })
                top = top - 30;
            }
            frameId = requestAnimationFrame(frame)
            if(i > timeArr.length - 1){
                cancelAnimationFrame(frameId);
                console.log(1);
            }
        }
        frame();
    }

    root.lrc = {
        lrcSlider
    }
})(window.Zepto,window.player || (window.player = {}))