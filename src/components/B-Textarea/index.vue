<template>
    <div class="b-textarea" >
        <textarea class="b-textarea-content" :value="value" :placeholder="placeholder" :maxlength="maxlength" @input="handleInput" @blur="handleBlur"></textarea>
        <label class="b-textarea-count">{{computedValueLength}}/{{maxlength}}</label>
    </div>
</template>

<script>
export default {
    name: "B-Textarea",
    props:{
        value:{
            default:""
        },
        maxlength:{
            default:"100",
        },
        placeholder:{
            type:String,
            default: "",
        },

    },
    computed:{
        computedValueLength () {
            const { value }=this
            return value.toString().length
        }
    },
    methods: {
        handleInput(e){
            let value = e.target.value
            this.$emit('input',value)
        },
        handleBlur(){
            this.$emit('blur',this.value)
        }
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
.b-textarea{
    @extend %df;
    @extend %df1;
    @extend %pr;
    padding-top: j(5);
    &-content{
        @extend %df;
        @extend %df1;
        @extend %bn;
        width: 100%;
        padding: j(5);
        height: j(50);
        border-radius: j(3);
        background-color: $transparent-white;
    }
    &-content::-webkit-scrollbar{
       @extend %dn;
    }
    &-count{
        @extend %pa;
        @extend %r0;
        @extend %b0;
        font-size: j(4);
        padding: j(5);
    }
}
</style>
