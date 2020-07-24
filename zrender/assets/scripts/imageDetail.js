/**
 * 图片详情模块
 */

function ImageDetail(options) {
    this.check(options);
    this.init();
    this.start();

    console.log('this>>>', this);
}

// 程序前置验证和参数检查
ImageDetail.prototype.check = function(options = {}) {
    if (!zrender) {
        // 确保程序依赖完整 ZRender
        throw Error('ZRender.js is required');
    }

    // 深度克隆参数
    this.options = zrender.util.merge({
        // 渲染画布的 DOM 节点
        app: 'app',

        // 图片地址 required
        image: '*',

        // 动画持续时间
        time: 200,

        // 图例
        legend: {
            data: [],
            width: 28,
            height: 16,
            space: 10,
            title: '图例：',
        },
        // 缺陷
        defect: {
            data: [],
            lineWidth: 2,
            stroke: '#24e510',
        },
        control: {
            className: 'control',
            classPrefix: 'zrender-detail-',
            maxScale: 5,
            minScale: 0.1,
        },
    }, options, true);

    this.domApp = document.getElementById(this.options.app);
    if (!this.domApp) {
        throw Error(this.options.app + ' DOM is undefined!');
    }
    var defect = this.options.defect;
    if (defect) {
        if (!zrender.util.isArray(defect.data)) {
            this.options.defect = false;
        }
    }
}

// 图片加载
ImageDetail.prototype.operate = function(type) {
    switch(type) {
        case 'view':
            this.showView();
            break;
        case 'origin':
            this.showOrigin();
            break;
        case 'zoomout':
        case 'zoomin':
            this.showZoom(type, true);
            break;
    }
}

// 图片加载
ImageDetail.prototype.loadImgData = function() {
    var src = this.options.image;
    return new Promise(function(resove, reject) {
        var imgData = new Image();
        imgData.src = src;
        imgData.onload = function() {
            resove(imgData);
        }
        imgData.onerror = function() {
            reject(imgData);
        }
    });
}

// 程序初始化
ImageDetail.prototype.init = function(options) {
    this.domApp.style.position = 'relative';
    this.domRoot = document.createElement('div');
    this.domRoot.style.width = '100%';
    this.domRoot.style.height = '100%';
    this.domControl = document.createElement('div');
    this.domApp.appendChild(this.domRoot);
    this.domApp.appendChild(this.domControl);
    this.zr = zrender.init(this.domRoot, {
        width: this.options.width,
        height: this.options.height,
    });
    this.groupDetail = new zrender.Group({ name: 'group-detail', draggable: true });
    this.zr.add(this.groupDetail);
}

// 初始化 zrender 实例
ImageDetail.prototype.start = function() {
    var _this = this;
    this.loadImgData().then(function(imgData) {
        _this.imageData = imgData;
        _this.renderGroupDetail();
        _this.renderControl();
        _this.showView();
    })
}

// 渲染图片详情 - group
ImageDetail.prototype.renderGroupDetail = function() {
    this.addImage(this.groupDetail, { z: 200 });
    this.addDefect(this.groupDetail, { z: 201 });
    this.groupDetail.on('mousewheel', onMousewheel, this);

    var run = false;
    var time = this.options.time;

    function onMousewheel(e) {
        if (run) return false;
        run = true;
        setTimeout(function() {
            run = false;
        }, time);
        var type = e.wheelDelta > 0 ? 'zoomout' : 'zoomin';
        this.showZoom(type, true);
    }
}

