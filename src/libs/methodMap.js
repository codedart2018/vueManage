/**
 * Created by truncate on 2017/3/28.
 * 请求地址API
 */

const methodMap = {
    /** 登陆接口 **/
    Login: {url: '/api/login/manage_login', method: "post"},
    /** 退出接口 **/
    LoginOut: {url: '/api/login/out', method: "post"},
    /** 持续验证登陆 **/
    VerifyLogin: {url: '/api/login/verify_login', method: "post"},
    /** 权限节点接口 **/
    GetRule: {url: '/api/role_auth/rule', method: 'get'},
    /** 添加节点接口 **/
    AddRule: {url: '/api/role_auth/add_rule', method: "post"},
    /** 编辑节点接口 **/
    EditRule: {url: '/api/role_auth/edit_rule', method: "post"},
    /** 删除节点接口 **/
    DelRule: {url: '/api/role_auth/delete_rule', method: "post"},
    /** 角色列表 **/
    GetRole: {url: '/api/role_auth/role', method: "get"},
    /** 添加角色 **/
    AddRole: {url: '/api/role_auth/add_role', method: "post"},
    /** 编辑角色 **/
    EditRole: {url: '/api/role_auth/edit_role', method: "post"},
    /** 删除角色 **/
    DelRole: {url: '/api/role_auth/delete_role', method: "post"},
    /** 角色授权列表 **/
    Authorize: {url: '/api/role_auth/authorize', method: "get"},
    /** 保存角色授权 **/
    SaveAuth: {url: '/api/role_auth/save_authorize', method: "post"},
    /** 后台用户列表 **/
    User: {url: '/api/user/index', method: "get"},
    /** 添加后台用户 **/
    AddUser: {url: '/api/user/add', method: "post"},
    /** 编辑后台用户 **/
    EditUser: {url: '/api/user/edit', method: "post"},
    /** 重置后台用户密码 **/
    RestPassword: {url: '/api/user/rest_password', method: "post"},
    /** 商户列表 **/
    Merchant: {url: '/api/merchant/index', method: "get"},
    /** 添加商户 **/
    AddMerchant: {url: '/api/merchant/add', method: "post"},
}

export default methodMap
