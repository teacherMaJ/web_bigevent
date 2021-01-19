$(function(){
    //调用函数，获取用户基本信息
    getUserInfo()
    var layer = layui.layer

    $("#btnLogout").on("click",function(){
        //提示用户是否确认退出
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清空token
            localStorage.removeItem("token")
            //2.跳转到登录页面
            location.href="/login.html"
            //关闭弹出层
            layer.close(index);
          });
    })
})
//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        //请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem("token") || ""
        // },
        success:function(res){
           if(res.status !== 0){
               console.log(res);
               return layui.layer.msg("获取用户信息失败")
           }
           //调用 renderAvatar渲染用户头像
           renderAvatar(res.data)
       
        },
        //  //无论成功还是失败，都会调用complete函数
        //  complete:function(res){
        //     //在complete 回调函数中可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！")
        //     {
        //         //1.强制清空token
        //         localStorage.removeItem("token")
        //         //2.强制跳转到 登录页面
        //         location.href="/login.html"
        //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user){
    //1.获取用户名称
    var name = user.nickname || user.username
    //2.渲染名称
    $("#welcome").html("欢迎&nbsp&nbsp"+name)
    //3.渲染头像
    if(user.user_pic !== null){
        //3.1渲染图片头像
        $(".layui-nav-img").attr('src',user.user_pic).show()
        $(".text-avatar").hide()
    }else{
        //3.2渲染文本头像
        $(".layui-nav-img").hide()
        //3.2.1渲染 名字的第一个字
        var first = name[0].toUpperCase()
        //给文本头像设置元素
        $(".text-avatar").html(first).show()



    }
}