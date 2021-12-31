export default {
    data() {
        return {
            item: "",
            title: "",
            GitHubUrl: "https://github.com/Kaede-Kaneki",
            BiLi: "https://space.bilibili.com/13102775",
            objImage: {
                Avatar: {
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
                    paddingRight: true
                },
                Email: {
                    value: "",
                    placeholder: "请输入邮箱",
                    is: "b-input",
                    label: "邮箱",
                    type: "text",
                    paddingRight: false
                },
            },
            objTextarea: {
                Textarea: {
                    value: "",
                    placeholder: "可以输入QQ号获取头像...",
                }
            },
            objButton: {
                Preview: {
                    label: "预览",
                    marginRight: true
                },
                Send: {
                    label: "发送"
                }
            },
            commentFrom: {
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
                        paddingRight: true
                    },
                    Email: {
                        value: "",
                        placeholder: "请输入邮箱",
                        is: "b-input",
                        label: "邮箱",
                        type: "text",
                        paddingRight: false
                    },
                },
                objTextarea: {
                    value: "",
                    placeholder: "可以输入QQ号获取头像...",
                },
                objButton: {
                    Preview: {
                        label: "预览",
                        marginRight: true
                    },
                    Send: {
                        label: "发送"
                    }
                },
            }
        }
    }
}
