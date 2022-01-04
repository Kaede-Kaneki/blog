<template>
    <div class="b-card" :class="{'filter':filter,'text':text,'hover-scale':hoverScale,'padding':padding}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "BCard",
    props:{
        filter:{
            type:Boolean,
            default:false
        },
        text:{
            type:Boolean,
            default: false
        },
        hoverScale:{
            type:Boolean,
            default: false
        },
        padding:{
            type:Boolean,
            default: false
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
.b-card{
    padding: j(20);
    border-radius: j(20);
    background-color: $transparent-white;
    overflow-x: auto;
    z-index: 1;
}
.filter{
    @extend %bfb20;
}
.text{
    background-color: $theme-color-bright;
}
.hover-scale{
    @extend %hs
}
.padding{
    border-radius: j(5);
    padding: j(5) j(10)
}
</style>
