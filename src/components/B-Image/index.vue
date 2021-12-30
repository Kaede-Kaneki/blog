<template>
    <img class="b-image" :src="src" :alt="alt">
</template>

<script>
export default {
    name: "B-Image",
    props: {
        src: {
            type: String,
            default: ''
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
    background-color: pink;
    border-radius: j(10);
}
</style>
