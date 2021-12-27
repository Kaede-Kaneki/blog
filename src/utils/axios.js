import axios from "axios";
// import {Toast} from "vant";

const config = {
    timeout: 5000, // Timeout
    withCredentials: false, // Check cross-site Access-Control
};

const _axios = axios.create(config);

/**
 axios访问前的拦截，增加配置信息
 baseURL=反向代理的URL地址，配置在nginx、apache下有效,tomcat下请配置为/
 data=将json转换为字符发送
 headers = 设置HTTP头文件，其中token是登陆时从服务器获取的
 withCredentials = 提交时是否携带cookie
 */
_axios.interceptors.request.use(
    config => {
        // 这里的config包含每次请求的内容
        config.timeout = 60 * 1000
        // console.log('request success =>', config)
        const { url, method, params } = config
        console.log(`${url} [${method}] 请求参数=>`, params)
        return config
    },
    error => {
        // Do something with request error
        console.log('request error => ', error)
        return Promise.reject(error)
    }
)

/**
 axios响应时拦截处理
 */
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('response success => ', response)
                const {data: respData} = response  //解构赋值 将response中data重命名为respData
                const {data, success, msg} = respData //解构respData
                if (success) return resolve(data)
                else reject(msg || '请求报错')
                // else {
                //     Toast.fail(msg || '请求报错'),
                //         reject(msg || '请求报错')
                // }
            }, 50)
        })
    },
    function (error) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(error.response.statusText)
            }, 50)

        })
    }
)

export default (url, data = {}, method,) => {
    return _axios({
        url,
        method,
        [method === 'get' ? 'params' : 'data']: data,
    }).finally(() => {
        // toast && toast.clear()
    })
}
