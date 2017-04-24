/**
 * Created by truncate on 2017/3/28.
 * 请求地址API
 */

const methodMap = {
    Login: {url: '/api/login/manage_login', method: "post"},
    MainMenu: {url: '/api/login/menu', method: "get"},
    VerifyLogin: {url: '/api/login/verify_login', method: "post"},
    GetRule: {url: '/api/role_auth/rule', method: 'get'},
    AddRule: {url: '/api/role_auth/add_rule', method: "post"},
    DelRule: {url: '/api/role_auth/delete_rule', method: "post"}
}

export default methodMap
