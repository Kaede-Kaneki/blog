<template>
  <div class="beiye">
    <div class="header-wrap">
      <router-link to="/" exact class="header-home">
        <img class="header-home-logo" :src="require('src/assets/image/logo1.png')" alt="">
        <h3 class="header-home-title">北野</h3>
      </router-link>
      <i class="iconfont icon-caidan navbar-icon" @click="handleNavBar"></i>
      <div class="navbar" :class="{'active':visible}" @click="handleNavBar">
        <router-link class="navbar-item" @click.native="handleToggle('0')" to="/blog">博客</router-link>
        <router-link class="navbar-item" @click.native="handleToggle('1')" to="/articles">文章</router-link>
        <router-link class="navbar-item" @click.native="handleToggle('2')" to="/resource">资源</router-link>
        <router-link class="navbar-item" @click.native="handleToggle('3')" to="/about">关于</router-link>
      </div>
    </div>
    <router-view class="main-wrap"/>
    <div class="footer-wrap">
      <p>{{ `Copyright ©${new Date().getFullYear()} Designed by 北野` }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'beiye',
  components: {},
  data() {
    return {
      visible: this.$store.state.navBar,
    }
  },
   created() {

  },
  methods: {
    handleNavBar() {
      this.visible = !this.visible
    },
    handleToggle(e) {
      console.log(e)
    },
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/define";
//@import "src/assets/scss/media-screen";

.beiye {
  @extend %df;
  @extend %fdc;
}

.header-wrap {
  @extend %df;
  @extend %aic;
  @extend %jcs;
  @extend %pf;
  @extend %t0;
  @extend %l0;
  @extend %r0;
  @extend %pa;
  height: 46px;
  z-index: 1;
  background-color: #fff;
  a.router-link-active {
    color: #52BDA9;
  }
}

.header-home {
  @extend %df;
  @extend %aic;
  @extend %c3;
  height: 100%;
  background-color: #fff;
  &-logo {
    @extend %br50;
    width: j(20);
    height: j(20);
    padding: 0 j(5);
  }
}

.navbar {
  //&.active{
  //  @include tft(translate3d(0, 0%,0));
  //}
  &-icon {
    @extend %cp;
  }
  &-item {
    @extend %c3;
  }
}

.main-wrap {
  @extend %df1;
  //padding-top: 46px!important;
  margin-top: 46px;
  overflow-y: auto;
}


.footer-wrap {
  @extend %df;
  @extend %aic;
  @extend %jcc;
  @extend %c3;
  height: 100px;
  background-color: #fff;
}


</style>