function request(url,method="GET"){
    return new Promise((resolve,reject)=>{
        wx.request({
            url,
            method,
            success:(res)=>{
                resolve(res)
            }
        })
    })
}
export default request
