<template>
    <div class="b-comment">
        <b-image v-if="!isComment" :src="commentFrom.objImage.src" alt="avatar"></b-image>
        <b-image v-if="isComment" :src="commentContent.user_avatar||require('src/assets/image/Avatar.png')"
                 alt="avatar"></b-image>
        <!--   回复  -->
        <div class="b-comment-desc" v-if="!isComment">
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
            <b-textarea v-model.trim="commentFrom.objTextarea.value"
                        :placeholder="commentFrom.objTextarea.placeholder"></b-textarea>
            <div class="b-comment-btn">
                <b-button v-for="item in commentFrom.objButton"
                          :key="item.index"
                          :margin-right="item.marginRight"
                          @click="handleClick(item.label)"
                >{{ item.label }}
                </b-button>
            </div>
        </div>
        <!--   评论  -->
        <div class="b-comment-desc" v-if="isComment">
            <div class="b-comment-user">
                <span class="b-comment-username">{{ commentContent.user_name }}</span>
                <span>{{ formatDate(commentContent.update_time) }}</span>
            </div>
            <b-card padding text>
                <p class="b-comment-usercomment">{{ commentContent.user_comment }}</p>
            </b-card>
            <i class="b-comment-reply iconfont icon-pinglun" @click="handleReply">回复</i>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BInput from 'src/components/B-Input'
import BImage from 'src/components/B-Image/index'
import BTextarea from 'src/components/B-Textarea/index'
import BButton from 'src/components/B-Button/index'
import BCard from 'src/components/B-Card/index'

export default {
    name: "B-Comment",
    components: {
        BInput,
        BImage,
        BTextarea,
        BButton,
        BCard
    },
    props: {
        commentFrom: {
            type: Object,
            default: () => {}
        },
        isComment: {
            type: Boolean,
            default: false
        },
        commentContent: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleInput() {
            const {objTextarea} = this
            this.$emit('input', objTextarea.value)
        },
        handleClick(label) {
            this.$emit('click', label)
        },
        handleBlur(item) {
            const {objImage, objInput} = this.commentFrom
            const {Email} = objInput
            if (!item.value) return false
            else {
                const reg = /^[0-9]*$/g
                if (item.label === '昵称' && reg.test(item.value)) {
                    objImage.src = `https://q2.qlogo.cn/headimg_dl?dst_uin=${item.value}&spec=100`
                    Email.value = item.value + '@qq.com'
                } else {
                    // objImage.src = require("src/assets/image/Avatar.png")
                }
            }
        },
        handleReply(){
            this.$emit('click')
        }
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

    &-input {
        @extend %df;
        @extend %fww;
    }

    &-btn {
        @extend %df;
        @extend %jce;
    }

    &-user {
        @extend %df;
        @extend %jcs;
    }

    &-username {
        @extend %cp;
        margin-right: j(5);
    }

    &-usercomment {
        white-space: pre-wrap;
        font-size: 16px;
    }
    &-reply{
        @extend %cp;
    }
}

.paddingRight {
    padding-right: j(5);
}
</style>
