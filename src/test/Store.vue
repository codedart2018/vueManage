<template>
    <div>
        <div>this is template body</div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)
    const store = new Vuex.Store({
        state: {
            count: 0
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
            return{
                msg:'hello vue'
            }
        },
        store,
        mounted() {
            store.commit('increment', 5)
            console.log(store.state.count)
        }
    }
</script>
