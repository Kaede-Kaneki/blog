<template>
    <div class="blog">
        <div class="blog-content" v-if="$route.path==='/blog'">
            <div class="blog-item" v-for="item in articleList" :key="item.id">
                <h3 class="blog-item-title" @click="handlePush(item)">{{ item.title }}</h3>
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
    </div>

</template>

<script>
import {commonObj} from "../../utils/common";
import marked from "marked";

export default {
    name: "blog",
    components: {},
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
            Object.keys(data).forEach(k => {
                console.log(marked(data[k].content))
                data[k].desc = marked(data[k].content).replace(/<[^>]+>|&[^>]+;/g, "").trim()
            })
            this.articleList = data
        },

        async handleMenuClick(item) {
            const data = await this.$api.reqArticle({id: item.id})
            Object.keys(data).forEach(k => {
                data[k].desc = marked(data[k].content).replace(/<[^>]+>|&[^>]+;/g, "").trim()
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

.blog-item {
    display: flex;
    flex-wrap: wrap;
    padding-top: j(20);

    &:first-child {
        padding-top: 0;
    }

    &-title {
        width: 100%;
        font-size: 20px;
        cursor: pointer;
    }

    &-subtitle {
        @extend %c9;
        padding-top: j(3);
        padding-right: j(10);
    }

    &-content {
        width: 100%;
        padding-top: j(3);
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #666;
    }
}
</style>
