<template>
    <img class="b-image" :src="src" :alt="alt">
</template>

<script>
export default {
    name: "B-Image",
    props: {
        src: {
            type: String,
            default: require("src/assets/image/Avatar.png")
        },
        alt:{
            type:String,
            default:''
        },

    },
    data() {
        return {}
    },
    methods: {},
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
.b-image{
    @extend %df;
    @extend %gb;
    width: j(40);
    height: j(40);
    object-fit: cover;
    border-radius: j(10);
    background-color: $transparent-white-hover;
}
</style>
