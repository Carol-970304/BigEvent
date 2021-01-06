$(function(){
    
    let form = layui.form;
    let layer = layui.layer;
    // -----自定义表单校验-----------------------------------------
    form.verify({
        nickname: (value) => {
            // console.log(value);

            if(value.length > 6){
                return "昵称长度需要在1-6个字符之间"
            }
        }
      }); 

    // -----表单赋值(服务器存储过的响应回来的用户信息)---------------
    function getInfo(){

        $.ajax({
            url:"/my/userinfo",
            success:function(res){
                console.log(res);
    
                if(res.status !== 0){
                    return layer.msg("获取用户信息失败")
                }
                // 给表单赋值：form.val("formTest", {"name":"value"})
                // formTest即class="layui-form"所在form标签的属性lay-filter=""对应的值
                // 第二个参数中的键值是表单元素对应的name和value
                form.val("form",res.data);    
            }
        })
    }
    getInfo()

    // -----重置(恢复存储过的用户信息)------------------------------
    $("#resetBtn").click(function(e){
        e.preventDefault();
        getInfo();
    })

    // -----提交修改---------------------------------------------------
    $("#form").on("submit",function(e){
        e.preventDefault();

        let data = $(this).serialize();

        $.ajax({
            url:"/my/userinfo",
            type:"POST",
            data,
            success:function(res){
                // console.log(res)

                if(res.status !== 0){
                    return layer.msg("修改用户信息失败")
                }

                // window.parent => 可以找到父页面的window对象(全局)
                window.parent.getUserInfo(); //调用父页面的修改头像和昵称功能，实现同步修改
                layer.msg("修改用户信息成功")
            }
        })
    })
})