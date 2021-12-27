<template>
  <div id="app">
    <router-view class="view-wrap"/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/reset";
@import "assets/scss/define";
@import "assets/scss/media-screen";
  html, body {
    @extend %h100;
  }

  #app {
    @extend %w100;
    //@extend %h100;
  }

  .view-wrap {
    @extend %pr;
    @extend %w100;
    @extend %h100;
    min-height: 100vh;
    background-color: #f3f4f5;
  }


//html {
//  scrollbar-width: thin;
//}
//
//*,
//*:before,
//*:after {
//  box-sizing: inherit;
//  scrollbar-width: inherit;
//}
//
//// 伪元素无法继承
//*::-webkit-scrollbar {
//  width: 10px;
//  height: 10px;
//}
//*::-webkit-scrollbar-thumb {
//  background: hsl(214, 13%, 75%);
//  border-radius: 4px;
//}

</style>
