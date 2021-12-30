<template>
    <div>
        <span>{{label}}{{':'}}</span>
        <input class="b-input" :type="type" :placeholder="placeholder" :value="value" :disabled="disabled" @blur="handleBlur"  @input="handleInput"/>
        <span>{{value}}</span>
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
.b-input{
    @extend %bn;
    //width: j(150);
}
</style>
