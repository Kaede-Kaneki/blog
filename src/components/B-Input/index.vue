<template>
    <div>
        <input :type="type" :placeholder="placeholder" :value="value" :disabled="disabled" @blur="handleBlur"  @input="handleInput"/>
        <p>{{value}}</p>
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
        handleBlur(e){
            let value = e.target.value
            this.$emit('blur',value)
        },
    },
}
</script>

<style scoped lang="scss">

</style>