// 添加图片控制区
ImageDetail.prototype.renderControl = function() {
    var _this = this;
    var control = this.options.control;
    var classPrefix = control.classPrefix;
    var className = control.className;
    this.domControl.className = classPrefix + className;
    this.domZoomIn = document.createElement('div');
    this.domZoomIn.className = classPrefix + className + '-zoomIn';
    this.domZoomIn.setAttribute('data-oid', 'zoomin');
    this.domZoomIn.innerText = '-';
    this.domZoomOut = document.createElement('div');
    this.domZoomOut.className = classPrefix + className + '-zoomOut';
    this.domZoomOut.setAttribute('data-oid', 'zoomout');
    this.domZoomOut.innerText = '+';
    this.domZoomValue = document.createElement('div');
    this.domZoomValue.className = classPrefix + className + '-zoomValue';
    this.domZoomProgress = document.createElement('div');
    this.domZoomProgress.className = classPrefix + className + '-zoomProgress';
    this.domZoomDrag = document.createElement('div');
    this.domZoomDrag.className = classPrefix + className + '-zoomDrag';
    this.domZoomDrag.setAttribute('data-oid', 'zoomdrag');
    this.domZoomProgress.appendChild(this.domZoomDrag);
    this.domControl.appendChild(this.domZoomValue);
    this.domControl.appendChild(this.domZoomIn);
    this.domControl.appendChild(this.domZoomProgress);
    this.domControl.appendChild(this.domZoomOut);

    document.addEventListener('click', function(e) {
        var element = e.target;
        var oid = element.getAttribute('data-oid');
        if (oid === 'zoomin') {
            _this.showZoom('zoomin', true);
        } else if (oid === 'zoomout') {
            _this.showZoom('zoomout', true);
        }
    }, false);

    var isDrag = false;
    var startX = null;
    document.addEventListener('mousedown', function(e) {
        var element = e.target;
        var oid = element.getAttribute('data-oid');
        if (oid === 'zoomdrag') {
            isDrag = true;
            startX = e.pageX;
        }
    }, false);

    document.addEventListener('mouseup', function(e) {
        isDrag = false;
        startX = null;
    }, false);

    document.addEventListener('mousemove', function(e) {
        if (isDrag) {
            var addX = e.pageX - startX;
            var prevX = _this.domZoomDrag.style.left || 0;
            var nextX = parseInt(prevX) + addX;
            startX = e.pageX;
            _this.showDrag(nextX);
        }
    }, false);
}

// 添加图片
ImageDetail.prototype.addImage = function(group, params = {}) {
    var img_data = this.imageData;
    group.add(new zrender.Image(zrender.util.merge({
        style: {
            image: img_data,
            width: img_data.width,
            height: img_data.height,
        },
    }, params, true)));
}

// 添加缺陷标识
ImageDetail.prototype.addDefect = function(group, params = {}) {
    var _group = new zrender.Group({ name: 'group-defect' });
    var defect = this.options.defect;
    if (!defect) return null;
    var data = defect.data;
    var line_width = defect.lineWidth;
    var stroke = defect.stroke;
    data.forEach(v => {
        var x = v.left;
        var y = v.top;
        var width = v.right - v.left;
        var height = v.bottom - v.top;
        _group.add(new zrender.Rect(zrender.util.merge({
            shape: {
                x: x + 0.5,
                y: y + 0.5,
                width: width - line_width * 2,
                height: height - line_width * 2,
            },
            style: {
                stroke: stroke,
                lineWidth: line_width,
            },
        }, params, true)));
    })
    group.add(_group);
}

// 1:1 最佳显示
ImageDetail.prototype.showView = function(isAnimate = false) {
    var canvas_width = this.zr.getWidth();
    var canvas_height = this.zr.getHeight();
    var best_size = getBestSize({
        w: canvas_width,
        h: canvas_height,
        ew: this.imageData.width,
        eh: this.imageData.height,
    });
    var params = {
        scale: [
            best_size.w / this.imageData.width,
            best_size.h / this.imageData.height,
        ],
        position: [
            pad(best_size.x),
            pad(best_size.y),
        ]
    };
    this.update(params, isAnimate);
}

// 图片原始显示
ImageDetail.prototype.showOrigin = function(isAnimate = false) {
    var canvas_width = this.zr.getWidth();
    var canvas_height = this.zr.getHeight();
    var params = {
        scale: [1, 1],
        position: [
            pad((canvas_width - this.imageData.width) / 2),
            pad((canvas_height - this.imageData.height) / 2),
        ]
    };
    this.update(params, isAnimate);
}

