<template>
  <div class="markdown-body" style="overflow-x: hidden">
    <div v-html="compiledMarkdown" v-highlight></div>
  </div>
</template>

<script>
import marked from "marked";

export default {
  name: "test",
  data() {
    return {
      content: ''
    }
  },
  created() {
    this.getMd()
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content || '')
    }
  },
  methods: {
    async getMd() {
      const data = await this.$api.reqMd()
      this.content = data
    },
    markdown() {
      marked.setOptions({
            renderer: new marked.Renderer(),
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
          }
      )
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
@import "node_modules/highlight.js/scss/vs";
</style>