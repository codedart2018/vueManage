/**
 * Created by truncate on 2017/4/12.
 * todo 2.4 版本前 addRouter 有问题 详见README.md 说明 目前退出没有把动态加入路由给删除掉
 */
import Vue from 'vue'
import Router from 'vue-router'

import Manage from './components/Manage'  //管理页
import Login from '@/components/Manage/Login'  //登陆页
import NotFound from '@/components/Common/404'  //404 未找到页面
import Validate from './test/validate.vue' //验证测试页面
import Hello from '@/components/Hello'
import Iview from '@/components/Iview'

Vue.use(Router)

/**
 * 获取token
 */
let token = window.localStorage.getItem('token')
if(token) {
    //取出菜单
    let mainMenu = window.localStorage.getItem('mainMenu')
    var Menu = mainMenu ? typeof (JSON.parse(mainMenu) == "object") ? JSON.parse(mainMenu) : [] : []
} else {
    var Menu = []
}

/**
 * 后置追加路由 注通配路由应该最后加入
 * @type {[*]}
 */
const afterRouter = [
    {
        path: '*', //其他页面，强制跳转到登录页面
        name: '通配路由',
        meta: {
            title: '抱歉未找到该页面',
            routeAuth: false
        },
        //redirect: '/login'
        component: NotFound,
        display: 0
    }
]

/**
 * 默认路由 带后台取出的路由
 * 后端取出来必须要有name 不然编程式导航会找不到路径 默认路由里不会存在id的 只有后台取出的路由才会带有ID ID还有个方法过虑追加路由使用，本身比对字符串不知道为什么有问题，导致过滤不了
 * @type {[*]}
 */
const router =[
    {
        path: '/',
        meta: {
            title: '首页',
            routeAuth: false
        },
        name: 'Hello',
        component: Hello,
        display: 0
    },
    {
        path: '/login', //登录
        name: 'login',
        meta: {
            title: '管理登陆',
            routeAuth: false
        },
        component: Login,
        display: 0
    },
    //以下我测试用的路由
    // {
    //     path: '/manage/',
    //     component: Manage,
    //     name: '角色权限',
    //     icon: 'fa fa-id-card-o',
    //     meta: {
    //         title: '管理中心'
    //     },
    //     display: 0,
    //     children: [
    //         { path: 'iview', component: Iview, name: '角色管理', display: 1 },
    //         { path: 'validate', component: Validate, name: '权限管理', display: 1 }
    //     ]
    // },
    {
        path: '/state/:id?',
        component: resolve => require(['./test/store.vue'], resolve),
        name: '你好',
        meta: {
            title: 'state',
            routeAuth: false
        },
        display: 0
    },
    ...sessionRouters(Menu)
]

/**
 * 导出路由
 */
export default new Router({
    path: '/',
    mode: 'history',
    //这里从后台取出路由来
    routes: router.concat(afterRouter)
})

/**
 * 动态循环菜单
 * @param menu 菜单
 * @param routes 路由
 * @returns {Array}
 */
function eachMenu(menu = [], routes = []) {
    if(menu.length <= 0) return routes
    for (let item of menu){
        if(item.path && item.component) {
            let arr = {
                id: item.id,
                icon: item.icon,
                name: item.name,
                parent: item.parent,
                path: `${item.path}`,
                url: item.url,
                display: item.display,
                component: resolve => require([`${item.component}`], resolve)
            };

            //参数处理
            if(item.params) {
                let last_str = item.path.charAt(item.path.length - 1);
                let tmp_str = ''
                for(let p of item.params.split(",")) {
                    tmp_str += "/:" + p + "?"
                }
                if(last_str == "/") {
                    arr.path = arr.path + tmp_str.substr(1)
                } else {
                    arr.path = arr.path + tmp_str
                }
            }

            //递归子菜单
            if(item.children && item.children.length != 0) {
                arr.children = eachMenu(item.children)
            }
            routes.push(arr)
        }
    }
    // for (let i = 0, l = menu.length; i < l; i++) {
    //     let item = menu[i]
    //     if (item.path && item.component) {
    //         let arr = {
    //             id: item.id,
    //             icon: item.icon,
    //             name: item.name,
    //             parent: item.parent,
    //             path: item.path,
    //             url: item.url,
    //             component: resolve => require([`${item.component}`], resolve)
    //         };
    //         if(item.children.length != 0) {
    //             arr.children = eachMenu(item.children)
    //         }
    //         routes.push(arr)
    //     }
    // }
    return routes
}

/**
 * 导出循环处理结果
 * @param menu 菜单
 * @param routes 路由
 * @returns {Array}
 */
export function sessionRouters(menu = [], routes = []) {
    routes = eachMenu(menu)
    return routes
}

/**
 * 导出过滤路由结果
 * @param old 原路由
 * @param routes 要过滤的路由
 */
export function filterRouters(old = [], routes = []) {
    if(old.length == 0 || routes.length == 0) return []
    var new_routes = []
    //for (let [index, route] of new Map(old.map((item, i) => [i, item]))) {}
    for (let route of old){
        for(let tmp of routes) {
            if(!route.id && route.id != tmp.id) {
                new_routes.push(route)
                break
            }
        }
    }
    return new_routes
}
