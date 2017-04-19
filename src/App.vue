<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {filterRouters} from './router'

    export default {
        name: 'app',
        mounted() {
            if (this.$store.state.User.token) {
                this.verify_login()
            }
        },
        methods: {
            ...mapActions(['delMainMenu', 'userOut']),
            verify_login() {
                let token = this.$store.state.User.token
                let uid = this.$store.state.User.user_info.uid
                this.request('VerifyLogin', {uid: uid, token: token}).then((res) => {
                    if (!res.status) {
                        let menu = this.$store.state.MainMenu.mainMenu
                        let new_router = filterRouters(this.$router.options.routes, menu)
                        this.$router.options.routes = new_router
                        //删除登陆的一切信息
                        this.delMainMenu(this)
                        this.userOut(this)
                        this.$router.push({path: '/login'})
                        this.$Message.error(res.msg)
                    }
                })
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.path == '/login') {

                }
            }
        },
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

