<template >
  <div class="markdown-body" v-highlight v-html="text"></div>
</template>

<script>
export default {
  name: "note",
  data() {
    return {
      text:'',
    }
  },
  created() {
    this.text=this.$route.query.item.content
  },
  methods: {},
}
</script>

<style scoped lang="scss">

</style>