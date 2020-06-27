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
        eye: {
            lineWidth: 2,
            stroke: '#f00',
        }
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
    this.update(type, true);
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
    this.zr = zrender.init(this.domApp, {
        width: this.options.width,
        height: this.options.height,
    });
    this.groupBigImage = new zrender.Group({ name: 'group-big-image', draggable: true });
    this.groupMapImage = new zrender.Group({ name: 'group-map-image' });
    this.groupMapBg = new zrender.Group({ name: 'group-map-bg' });
    this.groupMapBtn = new zrender.Group({ name: 'group-map-btn' });
    this.groupMapContent = new zrender.Group({ name: 'group-map-content' });
    this.groupMapEye = new zrender.Group({ name: 'group-map-eye' });
    this.zr.add(this.groupBigImage);
    this.zr.add(this.groupMapImage);
    this.groupMapImage.add(this.groupMapBg);
    this.groupMapImage.add(this.groupMapBtn);
    this.groupMapImage.add(this.groupMapContent);
    this.groupMapContent.add(this.groupMapEye);
}

// 初始化 zrender 实例
ImageDetail.prototype.start = function() {
    var _this = this;
    this.loadImgData().then(function(imgData) {
        _this.imageData = imgData;
        _this.renderGroupBigImage();
        _this.renderGroupMapImage();
        _this.renderGroupMapContent();
        _this.renderGroupMapBg();
        _this.renderGroupMapEye();
        _this.update('view');
    })
}

// 渲染大图
ImageDetail.prototype.renderGroupBigImage = function() {
    this.addImage(this.groupBigImage, { z: 100 });
    this.addDefect(this.groupBigImage, { z: 101 });
    this.groupBigImage.on('mousewheel', onMousewheel, this);

    var run = false;
    var time = this.options.time;
    function onMousewheel(e) {
        if (run) return false;
        run = true;
        setTimeout(function() {
            run = false;
        }, time);
        var type = e.wheelDelta > 0 ? 'zoomout' : 'zoomin';
        this.update(type, true);
    }
}

// 渲染缩略地图
ImageDetail.prototype.renderGroupMapImage = function() {
    var map = this.options.map;
    var map_width = map.width;
    var map_height = map.height || map.width;
    var canvas_width = this.zr.getWidth();
    var canvas_height = this.zr.getHeight();
    this.groupMapImage.attr({
        position: [
            canvas_width - map_width,
            canvas_height - map_height,
        ],
    })
    this.mapWidth = map_width;
    this.mapHeight = map_height;
}

// 渲染缩略地图 - 图片
ImageDetail.prototype.renderGroupMapContent = function() {
    var map = this.options.map;
    var map_width = this.mapWidth;
    var map_height = this.mapHeight;
    var content_width = map_width;
    var content_height = map_height - map.btnHeight - map.space * 2;
    var best_size = this.getBestSize({
        w: content_width,
        h: content_height,
        ew: this.imageData.width,
        eh: this.imageData.height,
    });
    var content_box = new zrender.Group({
        scale: [
            best_size.w / this.imageData.width,
            best_size.h / this.imageData.height
        ],
        position: [
            best_size.x,
            best_size.y,
        ],
    });
    this.addImage(content_box, { z: 300 });
    this.addDefect(content_box, { z: 301 });
    this.groupMapContent.add(content_box);
    this.contentWidth = content_width;
    this.contentHeight = content_height;
}

// 渲染缩略地图 - 背景
ImageDetail.prototype.renderGroupMapBg = function() {
    var map = this.options.map;
    var map_width = this.mapWidth;
    var map_height = this.mapHeight;
    var stroke = map.stroke;
    this.groupMapBg.add(new zrender.Line({
        shape: {
            x1: 0 + 0.5,
            y1: 0 + 0.5,
            x2: map_width + 0.5,
            y2: 0 + 0.5,
        },
        style: {
            stroke: stroke,
        },
        z: 310,
    }));
    this.groupMapBg.add(new zrender.Line({
        shape: {
            x1: 0 + 0.5,
            y1: 0 + 0.5,
            x2: 0 + 0.5,
            y2: map_height + 0.5,
        },
        style: {
            stroke: stroke,
        },
        z: 310,
    }));
    this.groupMapBg.add(new zrender.Line({
        shape: {
            x1: 0 + 0.5,
            y1: map_height - map.btnHeight - map.space * 2 + 0.5,
            x2: map_width + 0.5,
            y2: map_height - map.btnHeight - map.space * 2 + 0.5,
        },
        style: {
            stroke: stroke,
        },
        z: 310,
    }));
    this.groupMapBg.add(new zrender.Rect({
        shape: {
            x: 0 + 0.5,
            y: 0 + 0.5,
            width: map_width,
            height: map_height,
        },
        style: {
            fill: '#fff',
        },
        z: 200,
    }));
}

