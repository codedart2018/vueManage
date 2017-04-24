/**
 * Created by truncate on 2017/3/28.
 * 请求地址API
 */

const methodMap = {
    /** 登陆接口 **/
    Login: {url: '/api/login/manage_login', method: "post"},
    /** 菜单接口 **/
    MainMenu: {url: '/api/login/menu', method: "get"},
    /** 持续验证登陆 **/
    VerifyLogin: {url: '/api/login/verify_login', method: "post"},
    /** 权限节点接口 **/
    GetRule: {url: '/api/role_auth/rule', method: 'get'},
    /** 添加节点接口 **/
    AddRule: {url: '/api/role_auth/add_rule', method: "post"},
    /** 编辑节点接口 **/
    EditRule: {url: '/api/role_auth/edit_rule', method: "post"},
    /** 删除节点接口 **/
    DelRule: {url: '/api/role_auth/delete_rule', method: "post"}
}

export default methodMap
