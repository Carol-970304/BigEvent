// *没有写入口函数，方便其他分支页面调用getUserInfo()全局函数

let layer = layui.layer
// ---获取用户的头像和昵称----------------------------------
getUserInfo()
function getUserInfo(){
    $.ajax({
        url:"/my/userinfo",

        headers:{
            // 设置请求头(token在之前登录成功时已经存储到本地，现在只需要从本地获取)
            Authorization: localStorage.getItem("token")
        },
        success:function(res){
            // console.log(res)
            if(res.status !== 0){
                return layer.msg("获取用户信息失败")
            }
            renderUserInfo(res.data)
        },
        complete:function(xhr){
            // 请求完成(不论成功还是失败)会执行该函数
            if(xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败！"){
                location.href = "/9.大事件/home/login.html"
            }
        }
    })
}

// ---将用户的头像和昵称渲染到页面中--------------------------
function renderUserInfo(data){
// 优先展示昵称
let name = data.nickname || data.username
// 名字首字母大写，作为文字头像
let first = name[0].toUpperCase()

$("#welcome").text("欢迎" + " " + name)

if(data.user_pic){
    $(".layui-nav-img").attr("src", data.user_pic).show()
    $(".text-avatar").hide()
}else{
    $(".layui-nav-img").hide()
    $(".text-avatar").text(first).show()
}
}


$("#logoutBtn").click(function(){
    layer.confirm("确认退出吗？",{icon: 3, title: "提示"},function(index){
        // 点击确认按钮会执行该函数
        // 退出登录：删除本地存储的token，跳转回登录页面
        localStorage.removeItem("token")
        location.href = "/9.大事件/home/login.html"

        layer.close(index) //按照index索引来关闭对应的弹出层
    })
})