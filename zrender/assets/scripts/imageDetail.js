/**
 *
 */

function ImageDetail(options) {
    this.options = zrender.util.merge({
        width: 500,
        height: 400,
        time: 100,
        legendConfig: {
            width: 28,
            height: 16,
            top: 14,
            space: 10,
            titleText: '图例：',
        },
        defectConfig: {
            lineWidth: 2,
            stroke: '#24e510',
        }
    }, options, true);

    this.check();
    this.init();


    this.renderBigImageGroup();
    this.renderBigImage();
    this.renderDefect();
    this.renderLegend();

    this.thumbImageGroup = new zrender.Group({
        name: 'thumbImageGroup',
    });

    this.zrInstance.add(this.bigImageGroup);
    this.zrInstance.add(this.thumbImageGroup);
    this.zrInstance.add(this.thumbImageGroup);
    console.log('this>>>', this);
}

// 初始化
ImageDetail.prototype.init = function() {
    var options = this.options;
    var app = options.app;
    var oApp = document.getElementById(app);
    this.zrInstance = zrender.init(oApp, {
        width: options.width,
        height: options.height,
    });
}

// 渲染大图 Group
ImageDetail.prototype.renderBigImageGroup = function() {
    var run = false;
    var time = this.options.time;
    this.bigImageGroup = new zrender.Group({
        draggable: true,
        name: 'bigImageGroup',
    });
    this.bigImageGroup.on('mousewheel', groupMousewheel, this);

    function groupMousewheel(e) {
        if (run) return false;
        run = true;
        setTimeout(function() {
            run = false;
        }, time);
        var type = e.wheelDelta > 0 ? 'out' : 'in';
        this.operateZoom(type);
    }
}

// 渲染大图
ImageDetail.prototype.renderBigImage = function() {
    var options = this.options;
    var image = options.image;
    var width = options.width;
    var height = options.height;
    var bestSize = this.getBestSize({
        w: width,
        h: height,
        ew: image.width,
        eh: image.height,
    });
    var imageEle = new zrender.Image({
        name: 'bigImage',
        style: {
            image: image,
            width: image.width,
            height: image.height,
        },
        z: 11,
    })
    this.bigImageGroup.attr({
        scale: [
            bestSize.w / image.width,
            bestSize.h / image.height,
        ],
        position: [bestSize.x, bestSize.y],
    })
    this.bigImageGroup.add(imageEle);
}

// 渲染缺陷标识
ImageDetail.prototype.renderDefect = function() {
    var group = new zrender.Group({ name: 'defect' });
    var defectConfig = this.options.defectConfig;
    var lineWidth = defectConfig.lineWidth;
    var stroke = defectConfig.stroke;
    this.options.defect.forEach(v => {
        var x = v.left;
        var y = v.top;
        var width = v.right - v.left;
        var height = v.bottom - v.top;
        var rect = new zrender.Rect({
            shape: {
                x: x,
                y: y,
                width: width - lineWidth * 2,
                height: height - lineWidth * 2,
            },
            style: {
                stroke: stroke,
                lineWidth: lineWidth,
            },
            z: 12,
        })
        group.add(rect);
    })
    this.bigImageGroup.add(group);
}

// 渲染图例
ImageDetail.prototype.renderLegend = function() {
    this.legendGroup = new zrender.Group({
        name: 'legendGroup',
    });
    var legendConfig = this.options.legendConfig;
    var width = legendConfig.width;
    var height = legendConfig.height;
    var top = legendConfig.top;
    var space = legendConfig.space;
    var commonStyle = {
        textOffset: [0, 1],
        textFill: '#fff',
        fontSize: 12,
        textShadowColor: '#000',
        textShadowBlur: 2,
        textShadowOffsetX: 2,
        textShadowOffsetY: 2,
    };
    var titleWidth = this.getTextBounding(legendConfig.titleText, 'width');
    console.log('titleWidth>>>', titleWidth);
    var titleEle = new zrender.Rect({
        shape: {
            x: 0,
            y: 0,
            width: titleWidth,
            height: height,
        },
        style: Object.assign({}, commonStyle, {
            text: legendConfig.titleText,
            fill: 'none',
        }),
        z: 23,
    })
    this.legendGroup.add(titleEle);
    console.log('titleEle>>>', titleEle.getBoundingRect());
    var titleWidth = titleEle.getBoundingRect().width;
    var startX = titleWidth;
    this.options.legend.forEach((v, i) => {
        var group = new zrender.Group({
            name: v.text,
        });
        var x = i * width + startX;
        var textWidth = this.getTextBounding(v.text, 'width');
        var rectBgEle = new zrender.Rect({
            shape: {
                x: x,
                y: 0,
                width: width,
                height: height,
            },
            style: Object.assign({}, commonStyle, {
                text: v.text,
                fill: v.color,
                textPosition: 'right',
            }),
            z: 21,
        })
        group.add(rectEle);
    })
    var bounding = group.getBoundingRect();
    console.log('bounding>>>', bounding);
    group.position = [100, top];
    this.zrInstance.add(group);
}

// 验证参数完整性
ImageDetail.prototype.check = function() {
    var options = this.options;
    if (!zrender) {
        throw Error('ZRender.js is required');
    }
    if (!options.image) {
        throw Error('options.image is required');
    }
    if (!zrender.util.isArray(options.defect)) {
        this.options.defect = [];
    }
    if (!zrender.util.isArray(options.legend)) {
        this.options.legend = [];
    }
    return true;
}

// 根据视窗大小，返回元素的最大显示宽度和高度
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

// 大图缩放
ImageDetail.prototype.operateZoom = function(type) {
    var time = this.options.time;
    var group = this.bigImageGroup;
    var addScale = (type === 'out' ? 1 : -1) * 0.1;
    var oldScale = group.scale;
    var oldPosition = group.position;
    var size = group.getBoundingRect();
    var newScale = oldScale.map(v => addScale + v);
    var addPosition = [
        size.width * addScale / 2,
        size.height * addScale / 2,
    ];
    var newPosition = [oldPosition[0] - addPosition[0], oldPosition[1] - addPosition[1]];
    group.animateTo({
        scale: newScale,
        position: newPosition,
    }, time, function() {
        console.log('group>>>', group);
    })
}

// 尝试创建一个文本，获取文本实际宽度
ImageDetail.prototype.getTextBounding = function(text, attr) {
    var textEle = new zrender.Text({
        style: {
            text: text,
        }
    })
    var bounding = textEle.getBoundingRect();
    if (attr) {
        return bounding[attr] || bounding;
    }
    return bounding;
}
