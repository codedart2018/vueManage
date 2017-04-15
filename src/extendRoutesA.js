/**
 * Created by truncate on 2017/4/13.
 * 扩展菜单路由方法
 */

// // 后置追加路由 注通配路由应该最后加入
// const afterRouter = [
//     {
//         path: '/login', //登录
//         meta: {
//             title: '管理登陆',
//             routeAuth: false
//         },
//         component:  resolve => require(['./components/Manage/Login.vue'], resolve),
//         hidden: true
//     },
//     {
//         path: '*', //其他页面，强制跳转到登录页面
//         meta: {
//             title: '抱歉未找到该页面',
//             routeAuth: false
//         },
//         //redirect: '/login'
//         component:  resolve => require(['./components/Manage.vue'], resolve),
//         hidden: true
//     }
// ]
//
// //动态循环菜单
// function eachMenu(menu = [], routes = []) {
//     if(menu.length <= 0) return []
//     for (let i = 0, l = menu.length; i < l; i++) {
//         let item = menu[i]
//         if (item.path && item.component) {
//             let arr = {
//                 id: item.id,
//                 icon: item.icon,
//                 name: item.name,
//                 parent: item.parent,
//                 path: item.path,
//                 url: item.url,
//                 component: resolve => require([`${item.component}`], resolve)
//             };
//             if(item.children.length != 0) {
//                 arr.children = eachMenu(item.children)
//             }
//             routes.push(arr)
//         }
//     }
//     return routes
// }
//
// export function extendRoutes(menu = [], routes = []) {
//     routes = eachMenu(menu).concat(afterRouter)
//     return routes
// }
