/**
 * Created by truncate on 2017/4/12.
 */

const state = {}

const mutations = {
    state: JSON.parse(window.localStorage.getItem('mainMenu')) || {},
    //加载所有菜单
    mainMenu (state, menu) {
        window.localStorage.setItem('mainMenu', JSON.stringify(menu))
        Object.assign(state, menu)
    },
    //添加菜单
    addMainMenu (state, { menu }) {

    },
    delMainMenu (state) {
        window.localStorage.removeItem('mainMenu')
        Object.assign(state, {})
    }
}

export default {
    state,
    mutations
}
