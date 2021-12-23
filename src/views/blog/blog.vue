<template>
  <div class="blog">
    <div v-if="$route.path!=='/blog'" @click="$router.replace('/blog')" style="cursor: pointer">返回</div>
    <div class="blog-content" v-if="$route.path==='/blog'">
      <div class="blog-item" v-for="item in articleList" :key="item.id">
        <h3 class="blog-item-title">{{item.title}}</h3>
        <span class="blog-item-subtitle">{{item.category_name}}</span>
        <span class="blog-item-subtitle">{{formatTimeToStr(item.create_time,'yyyy-MM-dd hh:mm')}}</span>
      </div>
    </div>
    <router-view class="markdown" v-else></router-view>
    <div class="blog-menu" ref="menu">
      <router-link
          v-for="item in menuList"
          :key="item.id"
          :to="``"
          @click.native="handleClick(item.title)"
      >
        {{ item.title }}
        {{ item.num === null ? '' : '('+item.num+')' }}
      </router-link>
      <p v-if="menuList.length === 0">{{ '暂无数据' }}</p>
    </div>
  </div>

</template>

<script>
import {commonObj} from "../../utils/common";
export default {
  name: "blog",
  components: {},
  data() {
    return {
      menuList: [],
      articleList:[]
    }
  },
  created() {
    this.reqDir()
    this.reqArticle()
  },
  methods: {
    async reqDir(){
      const data = await this.$api.reqMd()
      this.menuList=this.menuList.concat(data)
    },
    async reqArticle(){
      const data = await this.$api.reqArticleList()
      this.articleList=data
    },
    formatTimeToStr(date,fmt){
      return commonObj.formatTimeToStr(new Date(date),fmt)
    },
    handleClick(item){
      console.log(item)
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/scss/define';
@import "src/assets/scss/media-screen";
.blog-item{
  display: flex;
  flex-wrap: wrap;
  padding-top: j(10);
  &:first-child{
    padding-top: 0;
  }
  &-title{
    width: 100%;
    font-size: 20px;
  }
  &-subtitle{
    @extend %c9;
    padding-top: j(3);
    padding-right: j(10);
  }
}
</style>