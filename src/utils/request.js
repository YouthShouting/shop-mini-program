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

    request.baseURL = "https://www.zhengzhicheng.cn/api/public/v1/"
    request.get = function (url, data){
        return request(request.baseURL + url, "GET", data)
    }
export default request
