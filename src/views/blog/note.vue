<template>
    <div class="note">
        <b-card filter v-if="$route.path!=='/blog'" class="note-bar">
            <i class="note-bar-item iconfont icon-fanhui" @click="$router.replace('/blog')"></i>
            <i class="note-bar-item iconfont icon-github-fill" @click="skip(GitHubUrl)"></i>
            <i class="note-bar-item iconfont icon-bilibili" @click="skip(BiLi)"></i>
        </b-card>
        <b-card filter text class="note-content">
            <div class="head">
                <h1 class="head-title" v-html="item.title"></h1>
                <span class="head-tag">{{ item.category_name }}</span>
                <span class="head-date">{{ formatTimeToStr(item.create_time, 'yyyy-MM-dd hh:mm') }}</span>
            </div>
            <div class="markdown-body" v-highlight v-html="item.content"></div>
            <div class="foot">
                <b-comment :comment-from="commentForm" :is-comment="false"
                           @click="handleClick(commentForm)"></b-comment>
                <div class="comment">
                    <b-comment v-for="item in commentArr" :key="item.comment_id" :comment-content="item"
                               :is-comment="true" @click="handleReply(item.uuid)">
                        <b-comment :key="item.uuid"
                                   :comment-from="replyForm"
                                   :is-comment="false"
                                   v-show="isReplyShow===item.uuid"
                                   @click="handleClick(replyForm,item)">
                        </b-comment>
                        <b-comment v-for="reply in item.children" :key="reply.reply_id" :comment-content="reply" :is-comment="true" @click="handleReply(reply.uuid)">
                            <b-comment :key="reply.uuid"
                                       :comment-from="replyForm"
                                       :is-comment="false"
                                       v-show="isReplyShow===reply.uuid"
                                       @click="handleClick(replyForm,item)">
                            </b-comment>
                        </b-comment>
                    </b-comment>
                    <b-card filter text v-if="!commentArr.length">
                        暂时没有评论
                    </b-card>
                </div>
            </div>
        </b-card>
        <b-card filter class="note-menu" ref="menu">
            <h1 class="title">目录</h1>
            <div class="list" v-html="title"></div>
        </b-card>
    </div>
</template>

<script>
import {commonObj} from "../../utils/common";
import NoteMixin from './note.mixin'
import BCard from 'src/components/B-Card'
import BComment from 'src/components/B-Comment/index'

export default {
    name: "note",
    mixins: [NoteMixin],
    components: {
        BCard,
        BComment
    },
    created() {
        this.setStorage(this.$route.query.item)
        this.updateStorage()
        this.getComment()
        this.getReply()
    },
    methods: {
        setStorage(item) {
            typeof item !== 'string' && sessionStorage.setItem("article", JSON.stringify(item))
        },
        updateStorage() {
            this.item = JSON.parse(sessionStorage.getItem("article"))
            this.regTest()
        },
        regTest() {
            let res = ''
            let reg = /<h[2-6][^>]*>(.*?)<\/h[2-6]>/g
            this.title = commonObj.regMatch(this.item.content, reg)
            this.title && Object.keys(this.title).forEach(k => {
                res = res.concat(this.title[k])
            })
            this.title = res
            this.item.title = commonObj.regMatch(this.item.content, /<h1[^>]*>(.*?)<\/h1>/g)[0]
            this.item.content = this.item.content.replace(/<h1[^>]*>(.*?)<\/h1>/g, "")
        },
        formatTimeToStr(date, fmt) {
            return commonObj.formatTimeToStr(new Date(date), fmt)
        },
        // 表单验证
        handleClick(commentForm,user) {
            const {isReply,objTextarea, objInput} = commentForm
            let value = objTextarea.value
            for (let k in objInput) {
                if (objInput[k].isRequire && !objInput[k].value) {
                    this.$message.warning({
                        message: `${objInput[k].placeholder}`,
                        duration: 1500
                    })
                    return false
                }
                if (!this.regMail(objInput.Email.value)) {
                    this.$message.warning("邮箱格式错误")
                    return false
                }
            }
            if (!value) {
                this.$message.warning(`内容不能为空！`)
                return false
            } else {
                value = this.contentDetection(value)
                if (value === "") {
                    this.$message.error("非法输入")
                    objTextarea.value = ""
                } else {
                    //todo 这里向后端发送留言
                    if(isReply){
                        const {id: articleId, category_id: categoryId} = this.item
                        const {
                            objImage: {src: replyAvatar},
                            objInput: {QQ: {value: replyName}, Email: {value: replyEmail}},
                            objTextarea: {value: replyComment}
                        } = commentForm
                        const {comment_id:commentId} =user
                        const form = {commentId,articleId, categoryId, replyAvatar, replyName, replyEmail, replyComment}
                        this.setReply(form)
                    }
                    else{
                        const {id: articleId, category_id: categoryId} = this.item
                        const {
                            objImage: {src: userAvatar},
                            objInput: {QQ: {value: userName}, Email: {value: userEmail}},
                            objTextarea: {value: userComment}
                        } = commentForm
                        const form = {articleId, categoryId, userAvatar, userName, userEmail, userComment}
                        this.setComment(form)
                    }
                }
            }
        },
        async setComment(form) {
            const data = await this.$api.reqSetComment(form)
            if (!data) {
                this.$message.success("评论成功")
                await this.getComment()
                this.commentForm.objTextarea.value = ""
            }
        },
        async getComment() {
            let {item} = this
            const {id: articleId} = item
            const data = await this.$api.reqGetComment({'articleId': articleId})
            console.log('data =>',data)
            this.commentArr = data
        },
        async setReply(form){
            const data = await this.$api.reqSetReply(form)
            if (!data) {
                this.$message.success("评论成功")
                await this.getComment()
                this.isReplyShow=""
                this.replyForm.objTextarea.value = ""
            }
        },
        handleReply(commentId) {
            console.log(commentId)
            this.isReplyShow === commentId ? this.isReplyShow = "" : this.isReplyShow = commentId
        }

    },
}
</script>

