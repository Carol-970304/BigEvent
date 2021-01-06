$(function(){
let $image = $('#image');
let layer = layui.layer;

// ------------------------------------------
// 配置选项：
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 创建裁剪区域：
$image.cropper(options)

// -----点击上传，触发file按钮-----------------
$("#chooseBtn").click(function(){
    $("#file").click()
})

// -----更换图片-------------------------------
$("#file").on("change",function(){
    let file = this.files[0] // 我们选择的图片的文件对象

    if (!file) {
        // 解决报错问题（没有选择图片）
        return;
      }

    //根据文件对象，生成一个临时的url，用于访问被选择的图片：
    let url = URL.createObjectURL(file) 

    // 更换剪裁区的图片的src属性：销毁原理的剪裁区=>更换图片=>重新创建剪裁区
    Image.cropper("destroy").attr("src",url).cropper(options)
})

// -----点击 确定 的时候，剪裁图片，转成base64格式，提交字符串到接口 ----------
$('#sure').click(function () {
    // 剪裁得到一张图片（canvas图片）
    let i = image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
    });
    
    // 把图片转成base64格式
    let str = i.toDataURL(); // 把canvas图片转成base64格式
    
    // console.log(str); // base64格式的字符串
    // ajax提交字符串给接口
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {avatar: str},
        success: function (res) {

            if (res.status !== 0) {
               return layer.msg("更新头像失败!");
            }
            layer.msg("更新头像成功!");
            window.parent.getUserInfo();
        }
            
    });
});

})