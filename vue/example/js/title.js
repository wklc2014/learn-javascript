/**
 * 全局注册
 * title 组件
 */

// Vue.component('my-title', {
//     template: `
//     <div>
//         <h1>{{text}}</h1>
//     </div>
//     `,
//     props: ['text'],
//     initData: function() {
//         return {
//         }
//     }
// })

// 局部注册组件
var MyBaseInput = {
    template: `
        <input
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
        />
    `,
    props: ['value'],
    mounted: function() {
        console.log('$attrs>>>', this)
    },
}

var MyTitle = {
    template: `
    <input
        class="child-class"
        style="font-size: 14px;"
        placeholder="默认placeholder"
        v-bind:value="text"
        required
    />
    `,
    inheritAttrs: false,
    props: ['placeholder', 'text'],
    created: function() {
        // const text = this.text;
        // console.log('type>>>', typeof text);
    },
    mounted: function() {
        console.log('$attrs>>>', this.$attrs)
    },
    initData: function() {
        return {
        }
    }
}