<style scoped lang="scss">
@import 'src/assets/scss/define';
@import "src/assets/scss/media-screen";

.note {
    display: flex;
    width: 100%;

    &-bar {
        position: sticky;
        top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-right: j(15);
        height: j(250);
        width: j(20);
        border-radius: j(20);
        padding: j(20) j(15);
        animation-name: bounceInLeft;
        animation-duration: 1s;
        z-index: 1;

        &-item {
            padding: j(5) 0;
            font-size: 20px;
            cursor: pointer;

            &:hover {
                color: skyblue;
            }
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        flex: 4;
        padding: j(20);
        border-radius: j(20);
        overflow-x: auto;
        z-index: 1;
        //animation-name: bounceInUp;
        //animation-duration: 1s;
    }

    &-menu {
        position: sticky;
        top: 50px;
        margin-left: j(15);
        height: fit-content;
        min-height: j(250);
        max-width: j(150);
        width: 20%;
        padding: j(10) j(15);
        border-radius: j(20);
        word-break: break-word;
        z-index: 1;
        animation-name: bounceInRight;
        animation-duration: 1s;

        a {
            padding: j(3) j(10);
        }
    }

    .head {
        padding-bottom: j(15);

        &-title {
            padding-bottom: j(5);
            font-size: j(18);
        }

        &-tag {
            font-size: 10px;
            padding: j(2) j(5);
            border-radius: j(3);
            margin-right: j(5);
            text-align: center;
            color: #fff;
            background-color: #bbb;
        }

        &-date {
            @extend %tac;
            @extend %c3;
            font-size: 10px;
            padding: j(2) j(3);
            border-radius: j(3);
            margin-right: j(5);
        }
    }

    .foot {
        padding-top: j(15);
    }

    .title {
        padding-bottom: j(5);
        font-size: 18px;
    }

    .user {
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
    }
}

.list {
    height: j(240);
    overflow-y: auto;
    color: #333;

    /deep/ h2, /deep/ h3, /deep/ h4, /deep/ h5, /deep/ h6 {
        padding: j(4) 0 j(0) 0;
        font-weight: normal;
        cursor: pointer;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;

        &:hover {
            text-decoration: underline;
        }
    }

    /deep/ h3 {
        padding-left: j(5);
    }

    /deep/ h4 {
        padding-left: j(15);
    }

    /deep/ h5 {
        padding-left: j(25);
    }

    /deep/ h6 {
        padding-left: j(35);
    }
}

.list::-webkit-scrollbar {
    width: 0;
}

.markdown-body {
    background-color: transparent;
}

.paddingRight {
    padding-right: j(5);
}
</style>
