<style src="../assets/style/common/base.less" lang="less" scoped></style>
<style src="../assets/style/manage/index.less" lang="less" scoped></style>
<template>
    <div class="container">
        <row class="nav-bar">
            <Col span="2" class="logo">
            <Icon type="home"/>
            </Col>
            <Col span="22">
            <Col span="12">
            <ul class="bar-ul">
                <li class="li-border">
                    <Icon type="laptop"></Icon>
                    <router-link to="/manage/" class="menu-a">管理控制台</router-link>
                </li>
            </ul>
            </Col>
            <Col span="12">
            <ul class="bar-ul pull-right">
                <li class="li-border">
                    <Icon type="ios-bell" class="bell"></Icon>
                    <span class="bell-num">0</span>
                </li>
                <li class="li-border">
                    <Dropdown placement="bottom-end" @on-click="topRightDropDown">
                        <a href="javascript:void(0)" style="color: #FFFFFF;">
                            Administrator
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item name="edit_user">资料修改</Dropdown-item>
                            <Dropdown-item name="platform">平台切换</Dropdown-item>
                            <Dropdown-item divided name="out">退出登陆</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </li>
                <li class="li-border">帮助文档</li>
                <li class="li-border user">
                    <div class="avatar" style="background-image: url('https://avatars.githubusercontent.com/u/12706830?v=3')"></div>
                    <Dropdown placement="bottom-end" @on-click="topRightDropDown">
                        <a href="javascript:void(0)" style="color: #FFFFFF;">
                            {{user.user_name}}
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item name="edit_user">资料修改</Dropdown-item>
                            <Dropdown-item name="platform">平台切换</Dropdown-item>
                            <Dropdown-item divided name="out">退出登陆</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </li>
                <li></li>
            </ul>
            </Col>
            </Col>
        </row>

        <div class="main">
            <aside>
                <div class="sidebar-fold">
                    <Icon type="android-menu"></Icon>
                </div>
                <Menu width="auto" theme="dark" accordion :open-names="openNames">
                    <li class="ivu-menu-submenu">
                        <div class="ivu-menu-submenu-title" @click="returnMain">
                            <i class="ivu-icon ivu-icon-ios-home"></i>
                            <router-link to="/manage/" class="menu-a">管理首页</router-link>
                        </div>
                    </li>

                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <Submenu :name="index">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                {{item.name}}
                            </template>
                            <Menu-item v-bind:name="index+9999+key" v-for="(child, key) in item.children"
                                       v-if="!child.hidden" class="menu-li">
                                <router-link :to="child.path" class="li-a">{{child.name}}</router-link>
                            </Menu-item>
                        </Submenu>
                    </template>
                </Menu>

            </aside>

            <section class="content-container">
                <span v-if="$route.path == /manage/">
                    <common-main></common-main>
                </span>
                <transition :name="transitionName" v-if="$route.path != /manage/">
                    <router-view></router-view>
                </transition>
            </section>
        </div>
    </div>
</template>

<script>
    //引入公共 main
    import commonMain from "./Common/Main.vue"
    import Http from '../libs/http'
    import {mapActions, mapGetters} from 'vuex'
    import {filterRouters} from '../router'

    export default {
        beforeCreate: function () {

        },
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                openNames: ["1"],
                transitionName: 'slide-left',
                user: {}
            }
        },
        beforeMount() {

        },
        mounted() {
            this.user = this.$store.state.User.user_info
        },
        methods: {
            ...mapActions(['delMainMenu', 'userOut']),
            returnMain() {
                this.openNames = ["0"]
            },
            topRightDropDown(name) {
                if (name == 'out') {
                    let menu = this.$store.state.MainMenu.mainMenu
                    let new_router = filterRouters(this.$router.options.routes, menu)
                    this.$router.options.routes = new_router
                    //删除登陆的一切信息
                    this.delMainMenu(this)
                    this.userOut(this)
                    this.$router.push({path: '/login'})
                    this.$Message.success("退出成功")
                }
            }
        },
        components: {
            commonMain
        },
        // watch $route 决定使用哪种过渡
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        mixins: [Http],
    }
</script>
