$(function(){
    let layer = layui.layer;

    // -----获取文章列表------------------------
    $.ajax({
        url:"/my/article/cates",
        success:function(res){
           let htmlStr = template("trTpl", res) 
           $("#tb").html(htmlStr)
        }
    })

    // -----添加文章类别-------------------------
    $("#addBtn").click(function(){
        let index = layer.open({
            content: $("#addFormTpl").html(),
            title: "添加文章类别",
            type: 1, //层的类型，1表示页面层
            // area: ["500px", "300px"] 宽高
            area: "450px", //宽
          });
    })
    

})