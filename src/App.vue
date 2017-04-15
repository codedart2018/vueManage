<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import Http from './libs/http'
    import {mapMutations} from 'vuex'

    export default {
        name: 'app',
        mounted() {
            if (this.$store.state.User.token) {
                this.verify_login()
            }
        },
        methods: {
            ...mapMutations(['delMainMenu', 'userOut']),
            verify_login() {
                let token = this.$store.state.User.token
                let uid = this.$store.state.User.user_info.uid
                this.request('VerifyLogin', {uid: uid, token: token}).then((res) => {
                    if (!res.status) {
                        //删除登陆的一切信息
                        this.delMainMenu()
                        this.userOut()
                        this.$router.push({path: '/login'})
                        this.$Message.error(res.msg)
                    }
                })
            }
        },
        mixins: [Http]
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    body, html {
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.96);
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        bottom: 0px;
    }
</style>

