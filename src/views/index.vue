<template>
  <div class="main-wrap">
    <div class="header-wrap">
      <router-link to="/" exact class="navbar-home">北野</router-link>
      <i class="iconfont icon-caidan navbar-icon"  @click="handleNavBar"></i>
      <transition name="fade">
        <div class="navbar" v-show="visible"  >
          <router-link class="navbar-item" to="blog">博客</router-link>
          <router-link class="navbar-item" to="article">文章</router-link>
          <router-link class="navbar-item" to="resource">资源</router-link>
          <router-link class="navbar-item" to="about">关于</router-link>
        </div>
      </transition>
    </div>
    <router-view class="main-inner"/>
    <div class="footer-wrap">
      <p>{{ `Copyright ©${new Date().getFullYear()} Designed by 北野` }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-wrap',
  components: {},
  data(){
    return{
      visible:false,
    }
  },
  methods:{
    handleNavBar(){
      this.visible=!this.visible
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/scss/define";
@import "src/assets/scss/media-screen";
    .main-wrap {
      @extend %df;
      @extend %fdc;
    }
    .header-wrap {
      @extend %pr;
      @extend %df;
      @extend %aic;
      justify-content: space-between;
      background-color: pink;
      a.router-link-active {
        color: #52BDA9;
      }
    }
    .main-inner {
      @extend %df1;
      //padding: 0 j(60);
      overflow-y: auto;
    }

    .footer-wrap {
      @extend %df;
      @extend %aic;
      @extend %jcc;
      @extend %c3;
      background-color: #F9F6FA;
      height: 100px;
    }

    .navbar-home {
      @extend %df;
      @extend %aic;
      @extend %c3;
      height: 100%;
    }


    .fade-enter-active, .fade-leave-active {
      transition: all 0.3s;
      transform: translate3d(0,0%,0);
    }
    .fade-enter, .fade-leave-to  {
      transform: translate3d(0,-200%,0);
    }

    .navbar-item {
      color: #333;
    }

    .navbar-icon {
      @extend %cp;
    }
</style>