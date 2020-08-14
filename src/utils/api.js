import axios from 'axios';      /*封装网络请求*/
import {Message} from 'element-ui';
import router from '../router';

axios.interceptors.response.use(success => {
    if (success.status && success.status === 200 && success.data.status === 500) {
        Message.error({message: success.data.msg});
        return;
    }
    if (success.data.msg) {  // 如果返回的数据存在msg字段,那么说明请求成功
        Message.success({message: success.data.msg})
    }
    return success.data;

}, error => {
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: "服务器被吃了!"});
    } else if (error.response.status === 403) {
        Message.error({message: "权限不足!"});
    } else if (error.response.status === 401) {
        Message.error({message: "尚未登陆!"});
        router.replace('/')
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg});
        } else {
            Message.error("未知错误!");
        }
    }
});

// 便于以后添加前缀
let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        // 对数据进行处理，处理完成为  username=admin&password=123 形式
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            return ret;
        }],
        header: {
            'Content-Type:': 'application/x-www-form-urlencoded'
        }
    });
};


export const postRequest = (url, data) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: data
    })
};

export const putRequest = (url, data) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: data
    })
};


export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
};

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params
    })
};