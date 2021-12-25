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
            <div class="list" v-html="title"></div>
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
            let res=''
            let reg=/<h[2-6][^>]*>(.*?)<\/h[2-6]>/g
            this.title=commonObj.regMatch(this.item.content,reg)
            this.title && Object.keys(this.title).forEach(k => {
                res = res.concat(this.title[k])
            })
            this.title=res
            this.item.title=commonObj.regMatch(this.item.content,/<h1[^>]*>(.*?)<\/h1>/g)[0]
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

    height: j(240);
    overflow-y: auto;
    color: #333;
    /deep/ h2,/deep/ h3,/deep/ h4,/deep/ h5,/deep/ h6{
        padding: j(4) 0 j(0) 0;
        font-weight: normal;
        cursor: pointer;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover{
            text-decoration: underline;
        }
    }
    /deep/ h2{}
    /deep/ h3{
        padding-left: j(5);
    }
    /deep/ h4{
        padding-left: j(15);
    }
    /deep/ h5{
        padding-left: j(25);
    }
    /deep/ h6{
        padding-left: j(35);
    }
}
.list::-webkit-scrollbar{
    width: 0;
}
.title{
    padding-bottom: j(5);
    font-size: 18px;
}
</style>
