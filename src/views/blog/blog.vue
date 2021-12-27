<template>
    <div class="blog">
        <div class="blog-content" v-if="$route.path==='/blog'">
            <div class="blog-item" v-for="item in articleList" :key="item.id"  @click="handlePush(item)">
                <h3 class="blog-item-title">{{ item.title }}</h3>
                <span class="blog-item-subtitle">{{ item.category_name }}</span>
                <span class="blog-item-subtitle">{{ formatTimeToStr(item.create_time, 'yyyy-MM-dd hh:mm') }}</span>
                <p class="blog-item-content">{{ item.desc }}</p>
            </div>
        </div>
        <router-view v-else></router-view>
        <div class="blog-menu" ref="menu" v-if="$route.path === '/blog'">
            <a href="javascript:"
               v-for="item in menuList"
               :key="item.id"
               @click="handleMenuClick(item)"
            >
                {{ item.title }}
                {{ item.num === 0 ? '' : '(' + item.num + ')' }}
            </a>
            <p v-if="menuList.length === 0">{{ '暂无数据' }}</p>
        </div>
        <back-top><i class="iconfont icon-fanhuidingbu"></i></back-top>
    </div>

</template>

<script>
import {commonObj} from "../../utils/common";
import marked from '../../utils/marked'
import BackTop from '../../components/B-Backtop/index'

export default {
    name: "blog",
    components: {
        BackTop
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

</style>
