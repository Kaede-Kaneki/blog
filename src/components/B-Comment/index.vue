<template>
    <div class="b-comment">
        <b-image :src="commentFrom.objImage.src"></b-image>
        <div class="b-comment-desc">
            <div class="b-comment-input">
                <component v-for="item in commentFrom.objInput"
                           :key="item.index"
                           :is="item.is"
                           :label="item.label"
                           :type="item.type"
                           v-model.trim="item.value"
                           :placeholder="item.placeholder"
                           :class="{'paddingRight':item.paddingRight}"
                           @blur="handleBlur(item)"
                ></component>
            </div>
            <b-textarea v-model.trim="commentFrom.objTextarea.value" :placeholder="commentFrom.objTextarea.placeholder"></b-textarea>
            <div class="b-comment-btn">
                <b-button v-for="item in commentFrom.objButton" :key="item.index" :margin-right="item.marginRight" @click="handleClick(item.label)">{{item.label}}</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import BInput from 'src/components/B-Input'
import BImage from 'src/components/B-Image/index'
import BTextarea from 'src/components/B-Textarea/index'
import BButton from 'src/components/B-Button/index'
export default {
    name: "B-Comment",
    components:{
        BInput,
        BImage,
        BTextarea,
        BButton
    },
    props:{
        commentFrom:{
            type:Object,
            default:()=>{}
        },
    },
    methods: {
        handleInput(){
            const { objTextarea } = this
            this.$emit('input',objTextarea.value)
        },
        handleClick(label){
            if(label==='预览') return false
            console.log(this.commentFrom)
            this.$notify({message:"111"})
        },
        handleBlur(item) {
            const { objImage,objInput }=this.commentFrom
            const{ Email }=objInput
            if (!item.value) return false
            else {
                const reg=/^[0-9]*$/g
                if(item.label==='昵称'&&reg.test(item.value)){
                    objImage.src=`https://q2.qlogo.cn/headimg_dl?dst_uin=${item.value}&spec=100`
                    Email.value=item.value+'@qq.com'
                }
                else {
                    objImage.src=require("src/assets/image/Avatar.png")
                    Email.value=""
                    return false
                }
            }
        },
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
.b-comment {
    @extend %df;
    @extend %df1;
    padding: j(10) 0;

    &-desc {
        @extend %df1;
        padding-left: j(5);
    }
    &-input{
        @extend %df;
        @extend %fww;
    }
    &-btn{
        @extend %df;
        @extend %jce;
        &:nth-child(1){
            background-color: pink;
            margin-right: j(5);
        }
    }
}
.paddingRight{
    padding-right: j(5);
}
</style>
