function operateZoom(group, type) {
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
    }, TIME, function() {
        console.log('group>>>', group);
    })
}

// 原始比例
function operateOrign(group) {
    group.attr({
        scale: [1, 1],
        position: [0, 0],
    })
}
