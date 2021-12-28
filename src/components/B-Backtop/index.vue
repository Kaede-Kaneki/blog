<template>
    <transition name="b-fade-in">
        <div v-if="visible" class="back-top"  ref="backTop" @click.stop="handleClick">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5 ? cubic(value * 2) / 2: 1 - cubic((1 - value) * 2) / 2;
export default {
    name: "BBackTop",
    props:{
        visibilityHeight: {
            type: Number,
            default: 200
        },
        right: {
            type: Number,
            default: 40
        },
        bottom: {
            type: Number,
            default: 40
        }
    },
    data() {
        return {
            el: null,
            container: null,
            visible: false
        }
    },
    mounted() {
        this.init()
        this.container.addEventListener('scroll',this.handleScroll)
    },
    methods: {
        init() {
            this.container = document;
            this.el = document.documentElement;
        },
        onScroll() {
            const scrollTop = this.el.scrollTop;
            this.visible = scrollTop >= this.visibilityHeight;
        },
        handleScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop=scrollTop
            scrollTop > 150 ? this.visible=true:this.visible=false
        },
        handleClick(e){
            this.scrollToTop()
            this.$emit('click',e)
        },
        scrollToTop(){
            const el = this.el;
            const beginTime = Date.now();
            const beginValue = el.scrollTop;
            const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
            const frameFunc = () => {
                const progress = (Date.now() - beginTime) / 500;
                if (progress < 1) {
                    el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
                    rAF(frameFunc);
                } else {
                    el.scrollTop = 0;
                }
            };
            rAF(frameFunc);
        }
    },
    beforeDestroy() {
        this.container.removeEventListener('scroll',this.handleScroll())
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
.b-fade-in-enter-active,
.b-fade-in-leave-active {
    transition: all .3s cubic-bezier(.55,0,.1,1);
}
.b-fade-in-enter,
.b-fade-in-leave-active {
    opacity: 0;
}
.back-top{
    @extend %bfb20;
    position: fixed;
    right: j(70);
    bottom: j(40);
    display: flex;
    justify-content: center;
    align-items: center;
    width: j(25);
    height: j(25);
    border-radius: j(5);
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    background-color: $transparent-white;
    z-index: 9999;
    cursor: pointer;
    &:hover {
        background-color: $transparent-white-hover;
    }
}
</style>
