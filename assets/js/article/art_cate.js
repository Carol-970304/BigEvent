$(function(){
    let layer = layui.layer;
    let form = layui.form;

    // -----获取文章列表，渲染到页面中------------------------
    function getCate(){
        $.ajax({
            url:"/my/article/cates",
            success:function(res){
               let htmlStr = template("trTpl", res) 
               $("#tb").html(htmlStr)
            }
        })
    }
    getCate();

    // -----添加类别弹出层-------------------------
    let index;
    $("#addBtn").click(function(){
        // index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数
        index = layer.open({
            content: $("#addFormTpl").html(),
            title: "添加文章类别",
            type: 1, //层的类型，1表示页面层
            // area: ["500px", "300px"] 宽高
            area: "450px", //宽
          });
    })

    // 确认添加,渲染到页面：
    $("body").on("submit","#addForm",function(e){
        e.preventDefault();

        let data = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("添加失败！")
                }

                layer.close(index); //隐藏弹出层
                getCate();
                layer.msg("添加成功！")
            }
        })
    })

    // -----编辑弹出层----------------------------------------------
    let editIndex;
    $("#tb").on("click",".editBtn",function(){
        editIndex = layer.open({
            content: $("#editFormTpl").html(),
            title: "编辑",
            type: 1, //层的类型，1表示页面层
            area: "450px", //宽
          });

        let id = $(this).attr("data-id");
        $.ajax({
        // url: "/my/article/cates/"+id
        url: "/my/article/cates/" + id,
        success: function(res){
            // "editForm" => class="layui-form"所在元素的属性lay-filter=""对应的值
            form.val("editForm", res.data)
          }
       })
    })

    // 确认修改，渲染到页面：
    $("body").on("submit","#editForm",function(e){
        e.preventDefault();

        let data = $(this).serialize();

        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("修改失败！")
                }

                layer.close(editIndex); //隐藏弹出层
                getCate();
                layer.msg("修改成功！")
            }
        })
    })

    // -----删除弹出层----------------------------------------------
    $("#tb").on("click",".delBtn",function(){
        let id = $(this).attr("data-id");
        layer.confirm("确定删除吗",{icon: 3,title: "提示"},function(index){
            $.ajax({
                url: "/my/article/deletecate/" + id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg("删除失败！")
                    }

                    getCate();
                    layer.msg("删除成功！")
                }
            })
            layer.close(index); //隐藏弹出层 => 放在ajax请求外部，不论删除成功或失败都隐藏confirm弹出层
        })
    })
    

})