<template>
  <div>
    <note class="markdown-body"></note>
  </div>
</template>

<script>
import Note from 'src/assets/notes/随笔.md'
export default {
  name: "index",
  data() {
    return {
    }
  },
  components: {
    Note,
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
</style>