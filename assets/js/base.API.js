//每次调用ajax请求 会先调用这个函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    //统一拼接请求的跟路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
    //统一设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //无论成功还是失败，都会调用complete函数
    options.complete = function (res) {
        //在complete 回调函数中可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //1.强制清空token
            localStorage.removeItem("token")
            //2.强制跳转到 登录页面
            location.href = "/login.html"
        }
    }

})