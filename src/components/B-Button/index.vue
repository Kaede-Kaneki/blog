<template>
    <button class="b-button" :class="{'margin-right':marginRight}" @click="handleClick"><slot></slot></button>
</template>

<script>
export default {
    name: "B-Button",
    props:{
        marginRight:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        handleClick(){
            this.$emit('click')
        }
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
.b-button{
    @extend %bn;
    @extend %ao8;
    @extend %cp;
    @extend %bsb;
    margin-top: j(5);
    padding: j(3);
    border-radius: j(3);
    background-color: $transparent-white-hover;
}
.margin-right{
    margin-right: j(5);
}
</style>
