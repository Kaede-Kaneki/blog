<template >
  <div style="display: flex;">
    <div class="markdown markdown-body " v-highlight v-html="item.content"></div>
    <div class="blog-menu" ref="menu">
      <span>目录</span>
      <a href="javascript:"
         v-for="item in 10"
         :key="item.id"
      >
        {{ item}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "note",
  data() {
    return {
      item:'',
    }
  },
  created() {
    this.item=this.$route.query.item
  },
  methods: {},
}
</script>

<style scoped lang="scss">

</style>