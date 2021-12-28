import {mapActions, mapState} from "vuex";

export default {
    computed:{
        ...mapState(
            'dailyPoem',['poem']
        )
    },
    methods: {
        ...mapActions(
            'dailyPoem',['actionToken','actionGetPoem']
        ),
    }
}
