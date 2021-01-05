
// 优化根路径：
$.ajaxPrefilter(function(options){
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
})