<template>
  <div class="markdown-body">
    <test-md ></test-md>
  </div>

</template>

<script>
import TestMd from 'src/assets/notes/test.md'
import 'src/assets/notes/test.md'
export default {
  name: "test",

  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  components:{
    TestMd,
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
</style>