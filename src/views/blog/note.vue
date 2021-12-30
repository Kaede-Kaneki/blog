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
                <div class="user">
                    <b-image :src="objImage.Avatar.src" :alt="objImage.Avatar.alt"></b-image>
                    <div class="user-desc">
                        <div class="user-input">
                            <component v-for="item in objInput"
                                       :key="item.index"
                                       :is="item.is"
                                       :label="item.label"
                                       :type="item.type"
                                       :src="item.src"
                                       :alt="item.alt"
                                       v-model.trim="item.value"
                                       :placeholder="item.placeholder"
                                       :class="{'paddingRight':item.paddingRight}"
                                       @blur="handleBlur(item)"
                            ></component>
                        </div>
                        <b-textarea v-model="objTextarea.Textarea.value" :placeholder="objTextarea.Textarea.placeholder" @blur="handleBlur(objTextarea.Textarea)"></b-textarea>
                    </div>
                </div>
                <div class="comment">暂时没有评论</div>
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
import BCard from 'src/components/B-Card'
import BInput from 'src/components/B-Input'
import BImage from 'src/components/B-Image/index'
import BTextarea from 'src/components/B-Textarea/index'

export default {
    name: "note",
    components: {
        BCard,
        BInput,
        BImage,
        BTextarea
    },
    data() {
        return {
            item: "",
            title: "",
            GitHubUrl: "https://github.com/Kaede-Kaneki",
            BiLi: "https://space.bilibili.com/13102775",
            objImage:{
                Avatar:{
                    src: "",
                    alt: "",
                    is: "b-image",
                }
            },
            objInput: {
                QQ: {
                    value: "",
                    placeholder: "请输入QQ号",
                    is: "b-input",
                    label: "昵称",
                    type: "text",
                    paddingRight:true
                },
                Email: {
                    value: "",
                    placeholder: "请输入邮箱",
                    is: "b-input",
                    label: "邮箱",
                    type: "text",
                    paddingRight:false
                },
            },
            objTextarea:{
                Textarea:{
                    value:"",
                    placeholder:"可以输入QQ号获取昵称和头像...",
                }
            }
        }
    },
    created() {
        this.setStorage(this.$route.query.item)
        this.updateStorage()
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
            this.item.content = this.item.content.replace(/<h1[^>]*>(.*?)<\/h1>/g, " ")
        },
        formatTimeToStr(date, fmt) {
            return commonObj.formatTimeToStr(new Date(date), fmt)
        },
        handleBlur(item) {
            if (!item.value) return false
            else {
                console.log('blur =>', item.value)
            }
        },

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

    .title {
        padding-bottom: j(5);
        font-size: 18px;
    }

    .foot {
    }

    .user {
        @extend %df;
        @extend %df1;
        //@extend %w100;
        padding: j(10) 0;

        &-desc {
            //@extend %df;
            @extend %df1;
            padding-left: j(5);
            //@extend %df;
            //@extend %df1;
            //@extend %fww;
        }
        &-input{
            @extend %df;
            @extend %fww;
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

.paddingRight{
    padding-right: j(5);
}
</style>
