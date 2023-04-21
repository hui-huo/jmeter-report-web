import {notification} from 'antd';
import {extend} from 'umi-request';


/** 异常处理 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: any) => {
  const {response} = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const {status, url} = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '网络异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

//对 extend 实例进行简单的封装
const request = extend({
  // prefix: 'http://localhost:8000',  // 统一的请求前缀
  timeout: 3000,                    // 超时时间
  // headers: {                        // headers中搭载token等请求头信息
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
  //处理请求错误
  errorHandler: errorHandler,
});


// 对实例request进行请求拦截
// 可以在里面对url、option中的参数进行进一步处理
request.interceptors.request.use((url, options) => {
  return {
    options: {
      ...options,
      interceptors: true,
    },
  };
});

// 对实例request进行响应拦截, 统一处理接口错误信息
// request.interceptors.response.use(async (response) => {
//   console.log(response)
//   if (response.status !== 200) {
//   }
//   return response;
// });

export default request
