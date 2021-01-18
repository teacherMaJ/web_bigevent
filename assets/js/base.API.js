//每次调用ajax请求 会先调用这个函数
$.ajaxPrefilter(function(options){
    console.log(options.url);
    //统一拼接请求的跟路径
    options.url="http://api-breakingnews-web.itheima.net"+options.url
})