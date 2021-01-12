(function(root) {
    //进度条的对象
    function Progress() {
        this.durTime = 0; //总时间
        this.frameId = null; //定时器
        this.startTime = 0; //起始时间

        this.lastPercent = 0; //记录上一次的百分比

        this.init();
    }
    Progress.prototype = {
        init: function() {
            this.getDom();
        },
        //获取页面中的元素
        getDom: function() {
            this.curTime = document.querySelector('.curTime');
            this.circle = document.querySelector('.circle');
            this.frontBg = document.querySelector('.frontBg');
            this.totalTime = document.querySelector('.totalTime');
        },
        //渲染总时间
        renderAllTime: function(time) {
            this.durTime = time;
            time = this.formatTime(time);
            this.totalTime.innerHTML = time;

        },
        //时间转化
        formatTime: function(time) {
            time = Math.round(time);
            var m = Math.floor(time / 60); //向下取整
            var s = time % 60;

            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            return m + ':' + s;
        },
        //进度条的自己移动,开启一个定时器（H5）
        move: function(pre) {
            var This = this;
            cancelAnimationFrame(this.frameId);

            this.lastPercent = pre === undefined ? this.lastPercent : pre;
            //按下的时刻
            this.startTime = new Date().getTime();
            //console.log(this.lastPercent)

            function frame() {
                var curTime = new Date().getTime();
                var pre = This.lastPercent + (curTime - This.startTime) / (This.durTime * 1000);

                if (pre <= 1) {
                    //播放
                    //console.log('1')
                    This.update(pre);
                } else {
                    cancelAnimationFrame(This.frameId);
                }
                This.frameId = requestAnimationFrame(frame);
            }
            frame();
        },
        //更新进度条
        update: function(pre) {
            //更新左边的时间
            var time = pre * this.durTime;
            time = this.formatTime(time);
            this.curTime.innerHTML = time;

            //更新进度条的位置
            this.frontBg.style.width = pre * 100 + '%';

            //更新原点的位置
            var l = pre * this.circle.parentNode.offsetWidth;
            this.circle.style.transform = 'translateX(' + l + 'px)'
        },
        //暂停进度条
        stop: function() {
            var stopTime = new Date().getTime();
            this.lastPercent += (stopTime - this.startTime) / (this.durTime * 1000);

            cancelAnimationFrame(this.frameId);
        }
    };

    function instanceProgress() {
        return new Progress();
    }
    //拖拽对象
    function Drag(obj) {
        this.obj = obj;
        this.startPointX = 0; //手指按下的水平距离
        this.startLeft = 0; //元素的坐标点
        this.percent = 0; //记录拖拽的百分比
    }
    Drag.prototype = {
        init: function() {
            var This = this;
            this.obj.style.transform = 'translateX(0)';
            this.obj.addEventListener('touchstart', function(ev) {
                This.startPointX = ev.changedTouches[0].pageX;
                This.startLeft = parseFloat(this.style.transform.split('(')[1]);

                This.start && This.start();
            });

            this.obj.addEventListener('touchmove', function(ev) {
                This.disPointX = ev.changedTouches[0].pageX - This.startPointX;
                var l = This.disPointX + This.startLeft;

                if (l < 0) {
                    l = 0;
                } else if (l > this.offsetParent.offsetWidth) {
                    l = this.offsetParent.offsetWidth;
                }
                this.style.transform = 'translateX(' + l + 'px)';

                This.percent = l / this.offsetParent.offsetWidth;

                This.move && This.move(This.percent);
                ev.preventDefault();
            });
            this.obj.addEventListener('touchend', function(ev) {
                This.end && This.end(This.percent);
            });
        }
    }

    function instanceDrag(obj) {
        return new Drag(obj);
    }
    root.progress = {
        pro: instanceProgress,
        drag: instanceDrag
    }


}(window.player || (window.player = {})))