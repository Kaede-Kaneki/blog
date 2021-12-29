<template>
    <div class="blog">
        <b-card  class="blog-content" v-if="$route.path==='/blog'">
            <b-card  text class="blog-item" v-for="item in articleList" :key="item.id"  @click.native="handlePush(item)">
                <h3 class="blog-item-title">{{ item.title }}</h3>
                <span class="blog-item-subtitle">{{ item.category_name }}</span>
                <span class="blog-item-subtitle">{{ formatTimeToStr(item.create_time, 'yyyy-MM-dd hh:mm') }}</span>
                <p class="blog-item-content">{{ item.desc }}</p>
            </b-card>
        </b-card>
        <router-view v-else></router-view>
        <b-card filter class="blog-menu" ref="menu" v-if="$route.path === '/blog'">
            <a href="javascript:"
               v-for="item in menuList"
               :key="item.id"
               @click="handleMenuClick(item)"
            >
                {{ item.title }}
                {{ item.num === 0 ? '' : '(' + item.num + ')' }}
            </a>
            <p v-if="menuList.length === 0">{{ '暂无数据' }}</p>
        </b-card>
        <b-back-top><i class="iconfont icon-fanhuidingbu"></i></b-back-top>
    </div>

</template>

<script>
import {commonObj} from "src/utils/common";
import marked from 'src/utils/marked'
import BBackTop from 'src/components/B-Backtop/index'
import BCard from 'src/components/B-Card/index'

export default {
    name: "blog",
    components: {
        BBackTop,
        BCard
    },
    data() {
        return {
            menuList: [],
            articleList: []
        }
    },
    created() {
        this.reqDir()
        this.reqArticle()
    },
    methods: {
        async reqDir() {
            const data = await this.$api.reqMd()
            data.unshift({
                id: 0,
                title: "全部",
                num: 0
            })
            this.menuList = this.menuList.concat(data)
        },
        async reqArticle() {
            const data = await this.$api.reqArticle()
            let text=''
            Object.keys(data).forEach(k => {
                let desc=''
                text = marked(data[k].content).match(/<p\b[^<>]*>.*[^<>].*<\/p>/g)
                text && Object.keys(text).forEach(s=>{
                            desc=desc.concat(text[s]).replace(/<[^>]+>|&[^>]+;/g,"")
                        })
                data[k].desc=desc
                //todo 这里暂时注释 因为本次数据库中的文章 有的没有给定标题，待修改
                // data[k].title=commonObj.regMatch(marked(data[k].content),/<h1[^>]*>(.*?)<\/h1>/g)
                // console.log(data[k].title[0])
            })
            this.articleList = data
        },

        async handleMenuClick(item) {
            const data = await this.$api.reqArticle({id: item.id})
            let text=''
            Object.keys(data).forEach(k => {
                let desc=''
                text = marked(data[k].content).match(/<p\b[^<>]*>.*[^<>].*<\/p>/g)
                text && Object.keys(text).forEach(s=>{
                    desc=desc.concat(text[s]).replace(/<[^>]+>|&[^>]+;/g,"")
                })
                data[k].desc=desc
            })
            this.articleList = data
        },
        handlePush(item) {
            item.content = marked(item.content)
            this.$router.push({path: `/blog/note`, query: {id: item.id, categoryId: item.category_id, item: item}})
        },
        formatTimeToStr(date, fmt) {
            return commonObj.formatTimeToStr(new Date(date), fmt)
        },
    }
}
</script>

<style scoped lang="scss">
@import 'src/assets/scss/define';
@import "src/assets/scss/media-screen";
.blog {
    padding: j(30) j(60);
    display: flex;
    &-content{
        @extend %bfb20;
        display: flex;
        flex-direction: column;
        flex: 4;
        //min-height: j(600);
        overflow-y: hidden;
    }

    &-menu {
        position: sticky;
        top: 50px;
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 20%;
        margin-left: j(15);
        min-width: j(150);
        height: fit-content;
        min-height: j(250);
        padding: j(10) j(15);
        border-radius: j(20);
        background-color: $transparent-white;
        z-index: 1;
        a {
            padding: j(0) j(10);
            margin: j(3);
            color: $black;
            transition: all .2s;
            box-sizing: border-box;
            transform:translate3d(0,0,0);
            &:hover {
                transform:perspective(0) translateZ(0) scale(1.02,1.02);
            }
        }
    }

    &-item {
        @extend %df;
        @extend %fww;
        @extend %aic;
        @extend %bsb;
        @extend %cp;
        @extend %hty;
        margin: j(10) 0;
        padding: j(5) j(10);
        border-radius: j(5);
        animation-name:bounceInUp;
        animation-duration: 1s;

        &:first-child {
            margin-top: 0;
        }
        &-title {
            width: 100%;
            font-size: 20px;
        }
        &-subtitle {
            @extend %c6;
            padding: j(2) j(10) j(2) 0;
        }
        &-content {
            @extend %dbb2;
            width: 100%;
            padding: j(1) 0;
            color: $black;
        }
    }
}
</style>
