// 1.获取用户的头像和昵称：
getUserInfo()
function getUserInfo(){
    $.ajax({
        url:"/my/userinfo",

        headers:{
            // 设置请求头(token在之前登录成功时已经存储到本地，现在只需要从本地获取)
            Authorization: localStorage.getItem("token")
        },
        success:function(res){
            console.log(res)
            renderUserInfo(res.data)
        }
    })
}

// 2.将用户的头像和昵称渲染到页面中：
function renderUserInfo(data){
// 优先展示昵称
let name = data.nickname ||data.username
// 名字首字母大写，作为文字头像
let first = name[0].toUpperCase()

$("#welcome").text("欢迎" + name)

if(data.user_pic){
    $(".layui-nav-img").attr("src", data.user_pic).show()
    $(".text-avatar").hide()
}else{
    $(".layui-nav-img").hide()
    $(".text-avatar").text(first).show()
}
}