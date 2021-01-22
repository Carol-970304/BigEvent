$(function(){
    let form = layui.form;
    let layer = layui.layer;
    // -----校验表单---------------------------------
    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],

        newPass: value => {
            let oldPwd = $("[name=oldPwd]").val()
            if(value === oldPwd){
                return "新密码不能和原密码相同"
            }
        },

        rePass: value => {
            let newPwd = $("[name=newPwd]").val()
            if(value !== newPwd){
                return "两次密码不一致"
            }
        }
      });
      
    // -----确认修改----------------------------------

    $("#form").on("submit",function(e){
        e.preventDefault()

        let data = $(this).serialize()

        $.ajax({
            url:"/my/updatepwd",
            type:"POST",
            data,
            success:function(res){
                // console.log(res)

                if(res.status !== 0){
                    return layer.msg(res.message)
                }

                // window.parent => 可以找到父页面的window对象(全局)
                // window.parent.getUserInfo(); //调用父页面的修改头像和昵称功能，实现同步修改
                layer.msg("更新密码成功")

                // 清空：
                $("#form")[0].reset()
            }
        })
    })

    // -------------------------------------------
})