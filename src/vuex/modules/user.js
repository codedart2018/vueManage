/**
 * Created by truncate on 2017/3/27.
 */
const state = {
    user_info: JSON.parse(window.localStorage.getItem('user_info')) || {},
    token: window.localStorage.getItem('token') || ''
}

const mutations = {
    //登陆
    userLogin (state, {user_info, token}) {
        window.localStorage.setItem('user_info', JSON.stringify(user_info))
        window.localStorage.setItem('token', token)
        Object.assign(state.user_info, user_info)
        //TODO 有问题
        //Object.assign(state.token, token)
    },
    //退出
    userOut (state) {
        window.localStorage.removeItem('user_info')
        window.localStorage.removeItem('token')
        Object.assign(state.user_info, {})
        Object.assign(state.token, '')
    }
}

export default {
    state,
    mutations
}
