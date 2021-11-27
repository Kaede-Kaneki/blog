<template>
<div>
  home
  <ul v-for="item in 100" :key="item.index">
    <li>{{item}}</li>
  </ul>
</div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style scoped>

</style>