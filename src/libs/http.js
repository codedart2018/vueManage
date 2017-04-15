/**
 * Created by truncate on 2017/3/28.
 */

import AxiosInst from './axios'
import methodMap from './methodMap'

const apiHttp = {
    methods: {
        request(method, opts) {
            let m = methodMap[method]
            if (m) {
                var opts_type = typeof(opts);
                if (opts_type == null || opts_type != 'object') {
                    opts = {}
                }
                if(m.method == 'get') {
                    return this.apiGet(m.url, opts)
                } else if(m.method == 'post') {
                    return this.apiPost(m.url, opts)
                } else {
                    return "非法请求";
                }

            } else {
                console.log("url 错误", "返回结果：err = ", "无法请求，无效的请求！", "\n");
            }
        },
        handelResponse(res, cb, errCb) {
            if (res.code == 200) {
                cb(res.data)
            } else {
                if (typeof errCb == 'function') {
                    errCb()
                }
                this.handleError(res)
            }
        },
        apiPost(url, data) {
            return new Promise((resolve, reject) => {
                AxiosInst.post(url, data).then((response) => {
                    resolve(response.data)
                }).catch((response) => {
                    console.log('Customize Notice', response)
                    reject(response)
                })
            })
        },
        apiGet(url, data) {
            return new Promise((resolve, reject) => {
                AxiosInst.get(url, {
                    params: data
                }).then((response) => {
                    resolve(response.data)
                }).catch((response) => {
                    console.log('Customize Notice', response)
                    reject(response)
                })
            })
        },
    },
    computed: {

    }
}

export default apiHttp

