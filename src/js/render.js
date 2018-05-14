(function ($,root) {

    var $scope = $(document.body);
    var timeArr = [];

    // 渲染当前歌曲信息
    function renderInfo(info) {
        var html = `
            <div class="song-name">${info.song}</div>
            <div class="singer-name">${info.singer}</div>
            <div class="album-name">${info.album}</div>
        `;
        $scope.find(".song-info").html(html);
    }
    // 渲染当前歌曲图片
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img,$scope);
            $scope.find(".song-img img").attr('src',src)
        }
    }
    // 判断是否喜欢当前歌曲
    function renderisLike(isLike) {
        if(isLike){
            $scope.find(".like-btn").addClass("liking")
        }else {
            $scope.find(".like-btn").removeClass("liking")
        }
    }
    // 渲染歌词
    function renderLrc(lrc) {
        var arr = lrc.split(",");
        var lrcArr = [];
        var html = '';
        for (var i = 0; i < arr.length; i++){
            timeArr.push(arr[i].toString().slice(0, 7))
        }
        for (var i = 0; i < arr.length; i++) {
            lrcArr.push(arr[i].toString().slice(7))
        }
        for(var i = 0; i < arr.length; i++){
            html += `
                <p>${lrcArr[i]}</p>
            `
        }
        $scope.find(".lrc-slider").html(html);
    }

    root.render = function (data) {
        renderInfo(data);
        renderImg(data.image);
        renderisLike(data.isLike);
        renderLrc(data.lrc);
    }
    root.timeArr = timeArr;
})(window.Zepto,window.player || (window.player = {}))