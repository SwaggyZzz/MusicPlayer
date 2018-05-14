(function ($,root) {
    var $scoped = $(document.body);
    function audioManager() {
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();
    }
    audioManager.prototype = {
        play(){
            this.audio.play();
            this.status = "play"
        },
        pause(){
            this.audio.pause();
            this.status = "pause"
        },
        setAudioSource(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToplay(time){
            this.audio.currentTime = time;
            this.audio.play();
        },
        // 判断歌曲是否播放完成 播放完成则还原进度条并重新渲染下一首歌曲
        bindEvent(){
            $(this.audio).on("ended", function () {
                $scope.find(".next-btn").trigger("click")
            })
        }
    }

    root.audioManager = audioManager;
})(window.Zepto, window.player || (window.player = {}))