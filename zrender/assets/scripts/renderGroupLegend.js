function renderGroupLegend() {
    var group = new zrender.Group();
    group.position = [0, 0];

    var y = 14;
    var width = 28;
    var height = 16;

    // render title
    var titleRect = new zrender.Rect({
        shape: {
            x: 0,
            y: y,
            width: width,
            height: height,
        },
        style: {
            fill: 'none',
            text: '图例：',
            textOffset: [0, 2],
            textFill: '#fff',
            textShadowColor: '#333',
            textShadowBlur: 2,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
        }
    })
    group.add(titleRect);

    // render items
    LEGEND_DATA.forEach((v, i) => {
        var x = i * width * 2.4 + width + 10;
        var rect = new zrender.Rect({
            shape: {
                x: x,
                y: y,
                width: width,
                height: height,
            },
            style: {
                fill: v.color,
                text: v.text,
                textPosition: 'right',
                textOffset: [0, 2],
                textFill: '#fff',
                textShadowColor: '#333',
                textShadowBlur: 2,
                textShadowOffsetX: 2,
                textShadowOffsetY: 2,
            }
        })
        group.add(rect);
    })

    var bounding = group.getBoundingRect();
    group.position[0] = APP_WIDTH - bounding.width - 44;

    return group;
}


