$(function(){
    //点击去注册 账号 的链接
    $("#link_reg").on("click",function(){
       $(".login-box").hide()
       $(".reg-box").show() 
    })
    //点击 去登陆的  链接
    $("#link_login").on("click",function(){
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //自定义校验规则
    //从layui种获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()自定义检验规则
    form.verify({
        pwd:[ /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        //校验两次密码是否输入一直
        repwd:function(value){
            //通过value拿到的是确认密码框的内容
            //还需要拿到输入密码框的内容
            //两者进行比较
           var pwd =  $(".reg-box [name=password]").val()
            if(pwd !== value){
                console.log(pwd);
                console.log(value);
                return "两次密码不一致"
            }
        }
    })
    //监听注册表单的提交按钮
    
    $("#form_reg").on("submit",function(e){
        e.preventDefault()
        // var data = {username:$("#form_reg[name=username]").val(),password:$("#form_reg[name=password]").val()}
        // var uname=$("#uname").val();
        // var upwd=$("#upwd").val();
        // console.log(uname);
        // console.log(upwd);
        $.post("/api/reguser", $(this).serialize(),function(res){
            if(res.status !== 0){
                console.log(res);
                return layer.msg("注册失败");
            }
            layer.msg("注册成功")
            //模拟人的点击行为
            $("#link_login").click()
        })
    })

    //监听登录表单
    $("#form_login").submit(function(e){
        //阻止表单默认提交
        e.preventDefault()
        $.ajax({
            type:"post",
            url:"/api/login",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功")
                //将token保存到localStorage
                localStorage.setItem("token",res.token)
                //跳转到后台主页
                location.href="/index.html";
            }

        })
    })
})
