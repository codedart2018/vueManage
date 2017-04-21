/**
 * Created by truncate on 2017/4/19.
 * 网络请求插件
 */

import methodMap from './methodMap'
import AxiosInst from './axios'

class Http {

}

Http.install = function (Vue) {

    Vue.prototype.request = function (method, opts) {
        let m = methodMap[method]
        if (m) {
            var opts_type = typeof(opts);
            if (opts_type == null || opts_type != 'object') {
                opts = {}
            }
            if(m.method == 'get') {
                return Vue.prototype.apiGet(m.url, opts)
            } else if(m.method == 'post') {
                return Vue.prototype.apiPost(m.url, opts)
            } else {
                return "非法请求";
            }

        } else {
            console.log("url 错误", "返回结果：err = ", "无法请求，无效的请求！", "\n");
        }
    }

    Vue.prototype.apiPost = function(url, data) {
        return new Promise((resolve, reject) => {
            AxiosInst.post(url, data).then((response) => {
                if(response.data == null) {
                    console.log("接口输出异常...")
                    this.$Message.error("接口输出异常...")
                    return
                }
                resolve(response.data)
            }).catch((response) => {
                console.log('Customize Notice', response)
                reject(response)
            })
        })
    }

    Vue.prototype.apiGet = function(url, data) {
        return new Promise((resolve, reject) => {
            AxiosInst.get(url, {
                params: data
            }).then((response) => {
                if(response.data == null) {
                    console.log("接口输出异常...")
                    this.$Message.error("接口输出异常...")
                    return
                }
                resolve(response.data)
            }).catch((response) => {
                console.log('Customize Notice', response)
                reject(response)
            })
        })
    }

}

export default Http
