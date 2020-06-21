function renderGroupView (img) {

    var group = new zrender.Group({
        draggable: true,
    });

    var image = new Image();
    image.src = img;
    image.onload = imageLoad;

    function imageLoad() {
        var bestSize = getBestSize({
            w: APP_WIDTH,
            h: APP_HEIGHT,
            ew: image.width,
            eh: image.height,
        });
        var imageEle = new zrender.Image({
            name: 'imageview',
            style: {
                image: image,
                width: image.width,
                height: image.height,
            },
        });
        group.attr({
            scale: [
                bestSize.w / image.width,
                bestSize.h / image.height,
            ],
            position: [bestSize.x, bestSize.y],
        })
        group.add(imageEle);
    }

    return group;
}

