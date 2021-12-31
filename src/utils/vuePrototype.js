import Vue from "vue";

Vue.mixin({
    methods: {
        skip(url) {
            window.open(url)
        },
        regMatch(content,reg){
            if(typeof content!=="string") return false
            else {
                return content.match(reg)
            }
        },
        contentDetection(content){
            content=content.replace(/<[^<>]+?>/g,'')
            return content
        }
    },
})

