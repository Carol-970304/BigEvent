$(function(){
    let form = layui.form

    // ---初始化富文本编辑器-------------------------------
    initEditor()

    // ---图片裁切----------------------------------------
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

    // ---给表单赋值--------------------------------------
    // 先获取到当前页面的地址，再来获取到其中的id的值：
    // console.log(location.href)
    let str = location.href
    let id = str.substring(str.indexOf("=")+1, str.length)
    // console.log(id)
    $.ajax({
        url: "/my/article/" + id,
        success: function(res){
            if(res.status !== 0){
                return layer.msg("获取文章失败！")
            }
            console.log(res)
            form.val("form", res.data)
        }
    })

    // ---发布和存草稿按钮--------------------------------
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
            let fd = new FormData(this)
            fd.append("state", state)
            fd.append("cover_img", blob)
            fd.append("Id", id) //获取文章Id，发送ajax请求

            pubArt(fd)
        })
    })

    let layer = layui.layer;
    function pubArt(formData){
        $.ajax({
            url: "/my/article/edit",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg("发布失败！")
                }
                
                layer.msg("发布成功！")
                location.href = "/9.大事件/article/art_list.html" 
                
            }
        })
    }

})