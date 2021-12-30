import {marked} from "marked";

const renderer = new marked.Renderer();

//重写 a 标签
renderer.link=(href, title, text )=>{
    return ` <a href="${href}" target="_blank" title="${title}">${text}</a>`;
}

marked.use({
        renderer: renderer,
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
    }
)

export default marked
