    // 主要是对 wx.request 方法进行封装
    function request(url,method="GET",data={}){
        return new Promise((resolve,reject)=>{
            wx.request({
                url,
                method,
                data,
                success:(res)=>{
                    resolve(res)
                }
            })
        })
    }
    // 有证书，但是经常容易挂
    // request.baseURL = "https://www.zhengzhicheng.cn/api/public/v1/"
    // 证书过期，但是取消域名校验，还可以使用
    // request.baseURL = "https://itjustfun.cn/api/public/v1/"
    request.baseURL = "https://autumnfish.cn/wx/api/public/v1/";
    request.get = function (url, data){
        return request(request.baseURL + url, "GET", data)
    }
export default request
