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

        // 画布宽度
        width: 500,

        // 画布高度
        height: 400,

        // 图片地址 required
        image: '*',

        // 动画持续时间
        time: 100,

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
        // 缩略小地图
        map: {
            width: 300,
            space: 5,
            btnHeight: 30,
            stroke: '#ddd',
        },
    }, options, true);

    var oApp = document.getElementById(this.options.app);
    if (!oApp) {
        throw Error(this.options.app + ' DOM is undefined!');
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
    this.zr = zrender.init(oApp, {
        width: this.options.width,
        height: this.options.height,
    });
    this.groupBigImage = new zrender.Group({ name: 'group-big-image', draggable: true });
    this.groupMapImage = new zrender.Group({ name: 'group-map-image' });
    this.groupMapBg = new zrender.Group({ name: 'group-map-bg' });
    this.groupMapBtn = new zrender.Group({ name: 'group-map-btn' });
    this.groupMapContent = new zrender.Group({ name: 'group-map-content' });
    this.zr.add(this.groupBigImage);
    this.zr.add(this.groupMapImage);
    this.groupMapImage.add(this.groupMapBg);
    this.groupMapImage.add(this.groupMapBtn);
    this.groupMapImage.add(this.groupMapContent);
}

// 初始化 zrender 实例
ImageDetail.prototype.start = function() {
    var _this = this;
    this.loadImgData().then(function(imgData) {
        _this.imageData = imgData;
        _this.renderBigImageGroup();
        _this.renderMapImageGroup();
    })
}

// 渲染大图
ImageDetail.prototype.renderGroupMapContent = function() {
    var nodeImage = this.getNodeImage(100);
    var groupDefect = this.getGroupDefect(101);
    this.groupMapContent.add(nodeImage);
    this.groupMapContent.add(groupDefect);
}

// 渲染缩略地图
ImageDetail.prototype.renderGroupMapContent = function() {
    var nodeImage = this.getNodeImage(100);
    var groupDefect = this.getGroupDefect(101);
    this.groupMapContent.add(nodeImage);
    this.groupMapContent.add(groupDefect);
}

// 渲染图片
ImageDetail.prototype.getNodeImage = function(zindex) {
    var imgData = this.imageData;
    var imgNode = new zrender.Image({
        name: 'node-image',
        style: {
            image: imgData,
            width: imgData.width,
            height: imgData.height,
        },
        z: zindex,
    });
    return imgNode;
}

// 渲染缺陷标识
ImageDetail.prototype.getGroupDefect = function(zindex) {
    var group = new zrender.Group({ name: 'group-defect' });
    var data = this.options.defect.data;
    var lineWidth = this.options.defect.lineWidth;
    var stroke = this.options.defect.stroke;
    data.forEach(v => {
        var x = v.left;
        var y = v.top;
        var width = v.right - v.left;
        var height = v.bottom - v.top;
        group.add(new zrender.Rect({
            name: 'node-defect',
            shape: {
                x: x + 0.5,
                y: y + 0.5,
                width: width - lineWidth * 2,
                height: height - lineWidth * 2,
            },
            style: {
                stroke: stroke,
                lineWidth: lineWidth,
            },
            z: zindex + 1,
        });
    })
    return group;
}

// 同步更新 groupBigImage
ImageDetail.prototype.updateGroupBigImage = function(type, isAnimate = false) {
    var group = this.groupBigImage;
    var time = this.options.time;
    var canvasWidth = this.zr.getWidth();
    var canvasHeight = this.zr.getHeight();
    var fullSize = group.getBoundingRect();
    var bestSize = this.getBestSize({
        w: canvasWidth,
        h: canvasHeight,
        ew: fullSize.width,
        eh: fullSize.height,
    })
    var addScale = 0;
    var prevScale = group.scale;
    var prevPosition = group.position;
    var nextScale = prevScale;
    var nextPosition = prevPosition;
    switch(type) {
        case 'view':
            nextScale = [
                bestSize.w / fullSize.width,
                bestSize.h / fullSize.height,
            ];
            nextPosition = [
                (canvasWidth - bestSize.w) / 2,
                (canvasHeight - bestSize.h) / 2,
            ];
            break;
        case 'origin':
            nextScale = [1, 1];
            nextPosition = [
                (canvasWidth - fullSize.width) / 2,
                (canvasHeight - fullSize.height) / 2,
            ];
            break;
        case 'zoomin':
        case 'zoomout':
            addScale = (type === 'zoomin' ? -1 : 1) * 0.1;
            nextScale = prevScale.map(v => addScale + v);
            nextPosition = [
                prevPosition[0] - fullSize.width * addScale / 2,
                prevPosition[1] - fullSize.height * addScale / 2
            ];
            break;
    }
    // console.log('type>>>', type);
    // console.log('fullSize>>>', fullSize);
    // console.log('bestSize>>>', bestSize);
    // console.log('nextScale>>>', nextScale);
    // console.log('nextPosition>>>', nextPosition);

    if (isAnimate) {
        group.animateTo({
            scale: nextScale,
            position: nextPosition,
        }, time, function() {
            console.log('group>>>', group);
        })
    } else {
        group.attr({
            scale: nextScale,
            position: nextPosition,
        })
        console.log('group>>>', group);
    }
}

// 计算最大化显示元素的 width, height
ImageDetail.prototype.getBestSize = function(params) {
    var window_width = params.w;
    var window_height = params.h;
    var element_width = params.ew;
    var element_height = params.eh;

    if (!window_width || !window_height || !element_width || !element_height) {
        return { w: 0, h: 0 };
    }

    if (window_width >= element_width && window_height >= element_height) {
        return {
            w: element_width,
            h: element_height,
        }
    }

    // 保持元素宽高比
    var element_scale = element_width / element_height;
    var new_element_width = window_width;
    var new_element_height = new_element_width / element_scale;
    if (new_element_height > window_height) {
        new_element_height = window_height;
        new_element_width = new_element_height * element_scale;
    }

    return {
        w: new_element_width,
        h: new_element_height,
    }
}
