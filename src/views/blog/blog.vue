<template>
  <div class="blog">
    <div v-if="$route.path!=='/blog'" @click="$router.replace('/blog')" style="cursor: pointer">返回</div>
    <div class="blog-content" v-if="$route.path==='/blog'">
      <ul v-for="item in 12" :key="item.index">
        <li>{{item}}</li>
      </ul>
    </div>
    <router-view class="markdown" v-else></router-view>
    <div class="blog-menu" ref="menu">
      <router-link
          v-for="item in menuList"
          :key="item.index"
          :to="`${item.url}`"
      >
        {{ item.title }}
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: "blog",
  components: {},
  data() {
    return {
      menuList: [
        {
          url: '/blog/note',
          title: 'note',
        },
        {
          url: '/blog/test',
          title: 'test',
        },
      ],
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'src/assets/scss/define';
@import "src/assets/scss/media-screen";
</style>