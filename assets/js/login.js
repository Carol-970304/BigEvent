$(function(){
    // ---登陆注册页面切换------------------
    $("#gotoRegi").click(function(){
        $(".register").show()
        $(".login").hide()
    })
    
    $("#gotoLogin").click(function(){
        $(".register").hide()
        $(".login").show()
    })

    // ---自定义表单验证--------------------
    // let form = layui.form
    let form = layui.form;
    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        repwd:function(value, item){
            let pwd = $(".register [name = password]").val();
            if(value !== pwd){
                return "两次密码不一致";
            }
        }
      }); 

    // ---实现注册功能----------------------
    let layer = layui.layer;
    $("#regiForm").on("submit",function(e){
        e.preventDefault();

        let data = $(this).serialize();
        $.ajax({
            type:"POST",
            url:"/api/reguser",
            data,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("用户名已被占用");
                }
                layer.msg("注册成功");
                $("#gotoLogin").click();
            }
        })
    })

    // ---实现登录功能-----------------------
    $("#loginForm").on("submit",function(e){
        e.preventDefault();

        let data = $(this).serialize();
        $.ajax({
            type:"POST", 
            url:"/api/login",
            data,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("登录失败");
                }

                // 登录成功，还需要把服务器给的token信息给存储起来
                localStorage.setItem("token", res.token);

                // 内置模块 -> 弹出层 -> layer.msg 提示框(自动延时功能，默认3秒后自动消失)
                // layer.msg('提示', {
                //     icon: 1,
                //     time: 2000 //2秒关闭(如果不配置，默认是3秒)
                //   }, function(){
                //     //do something
                //   });   
                layer.msg("登录成功，即将跳转到首页",function(){
                // 跳转页面
                location.href = "/9.大事件/home/index.html";
                });
            },
        })
    })

})