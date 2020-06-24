async function cImageNode(url, options = {}) {
    var tmpID = +new Date().getTime();

    var params = zrender.util.merge({
        name: 'image-node-' + tmpID,
    }, options, true);
    console.log('params>>>', params);

    var group = new zrender.Group({
        name: params.name,
    });

    var imgData = await imageLoad(url);

    var imgEle = new zrender.Image({
        style: {
            image: imgData,
            width: imgData.width,
            height: imgData.height,
        }
    })

    group.add(imgEle);

    return group;
}

function imageLoad(url) {
    return new Promise((resove, reject) => {
        var img = new Image();
        img.src = url;
        img.onload = function() {
            resove(img);
        }
        img.onerror = function() {
            reject(img);
        }
    })
}
