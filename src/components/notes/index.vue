<template>
  <div>
    <note class="markdown-body"></note>
  </div>
</template>

<script>
import Note from 'src/assets/notes/test.md'
export default {
  name: "index",
  data() {
    return {
      content:''
    }
  },
  components: {
    Note,
  },
  created() {
    this.getMd()
  },
  methods: {
    async getMd(){
      const data= await this.$api.reqMd()
      this.content=data
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
</style>