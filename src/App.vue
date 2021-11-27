<template>
  <div id="app">
    <router-view class="view-wrap"/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/reset";
@import "assets/scss/define";
  html, body {
    @extend %h100;
  }

  #app {
    @extend %w100;
  }

  .view-wrap {
    @extend %pr;
    @extend %w100;
    @extend %h100;
    min-height: 100vh;

  }
</style>
