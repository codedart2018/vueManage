/**
 * Created by truncate on 2017/3/27.
 * 吐司自定义插件
 */

class IvToast {

}

IvToast.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 逻辑...
    }
    // 2. 添加全局资源
    Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
            // 逻辑...
        }
    })
    // 3. 注入组件
    Vue.mixin({
        created: function () {
            // 逻辑...
        }
    })
    // 4. 添加实例方法
    Vue.prototype.toastInfo = function (message, options) {
        if(options !== null && typeof options === 'object') {
            this.$Message.config({
                top: options.top ? options.top : 80,
                duration: options.duration ? options.duration : 3
            })
        }
        this.$Message.info(message ? message : '温馨提示')
    }

    Vue.prototype.toastError = function (message, options) {
        if(options !== null && typeof options === 'object') {
            this.$Message.config({
                top: options.top ? options.top : 80,
                duration: options.duration ? options.duration : 3
            })
        }
        this.$Message.error(message ? message : '错误警告')
    }

    Vue.prototype.toastSuccess = function (message, options) {
        if(options !== null && typeof options === 'object') {
            this.$Message.config({
                top: options.top ? options.top : 80,
                duration: options.duration ? options.duration : 3
            })
        }
        this.$Message.success(message ? message : '成功提示')
    }

    Vue.prototype.toastWarning = function (message, options) {
        if(options !== null && typeof options === 'object') {
            this.$Message.config({
                top: options.top ? options.top : 80,
                duration: options.duration ? options.duration : 3
            })
        }
        this.$Message.warning(message ? message : '警告')
    }

    Vue.prototype.toastLoading = function (message, options) {
        if(options !== null && typeof options === 'object') {
            this.$Message.config({
                top: options.top ? options.top : 80,
                duration: options.duration ? options.duration : 3
            })
        }
        this.$Message.loading(message ? message : '加载中...')
    }

}

export default IvToast

