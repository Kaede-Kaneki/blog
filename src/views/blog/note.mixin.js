export default {
    data() {
        return {
            item: "",
            title: "",
            GitHubUrl: "https://github.com/Kaede-Kaneki",
            BiLi: "https://space.bilibili.com/13102775",
            commentForm: {
                isReply:false,
                objImage: {
                    src: require("src/assets/image/Avatar.png"),
                    alt: "",
                    is: "b-image",
                },
                objInput: {
                    QQ: {
                        value: "",
                        placeholder: "请输入QQ号",
                        is: "b-input",
                        label: "昵称",
                        type: "text",
                        paddingRight: true,
                        isRequire:true,
                    },
                    Email: {
                        value: "",
                        placeholder: "请输入邮箱",
                        is: "b-input",
                        label: "邮箱",
                        type: "text",
                        paddingRight: false,
                        isRequire:true,
                    },
                },
                objTextarea: {
                    value: "",
                    placeholder: "可以输入QQ号获取头像...",
                    isRequire:true,
                },
                objButton: {
                    // Preview: {
                    //     label: "预览",
                    //     marginRight: true
                    // },
                    Send: {
                        label: "发送"
                    }
                },
            },
            replyForm: {
                isReply:true,
                objImage: {
                    src: require("src/assets/image/Avatar.png"),
                    alt: "",
                    is: "b-image",
                },
                objInput: {
                    QQ: {
                        value: "",
                        placeholder: "请输入QQ号",
                        is: "b-input",
                        label: "昵称",
                        type: "text",
                        paddingRight: true,
                        isRequire:true,
                    },
                    Email: {
                        value: "",
                        placeholder: "请输入邮箱",
                        is: "b-input",
                        label: "邮箱",
                        type: "text",
                        paddingRight: false,
                        isRequire:true,
                    },
                },
                objTextarea: {
                    value: "",
                    placeholder: "可以输入QQ号获取头像...",
                    isRequire:true,
                },
                objButton: {
                    // Preview: {
                    //     label: "预览",
                    //     marginRight: true
                    // },
                    Send: {
                        label: "发送"
                    }
                },
            },
            commentArr:[],
            isReplyShow:"",
        }
    }
}
