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
        apiPost(url, data) {
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
        },
        apiGet(url, data) {
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
        },
    },
    computed: {

    }
}

export default apiHttp

