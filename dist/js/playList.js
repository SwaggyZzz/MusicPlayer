(function ($,root) {
    var $scoped = $(document.body);
    var control;
    var $playList = $(`
        <div class="play-list">
            <div class="play-header">播放列表</div>
            <ul class="list-wrapper">
            </ul>
            <div class="close-btn">关闭</div>
        </div>
    `)
    // 渲染播放列表dom
    function renderList(songList) {
        var html = '';
        for(var i = 0; i < songList.length; i++){
            html += `
                <li>
                    <h3>${songList[i].song}-<span>${songList[i].singer}</span></h3>
                </li>
            `
        }
        $playList.find("ul").html(html);
        $scope.append($playList);
        bindEvent();
    }

    function show(controlmanager) {
        control = controlmanager;
        $playList.addClass("show");
        signSong(control.index);
    }

    function signSong(index) {
        $playList.find(".sign").removeClass("sign");
        $playList.find("ul li").eq(index).addClass("sign");
    }

    function bindEvent() {
        $playList.on("click",".close-btn",function () {
            $playList.removeClass("show");
        })
        $playList.find("li").on("click",function () {
            var index = $(this).index();
            signSong(index);
            // 改变control的index 避免通过歌单跳转后 control的index没变 点下一首时index出错
            control.index = index;
            $scope.trigger("playChange",[index,true])
            // 通过歌单跳转歌曲播放时,改变播放按钮样式 避免还是暂停状态
            $scope.find(".play-btn").addClass("playing")

            // 设置定时器使得选完歌曲后歌单自动消失
            setTimeout(() => {
                $playList.removeClass("show");
            }, 200);
        })
    }

    root.playList = {
        renderList,
        show
    };
})(window.Zepto,window.player || (window.player = {}))