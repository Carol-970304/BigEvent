$(function(){
    // 自定义表单校验：
    let form = layui.form;
    form.verify({
        nickname: (value) => {
            console.log(value);

            if(value.length > 6){
                return "昵称长度需要在1-6个字符之间"
            }
        }
      }); 

    // -------------------------------------------

    $.ajax({
        url:"/my/userinfo",
        success:function(res){
            console.log(res);
            // 给表单赋值：form.val("formTest", {"name":"value"})
            // formTest即class="layui-form"所在form标签的属性lay-filter=""对应的值
            // 第二个参数中的键值是表单元素对应的name和value
            form.val("form",res.data);    
        }
    })
})