// 渲染缩略地图 - 鹰眼
ImageDetail.prototype.renderGroupMapEye = function() {
    var map = this.options.map;
    var eye = this.options.eye;
    var map_width = this.mapWidth;
    var map_height = this.mapHeight;
    var content_width = this.contentWidth;
    var content_height = this.contentHeight;

    this.groupMapEye.add(new zrender.Rect({
        shape: {
            width: content_width - 1,
            height: content_height - 1,
            x: 0,
            y: 0,
        },
        style: {
            fill: 'none',
            stroke: eye.stroke,
            lineWidth: eye.lineWidth,
        },
        z: 400,
    }));
}

// 添加图片
ImageDetail.prototype.addImage = function(box, params = {}) {
    var img_data = this.imageData;
    box.add(new zrender.Image(zrender.util.merge({
        style: {
            image: img_data,
            width: img_data.width,
            height: img_data.height,
        },
    }, params, true)));
}

// 添加缺陷标识
ImageDetail.prototype.addDefect = function(box, params = {}) {
    var group = new zrender.Group({ name: 'group-defect' });
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
        group.add(new zrender.Rect(zrender.util.merge({
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
    box.add(group);
}

// 同步更新 groupBigImage
ImageDetail.prototype.update = function(type, isAnimate = false) {
    var groupBigImage = this.groupBigImage;
    var groupEye = this.groupMapEye;
    var time = this.options.time;
    var canvas_width = this.zr.getWidth();
    var canvas_height = this.zr.getHeight();
    var content_width = this.contentWidth;
    var content_height = this.contentHeight;
    var full_size = this.groupBigImage.getBoundingRect();
    var best_size = this.getBestSize({
        w: canvas_width,
        h: canvas_height,
        ew: full_size.width,
        eh: full_size.height,
    })
    var add_scale = 0;
    var img_prev_scale = this.groupBigImage.scale;
    var img_next_scale = img_prev_scale;
    var img_prev_position = this.groupBigImage.position;
    var img_next_position = img_prev_position;
    var eye_full_size = groupEye.getBoundingRect();
    var eye_next_width = eye_full_size.width;
    var eye_next_height = eye_full_size.height;
    var eye_prev_scale = groupEye.scale;
    var eye_next_scale = eye_prev_scale;
    var eye_prev_position = groupEye.position;
    var eye_next_position = eye_prev_position;
    switch(type) {
        case 'view':
            img_next_scale = [
                best_size.w / full_size.width,
                best_size.h / full_size.height,
            ];
            img_next_position = [
                best_size.x,
                best_size.y,
            ];
            break;
        case 'origin':
            img_next_scale = [1, 1];
            img_next_position = [
                (canvas_width - full_size.width) / 2,
                (canvas_height - full_size.height) / 2,
            ];
            break;
        case 'zoomin':
        case 'zoomout':
            add_scale = (type === 'zoomin' ? -1 : 1) * 0.1;
            img_next_scale = img_prev_scale.map(v => add_scale + v);
            img_next_position = [
                img_prev_position[0] - full_size.width * add_scale / 2,
                img_prev_position[1] - full_size.height * add_scale / 2
            ];
            eye_next_scale = [
                Math.min(canvas_width / (full_size.width * img_next_scale[0]), 1),
                Math.min(canvas_height / (full_size.height * img_next_scale[1]), 1),
            ];
            eye_next_position = [
                eye_full_size.width * eye_next_scale[0] / 2,
                eye_full_size.height * eye_next_scale[1] / 2,
            ];
            break;
    }

    console.log('full_size>>>', full_size);

    if (isAnimate) {
        groupBigImage.animateTo({
            scale: img_next_scale,
            position: img_next_position,
        }, time, function() {
            // console.log('groupBigImage>>>', groupBigImage);
        });
        groupEye.animateTo({
            scale: eye_next_scale,
            position: eye_next_position,
        }, time, function() {
            console.log('groupEye>>>', groupEye);
        });
    } else {
        groupBigImage.attr({
            scale: img_next_scale,
            position: img_next_position,
        });
        groupEye.attr({
            scale: eye_next_scale,
        });
        // console.log('this.groupBigImage>>>', this.groupBigImage);
    }
}

// 计算最大化显示元素的 width, height
ImageDetail.prototype.getBestSize = function(params) {
    var window_width = params.w;
    var window_height = params.h;
    var element_width = params.ew;
    var element_height = params.eh;

    if (!window_width || !window_height || !element_width || !element_height) {
        return { w: 0, h: 0, x: 0, y: 0 };
    }

    if (window_width >= element_width && window_height >= element_height) {
        return {
            w: element_width,
            h: element_height,
            x: (window_width - element_width) / 2,
            y: (window_height - element_height) / 2,
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
        x: (window_width - new_element_width) / 2,
        y: (window_height - new_element_height) / 2,
    }
}
