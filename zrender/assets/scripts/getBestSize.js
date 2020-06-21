/**
 * 根据视窗大小，返回元素的最大显示宽度和高度
 */
function getBestSize(params = {}) {
    var window_width = params.w;
    var window_height = params.h;
    var element_width = params.ew;
    var element_height = params.eh;


    if (!window_width || !window_height || !element_width || !element_height) {
        return {
            w: 0,
            h: 0,
            x: 0,
            y: 0,
        }
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

