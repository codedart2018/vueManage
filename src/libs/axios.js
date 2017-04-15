/**
 * Created by truncate on 2017/4/10.
 */

import axios from 'axios'
import Qs from 'qs'
import Api from './api'

const AxiosInst = axios.create({
    baseURL: Api.domain,
    timeout: 1000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    transformRequest: [function (data) {
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        data = Qs.stringify(data);
        return data;
    }],
    //返回数据类型
    responseType: 'json'
});

export default AxiosInst
