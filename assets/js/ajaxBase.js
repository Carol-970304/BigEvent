

$.ajaxPrefilter(function(options){
    // 优化根路径：
    options.url = "http://api-breakingnews-web.itheima.net" + options.url

    // 再一次优化：
    if(options.url.indexOf("/my") !== -1){
        options.headers = {
            Authorization: localStorage.getItem("token")
        };

        // 控制用户的访问权限
        options.complete = function(xhr){
            if(xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败！"){
                location.href = "/9.大事件/home/login.html"
            }
        }
    }
})