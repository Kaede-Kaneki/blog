<template>
    <div class="note">
        <div class="note-content markdown markdown-body" v-highlight v-html="item.content"></div>
        <div class="note-menu" ref="menu">
            <a v-if="title">目录</a>
            <a href="javascript:" v-for="item in title" :key="item.index" v-html="item"></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "note",
    data() {
        return {
            item: '',
            title:''
        }
    },
    created() {
        this.setStorage(this.$route.query.item)
        this.updateStorage()
    },
    methods: {
        setStorage(item){
            typeof item !== 'string' && sessionStorage.setItem("article",JSON.stringify(item))
        },
        updateStorage(){
            this.item=JSON.parse(sessionStorage.getItem("article"))
            this.regTest()
        },
        regTest(){
            let reg=/^(<h[\d]\s\S*)(<\/h[\d]>)$/gmi
            this.title=this.item.content.match(reg)
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
    &-content, .markdown {
        display: flex;
        flex-direction: column;
        flex: 4;
        padding: j(20);
        border-radius: j(20);
        background-color: #fff;
    }

    &-menu {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: j(15);
        min-width: j(150);
        padding: j(10) j(15);
        border-radius: j(20);
        background-color: #fff;
        a {
            padding: j(3) j(10);
        }
    }
}
</style>
