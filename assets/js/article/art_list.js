$(function(){
    let query = {
        pagenum: 1, //页码值，默认加载第一个数据
        pagesize: 2, //每页显示多少条数据
        cate_id: "", //文章分类的id，"" 表示要所有分类数据
        state: "", //文章状态(已发布/草稿)，"" 表示所有状态
    }

    // -----筛选区域-------------------------------------
    let layer = layui.layer;
    let form = layui.form;
    // 获取分类数据：
    $.ajax({
        url: "/my/article/cates",
        success: function(res){
            // console.log(res)
            if(res.status !== 0){
                return layer.msg("获取分类数据失败！")
            }

            res.data.forEach((item) => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo("#cateSelect")
                // layui内置模块 => 表单 => 更新渲染
                form.render() //动态创建的option添加到select下拉框中，不会自动更新下拉框界面，手动调用以下方法来实现表单的重新渲染
            });
        }
    })

    // 筛选功能：
    $("#form").on("submit",function(e){
        e.preventDefault();

        query.cate_id = $("#cateSelect").val()
        query.state = $("#stateSelect").val()

        // 筛选的时候，需要展示第一页的筛选结果
        query.pagenum = 1;

        getList()
    })

    // -----文章区域-------------------------------------
    // 过滤器函数：美化时间格式
    template.defaults.imports.fn = function (msg) {
        // 形参msg => 表示需要处理的数据
        let addZero = (n) => (n < 10 ? "0" + n : n);
        let d = new Date(msg);
        let y = d.getFullYear();
        let m = addZero(d.getMonth() + 1);
        let day = addZero(d.getDate());

        let h = addZero(d.getHours());
        let mm = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());

        return `${y}/${m}/${day} ${h}:${mm}:${s}`;
      };

    // 获取文章列表：
    getList();
    function getList(){
        $.ajax({
            url: "/my/article/list",
            data: query,
            success: function(res){
                // console.log(res)
                let htmlStr = template("trTpl",res)
                $("#tb").html(htmlStr)

                // 调用，完成分页渲染功能：
                renderPage(res.total)
            }
        })
    }

    // -----分页区域-------------------------------------
    let laypage = layui.laypage;
    function renderPage(total){
        laypage.render({
            elem: 'pageBox', //容器id
            count: total, //数据总数，从服务端得到
            limit: query.pagesize, //每页显示多少条数据
            limits: [2, 3, 5, 10, 20, 30],
            curr: query.pagenum, //页码值
            layout: ['count', 'limit', 'prev', 'page', 'next','skip'],

            // 点击了分页按钮之后，jump函数会触发：
            // jump函数的执行时机：1.当分页在初始化渲染的时候(laypage.render)jump就会触发一次 / 2.当点击分页按钮切换的时候，jump也会触发
            // obj => obj包含了当前分页的所有参数(obj.limit / obj.curr)
            // 当first为true，表示分页在初始化渲染 / 当first为undefined，表示点击分页按钮切换
            jump: function(obj, first){
                // console.log(first)
                query.pagenum = obj.curr;
                query.pagesize = obj.limit;

                if (!first) {
                    // if成立，说明first值为undefined，说明点击分页按钮，调用getList发送ajax请求
                    getList();
                  }
            }
          });   
    }

    // -----删除弹出层-------------------------------------
    $("#tb").on("click",".delBtn",function(){
        let id = $(this).attr("data-id");
        // 点击确定，执行function
        layer.confirm("确定删除吗",{icon: 3,title: "提示"},function(index){

            let delBtnLength = $(".delBtn").length
            if(delBtnLength === 1){
                // if(query.pagenum === 1){
                //     query.pagenum = 1
                // }else{
                //     query.pagenum = query.pagenum - 1
                // }
                query.pagenum = query.pagenum = 1 ? 1 : query.pagenum - 1
            }

            $.ajax({
                url: "/my/article/delete/" + id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg("删除失败！")
                    }

                    getList();
                    layer.msg("删除成功！")
                }
            })
            layer.close(index);
        })
    })

    // ---编辑弹出层---------------------------------------
    $("#tb").on("click", ".editBtn",function(){
        let id = $(this).attr("data-id")
        // 以查询字符串的格式带上id的值：
        location.href = `/9.大事件/article/art_edit.html?Id=${id}`
    })

})