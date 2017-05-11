<template>
    <div>

    </div>

</template>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)

    const store = new Vuex.Store({
        state: {
            count: 0,
            list: []
        },
        mutations: {
            increment (state, value) {
                console.log(value, 2)
                state.count++ + value
            }
        }
    })

    export default{
        data(){
            return {
                msg: 'hello vue',
            }
        },
        store,
        methods: {

        },
        components: {

        },
        watch: {
            '$route' (to, from) {

            }
        },
        mounted() {
            store.commit('increment', 5)
            //console.log(store.state.count)
        }
    }
</script>
