<template>
    <div>
        <div>this is state template body</div>
        <UEditor ref="editor" @ready="editorReady" style="width: 500px;height: 440px;" :config="{hello: 1}"></UEditor>
        <button @click="setContent">追加内容</button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import UEditor from '../components/editor'
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
            return {
                msg: 'hello vue'
            }
        },
        store,
        mounted() {
            store.commit('increment', 5)
            console.log(store.state.count)
        },
        methods: {
            editorReady(instance) {
                instance.setContent('hello world');
                instance.addListener('contentChange', () => {
                    this.content = instance.getContent();
                });
            },
            setContent() {
                this.$refs.editor.setContent('这是重新设置的内容')
            }
        },
        components: {
            UEditor
        }
    }
</script>
