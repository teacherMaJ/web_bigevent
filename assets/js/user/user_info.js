$(function(){
    var layer = layui.layer
    var form = layui.form
    initUserInfo()
    var form = layui.form
    form.verify({
        nickname:function(value){
            if(value.length >6){
                return "昵称必须在1-6个字符之间"
            }
        }
    })

    //重置表单数据
    $("#formUserInfo").on("click",function(e){
        //阻止默认清空所有现象
        e.preventDefault()
        //重新加载一下
        initUserInfo()
    })

    //监听表单的提交
    $(".layui-form").on("submit",function(e){
        //阻止表单的默认提交
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功")
                window.parent.getUserInfo()
            }
        })
    })
})

//初始化用户的信息
function initUserInfo(){
    var layer = layui.layer
    var form = layui.form
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        success:function(res){
            if(res.status !== 0 ){
                return layer.msg("获取用户信息失败")
            }
            //调用form.val()快速为表单赋值
            form.val("formUserInfo",res.data)
            $("#inputName").html(res.data.username)
        }
    })
}