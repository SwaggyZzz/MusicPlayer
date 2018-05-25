(function ($,root) {

    var $scope = $(document.body);

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
        var timeArr = [];
        var html = '';
        for (var i = 0; i < arr.length; i++){
            timeArr.push(arr[i].toString().slice(2, 10))
        }
        for (var i = 0; i < arr.length; i++) {
            lrcArr.push(arr[i].toString().slice(11))
        }
        for(var i = 0; i < arr.length; i++){
            html += `
                <p>${lrcArr[i]}</p>
            `
        }
        $scope.find(".lrc-slider").html(html);
        root.timeArr = timeArr
    }

    root.render = function (data) {
        renderInfo(data);
        renderImg(data.image);
        renderisLike(data.isLike);
        renderLrc(data.lrc);
    }
})(window.Zepto,window.player || (window.player = {}))

//  [00:00:00]丑八怪, [00:02:13]作词：甘世佳, [00:03:13]作曲：李荣浩, [00:05:32]演唱：薛之谦, [00:20:26]如果世界漆黑其实我很美, [00:23:88]在爱情里面进退最多被消费, [00:27:70]无关痛痒的是非, [00:29:69]又怎么不对无所谓, [00:35:69]如果像你一样总有人赞美, [00:39:32]围绕着我的卑微也许能消退, [00:43:32]其实我并不在意有很多机会, [00:46:69]像巨人一样的无畏, [00:49:51]放纵我心里的鬼, [00:51:20]可是我不配, [00:54:46]丑八怪能否别把灯打开, [01:02:21]我要的爱出没在漆黑一片的舞台, [01:09:46]丑八怪在这暧昧的时代, [01:17:58]我的存在像意外, [01:24:48], [01:37:79]有人用一滴泪会红颜祸水, [01:41:35]有人丢掉称谓什么也不会, [01:45:29]只要你足够虚伪, [01:47:10]就不怕魔鬼对不对, [01:53:05]如果剧本写好谁比谁高贵, [01:56:74]我只能沉默以对美丽本无罪, [02:00:63]当欲望开始贪杯有更多机会, [02:04:07]像尘埃一样的无畏, [02:06:89]化成灰谁认得谁管他配不配, [02:08:65], [02:11:96]丑八怪能否别把灯打开, [02:19:52]我要的爱出没在漆黑一片的舞台, [02:26:83]丑八怪在这暧昧的时代, [02:34:96]我的存在不意外, [02:42:33], [03:01:96]丑八怪其实见多就不怪, [03:09:96]放肆去high用力踩, [03:14:15]那不堪一击的洁白, [03:17:21]丑八怪这是我们的时代, [03:25:48]我不存在才意外