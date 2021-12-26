import Vue from "vue";

Vue.mixin({
    methods: {
        skip(url) {
            window.open(url)
        },
    },
})

