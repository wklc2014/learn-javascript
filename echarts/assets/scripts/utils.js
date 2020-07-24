function getLabel(data) {
    var config = data.config || {};
    var categoryConfig = getCategory(data.category);
    var label = data.label || {};
    // 节点文案默认配置
    var obj = {
        show: true,
        color: '#333',
        position: 'right',
        offset: [0, 0],
        distance: 3,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        fontSize: "12",
    }
    Object.assign(obj, label);
    // 地铁线路名称节点配置
    if (config.type === 'lineName') {
        var nameObj = {
            color: '#fff',
            position: 'inside',
            padding: [4, 10],
            lineHeight: 30,
            borderRadius: 3,
            fontWeight: 'bold',
            backgroundColor: categoryConfig.mainColor,
        }
        Object.assign(obj, nameObj);
    }
    return obj;
}

function getCategory(categoryId) {
    var obj = CATEGORYS.find(v => v.id === categoryId);
    return obj || {};
}

function getSymbol(data) {
    var config = data.config || {};
    if (config.type === 'empty') {
        return 'none';
    }
    return data.symbol || 'circle';
}
