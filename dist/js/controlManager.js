
// 通过函数操作index,使index只能++或者-- 
// 不会被外界其他操作干扰

(function ($,root) {
    function controlManager(len) {
        this.index = 0;
        this.length = len;
    }
    controlManager.prototype = {
        prev(){
            return this.getIndex(-1);
        },
        next(){
            return this.getIndex(1);
        },
        getIndex(value){
            var index = this.index;
            var len = this.length;
            var curIndex = (index + value + len) % len;
            this.index = curIndex;
            return curIndex
        }
    }

    root.controlManager = controlManager;
})(window.Zepto,window.player || (window.player={}))