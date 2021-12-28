<template>
    <div class="home">
        <div class="home-header">
            <h2 class="home-header-title">北野</h2>
            <span class="home-header-info">{{ poem}}</span>
            <!--      <router-link class="home-header-btn" to="#" >Get Started</router-link>-->
        </div>
<!--        <div class="home-content">-->
<!--            <div class="home-content-panel"-->
<!--                 :class="{'active':item.show}"-->
<!--                 v-for="(item,index) in homeImgList"-->
<!--                 :key="item.index"-->
<!--                 @click="handleClick(index)"-->
<!--            >-->
<!--                <img class="home-content-img" :src="item.url" :alt="item.name">-->
<!--            </div>-->
<!--        </div>-->

        <div class="home-footer">
        </div>
    </div>
</template>

<script>
import HomeMixin from './home.mixin.js'
export default {
    name: "home",
    mixins:[HomeMixin],
    data() {
        return {
            homeImgList: this.$store.state.homeImgList || false,
            show: false,
        }
    },
    created() {
        this.actionToken()
        this.actionGetPoem()
    },
    mounted() {

    },

    computed:{
    },
    methods: {
        handleClick(index) {
            this.$store.dispatch('actionsHomeImgList', index)
        },
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/define";
@import "src/assets/scss/media-screen";

.home {
    padding-left: 0 !important;
    padding-right: 0 !important;
    height: 100%;
    &-header {
        @extend %df;
        @extend %fdc;
        @extend %aic;
        @extend %jcc;
        @extend %tac;
        padding: j(60) 0;
        min-height: j(272);
        color: #fff;

        &-title {
            font-size: j(30);
            text-shadow: 0 0 j(6) #000;
            animation-name: bounceInDown;
            animation-duration: 1s;
        }

        &-info {
            padding: j(10) 0 0 0;
            font-size: j(24);
            animation-name: bounceInUp;
            animation-duration: 1s;
        }

    }

    &-content {
        @extend %df;
        flex: 0.5;
        min-height: j(300);
        padding: j(20) 0;

        &-panel {
            display: flex;
            cursor: pointer;
            padding-left: j(15);
            padding-top: j(10);
            width: j(50);
            height: j(300);
            -webkit-transition: all 700ms linear;
            transition: all 0.7s linear;

            &:first-child {
                padding-left: j(45);
            }

            &:last-child {
                padding-right: j(60);
            }

            &.active {
                flex: 5;
            }
        }

        &-img {
            width: 100%;
            border-radius: j(50);
            object-fit: cover;
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: j(550);
            &-panel {
                width: j(330);
                height: j(50);
                padding-left: 0;

                &:first-child {
                    padding-left: 0;
                }

                &:last-child {
                    padding-right: 0;
                }
            }

        }
    }

    &-footer {
        height: 40%;
    }


}
</style>
