window.onselectstart = () => false;
let log = console.log;
// 定义类的属性
function player(id) {
    this.el = document.querySelector(id);
    this.audio = document.querySelector('audio');
    this.playList = [];
    this.playIndex = -1;
    this.more = this.el.querySelector('.more');
    this.btns = this.el.querySelector('.btns');
    this.bgImg = this.el.querySelector('#bg-img');
    this.songImg = this.el.querySelector('#song-img');
    this.looped = false;
    this.liked = false;
    this.interval = null;
    this.deg = 0;
}
// 定义类的方法
// 下一曲
player.prototype.next = function () {
    this.playIndex = (this.playIndex + 1) % this.playList.length;
    this.audio.src = data[this.playIndex].src;
    this.renderInfo();
}
// 上一曲
player.prototype.prev = function () {
    this.playIndex = (this.playIndex - 1 + this.playList.length) % this.playList.length;
    log(this.playIndex)
    this.audio.src = data[this.playIndex].src;
    this.renderInfo();
}
player.prototype.toggleLoop = function () {
    let icon = this.el.querySelector('#loop');
    if (this.looped) {
        icon.childNodes[0].src = 'static/menu.png';
        this.audio.loop = false;
        this.looped = false;
    } else {
        icon.childNodes[0].src = 'static/reload.png';
        this.audio.loop = true;
        this.looped = true;
    }
}
player.prototype.like = function () {
    // todo
    let icon = this.el.querySelector('#like').childNodes[0];
    if (this.liked) {
        this.liked = false;
        icon.src = 'static/heart.png'
    } else {
        icon.src = 'static/heart-fill.png';
        this.liked = true;
        alert('收藏成功');
    }
}
player.prototype.toggleRotate = function () {
    let img = this.el.querySelector('#song-img');
    let _this = this;
    if (!this.audio.paused) {
        _this.interval = setInterval(function () {
            _this.deg = _this.deg + 0.36;
            img.style.transform = 'rotate(' + _this.deg + 'deg)';
        }, 10);
    } else {
        clearInterval(this.interval);
    }
}
// 初始化函数
player.prototype.init = function () {
    let _this = this;100
    this.playList = data;
    this.playIndex = 0;
    this.audio.src = data[this.playIndex].src;
    this.audio.onended = function () {
        // _this
        _this.playIndex = (_this.playIndex + 1) % _this.playList.length;
        _this.audio.src = data[_this.playIndex].src;
        _this.renderInfo();
        _this.audio.play();
        _this.changeStatus();
        _this.toggleRotate();
    };
    this.renderInfo();
    this.btns.addEventListener('click', function (e) {
        let target = e.target;
        let id = target.id || target.parentNode.id;
        switch (id) {
            case 'playTrack':
                _this.audio.play();
                _this.toggleRotate();
                _this.changeStatus();
                break;
            case 'pauseTrack':
                _this.audio.pause();
                _this.toggleRotate();
                _this.changeStatus();
                break;
            case 'nextTrack':
                _this.next();
                _this.audio.play();
        _this.toggleRotate();
        _this.changeStatus();
                break;
            case 'prevTrack':
                _this.prev();
                _this.audio.play();
        _this.toggleRotate();
        _this.changeStatus();
                break;
            case 'loop':
                _this.toggleLoop();
                break;
            default:
                break;
        }
    });
    this.more.addEventListener('click', function (e) {
        let target = e.target;
        let id = target.id || target.parentNode.id;
        switch (id) {
            case 'like':
                _this.like();
                break;
        
            default:
                break;
        }
    })
}
// 渲染歌曲信息
player.prototype.renderInfo = function () {
    // 更新标题
    this.el.querySelector('.title').innerText = data[this.playIndex].title;
    // 更新作者
    let len = data[this.playIndex].author.length;
    let author = ''
    for (let index = 0; index < len - 1; index++) {
        const element = data[this.playIndex].author[index];
        author += element + " / "
    }
    author += data[this.playIndex].author[len - 1];
    this.el.querySelector('.author').innerText = author;
    // 更新图片
    this.songImg.src = data[this.playIndex].img;
    this.el.querySelector('#bg-img').src = data[this.playIndex].img;
}
// 切换播放和暂停的状态
player.prototype.changeStatus = function () {
    let playBtn = this.el.querySelector('.play');
    if (this.audio.paused) {
        playBtn.id = 'playTrack';
        playBtn.childNodes[0].src = 'static/play-circle.png';
    } else {
        playBtn.id = 'pauseTrack';
        playBtn.childNodes[0].src = 'static/time out.png';
    }
}
new player('.wrapper').init();