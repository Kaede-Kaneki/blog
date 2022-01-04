import Vue from "vue";

Vue.mixin({
    methods: {
        skip(url) {
            window.open(url)
        },
        regMatch(content, reg) {
            if (typeof content !== "string") return false
            else {
                return content.match(reg)
            }
        },
        contentDetection(content) {
            content = content.replace(/<[^<>]+?>/g, '')
            return content
        },
        regMail(mail) {
            const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g
            return reg.test(mail)
        },
        formatDate(date) {
            date = new Date(date).getTime()
            let result
            let now = new Date().getTime();
            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let month = day * 30;
            let diffValue = now - date;
            if(diffValue < 0){return;}
            let monthC =diffValue/month;
            let weekC =diffValue/(7*day);
            let dayC =diffValue/day;
            let hourC =diffValue/hour;
            let minC =diffValue/minute;
            if(monthC>=1){
                result="" + parseInt(monthC) + "月前";
            }
            else if(weekC>=1){
                result="" + parseInt(weekC) + "周前";
            }
            else if(dayC>=1){
                result=""+ parseInt(dayC) +"天前";
            }
            else if(hourC>=1){
                result=""+ parseInt(hourC) +"小时前";
            }
            else if(minC>=1){
                result=""+ parseInt(minC) +"分钟前";
            }else
                result="刚刚";
            return result
        }
    },
})

