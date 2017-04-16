import Vue from 'vue'
import Router from 'vue-router'

import Manage from './components/Manage'  //管理页
import Login from '@/components/Manage/Login'  //登陆页
import NotFound from '@/components/Common/404'  //404 未找到页面
import Validate from './test/validate.vue' //验证测试页面
import Hello from '@/components/Hello'
import Iview from '@/components/Iview'

Vue.use(Router)

//获取token
let token = window.localStorage.getItem('token')
if(token) {
    //取出菜单
    let mainMenu = window.localStorage.getItem('mainMenu')
    var Menu = mainMenu ? typeof (JSON.parse(mainMenu) == "object") ? JSON.parse(mainMenu) : [] : []
} else {
    var Menu = []
}

// 后置追加路由 注通配路由应该最后加入
const afterRouter = [
    {
        path: '*', //其他页面，强制跳转到登录页面
        meta: {
            title: '抱歉未找到该页面',
            routeAuth: false
        },
        //redirect: '/login'
        component: NotFound,
        hidden: true
    }
]

// 默认路由 带后台取出的路由
const router =[
    {
        path: '/',
        meta: {
            title: '首页',
            routeAuth: false
        },
        name: 'Hello',
        component: Hello,
        hidden: true
    },
    {
        path: '/login', //登录
        meta: {
            title: '管理登陆',
            routeAuth: false
        },
        component: Login,
        hidden: true
    },
    {
        path: '/manage/',
        component: Manage,
        name: '角色权限',
        icon: 'fa fa-id-card-o',
        meta: {
            title: '管理中心'
        },
        children: [
            { path: 'iview', component: Iview, name: '角色管理' },
            { path: 'validate', component: Validate, name: '权限管理' }
        ]
    },
    ...sessionRoutes(Menu)
]

//导出路由
export default new Router({
    path: '/',
    mode: 'history',
    //这里从后台取出路由来
    routes: router.concat(afterRouter)
})

//动态循环菜单
function eachMenu(menu = [], routes = []) {
    //todo 判断原路由里有通配路由没，如果有T除掉
    if(menu.length <= 0) return routes
    for (let i = 0, l = menu.length; i < l; i++) {
        let item = menu[i]
        if (item.path && item.component) {
            let arr = {
                id: item.id,
                icon: item.icon,
                name: item.name,
                parent: item.parent,
                path: item.path,
                url: item.url,
                component: resolve => require([`${item.component}`], resolve)
            };
            if(item.children.length != 0) {
                arr.children = eachMenu(item.children)
            }
            routes.push(arr)
        }
    }
    return routes
}

export function sessionRoutes(menu = [], routes = []) {
    routes = eachMenu(menu)
    return routes
}
