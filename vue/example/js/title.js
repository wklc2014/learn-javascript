/**
 * 全局注册
 * title 组件
 */

Vue.component('my-title', {
    template: `
    <div>
        <h1>{{text}}</h1>
    </div>
    `,
    props: ['text'],
    initData: function() {
        return {
        }
    }
})

// 局部注册组件
var MyHeader = {

}
