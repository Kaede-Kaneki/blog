<template>
  <div class="blog">
    <br>
    <div class="test">
      <note class="markdown-body test" style="padding: j(50);border-radius: 50px"></note>
    </div>
    <br>
  </div>

</template>

<script>
import Note from 'src/assets/notes/随笔.md'
export default {
  name: "blog",
  components: {
    Note,
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/scss/define';
.blog{
  background-color: #f3f4f5;
}
.markdown-body {
  padding: j(15) !important;
}
</style>