// highlight.js  代码高亮指令
import Hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 代码高亮风格

// 定义Vue代码块高亮函数
function hljsDefineVue(hljs) {
    return {
        subLanguage: "xml",
        contains: [
            hljs.COMMENT("<!--", "-->", {
                relevance: 10,
            }),
            {
                begin: /^(\s*)(<script>)/gm,
                end: /^(\s*)(<\/script>)/gm,
                subLanguage: "javascript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /^(?:\s*)(?:<script\s+lang=(["'])ts\1>)/gm,
                end: /^(\s*)(<\/script>)/gm,
                subLanguage: "typescript",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /^(\s*)(<style(\s+scoped)?>)/gm,
                end: /^(\s*)(<\/style>)/gm,
                subLanguage: "css",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])(?:s[ca]ss)\1(?:\s+scoped)?>)/gm,
                end: /^(\s*)(<\/style>)/gm,
                subLanguage: "scss",
                excludeBegin: true,
                excludeEnd: true,
            },
            {
                begin: /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])stylus\1(?:\s+scoped)?>)/gm,
                end: /^(\s*)(<\/style>)/gm,
                subLanguage: "stylus",
                excludeBegin: true,
                excludeEnd: true,
            },
        ],
    };
}
// 注册Vue代码块高亮
Hljs.registerLanguage('vue',hljsDefineVue)

let Highlight = {};
// 自定义插件
Highlight.install = function (Vue) {
    // 自定义指令 v-highlight
    Vue.directive('highlight', {
        // 被绑定元素插入父节点时调用
        inserted: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                Hljs.highlightElement(blocks[i]);
            }
        },
        // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
        componentUpdated: function(el) {
            let blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                Hljs.highlightElement(blocks[i]);
            }
        }
    })
};

export default Highlight;
