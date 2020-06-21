function renderGroupDefect() {
    var group = new zrender.Group({
        name: 'defect',
    });

    var lineWidth = 2;

    DEFECT_INFOS.forEach(v => {
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
                stroke: '#24e510',
                lineWidth: 2,
            },
            z: 10
        })
        group.add(rect);
    })

    return group;
}
