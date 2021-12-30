<template>
    <div class="b-box">
        <span class="b-label">{{label}}{{':'}}</span>
        <input  class="b-input" :type="type" :placeholder="placeholder" :value="value" :disabled="disabled" @blur="handleBlur"  @input="handleInput"/>
    </div>
</template>

<script>
export default {
    name: "B-Input",
    props:{
        type:{
            type:[String,Number],
            default:"text"
        },
        placeholder:{
            type:String,
            default: "placeholder",
        },
        value:{
            default:""
        },
        label:{
            default:""
        },
        disabled:{
            type:Boolean,
            default:false
        },
    },
    data() {
        return {}
    },
    methods: {
        handleInput(e){
            let value = e.target.value
            this.$emit('input',value)
        },
        handleBlur(){
            this.$emit('blur',this.value)
        },
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
.b-box{
    @extend %df;
    @extend %aic;
    width: fit-content;
    height: j(20);
}
.b-label{
    @extend %df;
    @extend %aic;
    width: j(25);
    height: j(15);
    padding: j(2);
    border-top-left-radius: j(3);
    border-bottom-left-radius: j(3);
    color: $transparent-black;
    background-color: rgb(196, 196, 196);
}
.b-input{
    @extend %bn;
    width: 100%;
    max-width: j(150);
    height: j(15);
    padding: j(2);
    border-top-right-radius: j(3);
    border-bottom-right-radius: j(3);
    background-color: $transparent-white;
}
</style>
