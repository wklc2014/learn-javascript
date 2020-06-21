function renderGroupThumb(img) {
    var group = new zrender.Group({
        position: [
            APP_WIDTH - THUMB_WIDTH,
            APP_HEIGHT - THUMB_HEIGHT,
        ]
    });

    var rect = new zrender.Rect({
        style: {
            width: THUMB_WIDTH,
            height: THUMB_HEIGHT,
            fill: '#fff',
            stroke: '#ddd',
        },
        shape: {
            x: 0,
            y: 0,
            width: THUMB_WIDTH,
            height: THUMB_HEIGHT,
        },
    });

    group.add(rect);

    var image = new Image();
    image.src = img;
    image.onload = imageLoad;

    function imageLoad() {
        var top = 5;
        var left = 5;
        var imageEle = new zrender.Image({
            name: 'imageview',
            style: {
                image: image,
                width: THUMB_WIDTH - left * 2,
                height: THUMB_HEIGHT - top * 2,
                x: left,
                y: top,
            },
        });
        group.attr({
        })
        group.add(imageEle);
    }

    return group;
}