// 图片缩放
ImageDetail.prototype.showZoom = function(type, isAnimate = false) {
    var img_prev_scale = this.groupDetail.scale;
    var img_add_scale = (type === 'zoomin' ? -1 : 1) * 0.1;
    var scale = img_prev_scale[0] + img_add_scale;
    this.updateByScale(scale, isAnimate);
}

// 滑块拖动
ImageDetail.prototype.showDrag = function(nextX) {
    var maxScale = this.options.control.maxScale;
    var minScale = this.options.control.minScale;
    var progress_bounding = this.domZoomProgress.getBoundingClientRect();
    var drag_bounding = this.domZoomDrag.getBoundingClientRect();
    var maxPageX = progress_bounding.width - drag_bounding.width;
    var minPageX = 0;
    var scale = nextX * (maxScale - minScale) / (maxPageX - minPageX);
    this.updateByScale(scale, false);
}

// 同步更新 groupBigImage
ImageDetail.prototype.updateByScale = function(scale, isAnimate = false) {
    var control = this.options.control;
    var maxScale = control.maxScale;
    var minScale = control.minScale;
    var img_prev_scale = this.groupDetail.scale;
    var img_next_scale = getCenter(scale, maxScale, minScale);
    var img_prev_position = this.groupDetail.position;
    var img_next_position = [
        img_prev_position[0] - this.imageData.width * (img_next_scale - img_prev_scale[0]) / 2,
        img_prev_position[1] - this.imageData.height * (img_next_scale - img_prev_scale[1]) / 2,
    ];
    var params = {
        scale: [scale, scale],
        position: img_next_position,
    }
    this.update(params, isAnimate);
}

ImageDetail.prototype.update = function(params, isAnimate = false) {
    var time = this.options.time;
    var bounding_progress = this.domZoomProgress.getBoundingClientRect();
    var bounding_drag = this.domZoomDrag.getBoundingClientRect();
    var maxPageX = bounding_progress.width - bounding_drag.width;
    var minPageX = 0;
    var maxScale = this.options.control.maxScale;
    var minScale = this.options.control.minScale;
    var target = {};
    if (params.scale) {
        var nextScale = getCenter(params.scale[0], maxScale, minScale);
        target.scale = [nextScale, nextScale];
        var nextX = nextScale * (maxPageX - minPageX) / (maxScale - minScale);
        this.domZoomDrag.style.left = nextX + 'px';
        this.domZoomValue.innerText = pad(nextScale * 100) + '%';
    }
    if (params.position) {
        target.position = params.position;
    }
    if (isAnimate) {
        this.groupDetail.animateTo(target, time);
    } else {
        this.groupDetail.stopAnimation().attr(target);
    }
}

// 计算最大化显示元素的 width, height
function getBestSize(params = {}) {
    var window_width = params.w;
    var window_height = params.h;
    var element_width = params.ew;
    var element_height = params.eh;
    var element_scale = element_width / element_height;
    var new_element_width;
    var new_element_height;

    if (!window_width || !window_height || !element_width || !element_height) {
        return { w: 0, h: 0, x: 0, y: 0 };
    }

    if (window_width >= element_width && window_height >= element_height) {
        new_element_width = element_width;
        new_element_height = element_height
    } else {
        new_element_width = window_width;
        new_element_height = new_element_width / element_scale;
        if (new_element_height > window_height) {
            new_element_height = window_height;
            new_element_width = new_element_height * element_scale;
        }
    }

    return {
        w: new_element_width,
        h: new_element_height,
        x: pad((window_width - new_element_width) / 2),
        y: pad((window_height - new_element_height) / 2),
    }
}

function pad(num, size = 0) {
    var f = parseFloat(num);
    if (isNaN(f)) {
        return;
    }
    var r = Math.pow(10, size);
    return Math.round(f * r) / r;
}

function getCenter(val, max, min) {
    return Math.min(Math.max(val, min), max);
}

function dounce(f, time) {
    var run = false;

    function _f() {
        if (run) return false;
        run = true;
        setTimeout(function() {
            run = false;
        }, time);
        f();
    }

    return _f;
}
