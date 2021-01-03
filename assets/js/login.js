$(function(){
    // 登陆注册页面切换：
    $("#gotoRegi").click(function(){
        $(".register").show()
        $(".login").hide()
    })
    
    $("#gotoLogin").click(function(){
        $(".register").hide()
        $(".login").show()
    })
    // ------------------------------
    // 自定义表单密码验证：
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
    // -------------------------------
    // 实现注册功能：
    let layer = layui.layer;
    $("#regiForm").on("submit",function(e){
        e.preventDefault();

        let data = $(this).serialize();
        $.ajax({
            type:"POST",
            url:"http://ajax.frontend.itheima.net/api/reguser",
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

    // 实现登录功能：
    $("#loginForm").on("submit",function(e){
        e.preventDefault();

        let data = $(this).serialize();
        $.ajax({
            type:"POST", 
            url:"http://www.liulongbin.top:3007/api/login",
            data,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("登录失败");
                }
                // 内置模块 -> 弹出层 -> layer.msg 提示框(自动延时功能)
                layer.msg("登录成功，即将跳转到首页",function(){
                // 跳转页面
                location.href = "../../home/index.html";
                });
            },
        })
    })

})