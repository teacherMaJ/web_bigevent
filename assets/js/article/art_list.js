$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    //定义美化事件的过滤器
    template.defaults.imports.dataFormat = function(date){
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth()+1
        var d = dt.getDate()

        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()

        return y+"-"+m+"-"+d + "" +hh+":"+mm+":"+ss
    }
    //定义一个查询的参数对象，将来请求数据的时候，需要将请求参数对象提交到服务器
    var q = {
        //页码值
        pagenum:1,
        //一页显示多少数据
        pagesize:2,
        //文章分类Id
        cate_id:'',
        //文章的发布状态
        state:''
    }

    initTable()
    initGet()


    //获取文章列表数据
function initTable(){
    $.ajax({
        method:"GET",
        url:"/my/article/list",
        data:q,
        success:function(res){
            if(res.status !==0 ){
                
                return layer.msg(res.message)
            }
            
            //使用模板引擎渲染数据
           var htmlStr =  template("tpl-table",res)
            $("tbody").html(htmlStr)
          //调用分页功能
          renderPage(res.total)
        }
    })
}

//初始化文章分类
function initGet(){
    $.ajax({
        method:"GET",
        url:"/my/article/cates",
        success:function(res){
            if(res.status !==0){
                return layer.msg("渲染失败")
            }
            //调用模板引擎渲染分类的可选项
          var htmlStr =   template("tpl-cate",res)
            $("[name=cate_id]").html(htmlStr)
            form.render()
        }
    })
}
//为筛选表单绑定筛选事件
$("#form_search").on("submit",function(e){
    e.preventDefault();
    //获取表单中选项的值
    var cate_id = $("[name = cate_id]").val()
    var state = $("[name = state]").val()
    //为查询对象Q属性赋值
    q.cate_id = cate_id;
    q.state = state
    //根据最新选项，重新渲染数据
    initTable()
})

//定义渲染分页的方法
function renderPage(total){
    laypage.render({
        elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        limit:q.pagesize,
        curr:q.pagenum,
        layout:['count','limit','prev','page','next','skip'],
        limits:[2,3,5,10],
        jump:function(obj,first){
            //拿到最新的条目数
           q.pagesize =  obj.limit
            // obj.curr可以得到最新的回调值
           q.pagenum = obj.curr
             // initTable()
            if(!first){
            initTable()
                }
                }
    });
}

//通过代理的方式 为文章删除绑定事件
$("tbody").on("click",".btn-delete",function(){
    layer.confirm('确认删除吗?', {icon: 3, title:'提示'}, function(index){
        //拿到当前页面上所有删除按钮的个数
        var len = $(".btn-delete").length
        
        var id = $(this).attr("data-id")
        $.ajax({
            type:"GET",
            url:"/my/article/delete/"+id,
            success:function (res) {
                if(res.status !==0){
                    return layui.layer.msg("删除文章失败")
                }
                layui.layer.msg("数据删除成功")
                //如果len ===1 证明删除之后页面上 没有数据了
                if(len === 1){
                    q.pagenum = q.pagenum === 1 ? 1: q.pagenum - 1
                }
                initTable()
            }
        })
        layer.close(index);
      });
})
})
