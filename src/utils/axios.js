import axios from "axios";
import {Local} from "./storage";
import NProgress from 'nprogress'

//配置进度条参数
NProgress.configure({ showSpinner: false, minimum: 0.2, easeing: 'swing', speed: 1000, trickleRate: 0.2 });

//防止多次请求进度条重复加载
let loadingNum = 0;
function startLoading() {
    if (loadingNum === 0) {
        NProgress.start()
    }
    loadingNum++;
}
function endLoading() {
    loadingNum--
    if (loadingNum <= 0) {
        NProgress.done()
    }
}

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
        startLoading()
        // 这里的config包含每次请求的内容
        config.timeout = 60 * 1000
        // console.log('request success =>', config)
        const { url, method, params,headers } = config
        if(url === '/poems/sentence') {
            const token = Local.get("SET_JINRISHICI_TOKEN")
            headers['X-User-Token']=token
        }
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
            endLoading()
            setTimeout(() => {
                console.log('response success => ', response)
                const {data: respData} = response  //解构赋值 将response中data重命名为respData
                const {data, success, msg,status} = respData //解构respData
                if (success) return resolve(data)
                if (status) return  resolve(data)
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
