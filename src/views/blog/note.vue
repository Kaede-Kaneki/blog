<template>
    <div class="note">
        <div v-if="$route.path!=='/blog'" @click="$router.replace('/blog')" class="note-bar">返回</div>
        <div class="note-content">
            <div class="head">
                <h1 class="head-title" v-html="item.title"></h1>
                <span class="head-tag">{{item.category_name}}</span>
                <span class="head-date">{{formatTimeToStr(item.create_time, 'yyyy-MM-dd hh:mm') }}</span>
            </div>
            <div class="markdown-body" v-highlight v-html="item.content"></div>
        </div>
        <div class="note-menu" ref="menu" >
            <h1 class="title">目录</h1>
            <a href="javascript:" class="list" v-for="item in title" :key="item.index" v-html="item"></a>
        </div>
    </div>
</template>

<script>
import {commonObj} from "../../utils/common";
export default {
    name: "note",
    data() {
        return {
            item: '',
            title:''
        }
    },
    created() {
        this.setStorage(this.$route.query.item)
        this.updateStorage()
    },
    methods: {
        setStorage(item){
            typeof item !== 'string' && sessionStorage.setItem("article",JSON.stringify(item))
        },
        updateStorage(){
            this.item=JSON.parse(sessionStorage.getItem("article"))
            this.regTest()
        },
        regTest(){
            let reg=/<h[2-6][^>]*>(.*?)<\/h[2-6]>/g
            this.title=commonObj.regFilter(this.item.content,reg)
            this.item.title=commonObj.regFilter(this.item.content,/<h1[^>]*>(.*?)<\/h1>/g)[0]
            this.item.content=this.item.content.replace(/<h1[^>]*>(.*?)<\/h1>/g," ")
        },
        formatTimeToStr(date, fmt) {
            return commonObj.formatTimeToStr(new Date(date), fmt)
        },
    },
}
</script>

<style scoped lang="scss">
@import 'src/assets/scss/define';
@import "src/assets/scss/media-screen";


.list{
    color: #333;
    /deep/ h2{
        font-weight: normal;
    }
    /deep/ h3{
        font-weight: normal;
        padding-left: j(15);
    }
    /deep/ h4{
        font-weight: normal;
        padding-left: j(20);
    }
    /deep/ h5{
        font-weight: normal;
        padding-left: j(25);
    }
    /deep/ h6{
        font-weight: normal;
        padding-left: j(30);
    }
    &:hover{
        text-decoration-line: underline;
    }
}
.title{
    font-size: 18px;
}
</style>
