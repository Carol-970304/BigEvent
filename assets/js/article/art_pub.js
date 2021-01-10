$(function(){
    // ---获取文章类别------------------------------------
    let form = layui.form;
    $.ajax({
        url: "/my/article/cates",
        success: function(res){
            // console.log(res)
            res.data.forEach((item) => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo("[name=cate_id]")
            });
            form.render() //更新渲染
        }
    })

    // ---初始化富文本编辑器------------------------------
    initEditor()

    // ---图片裁切---------------------------------------
    let $image = $("#image")
    let options = {
        aspectRatio: 400 / 280,
        preview: ".img-preview",
      };
    $image.cropper(options);

    // ---选择封面按钮------------------------------------
    $("#chooseBtn").click(function(){
        $("#file").click()
    })

    $("#file").on("change",function(){
        let file = this.files[0]
        let url = URL.createObjectURL(file)
        $image.cropper("destroy").attr("src",url).cropper(options)
    })

    // ---发布和存草稿按钮---------------------------------
    let state;
    $("#pubBtn").click(function(){
        state = "已发布"
    })
    $("#saveBtn").click(function(){
        state = "草稿"
    })

    $("#form").on("submit",function(e){
        e.preventDefault()

        // 将裁切的图片转成文件对象 => 这个形参bolb就是服务器要求的cover_img这个数据
        $image.cropper("getCroppedCanvas",{
            width: 400,
            height: 280,
        }).toBlob((blob) => {
            // 箭头函数中没有自己的this指向，找外层作用域中的this
            let fd = new FormData(this)
            fd.append("state",state) //追加文章状态
            fd.append("cover_img",blob) //追加封面cover_img

            pubArt(fd) //调用pubArt(),发送ajax请求
        })
    })

    let layer = layui.layer;
    function pubArt(formData){
        $.ajax({
            url: "/my/article/add",
            type: "POST",
            data: formData,
            // 发送fd这个FormData数据的时候，需要有以下两个配置
            contentType: false,
            processData: false,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg("发布失败！")
                }
                layer.msg("发布成功！")
                location.href = "/9.大事件/article/art_list.html" //跳转到art_list页面，首先调用1次getList()
            }
        })
    }

})