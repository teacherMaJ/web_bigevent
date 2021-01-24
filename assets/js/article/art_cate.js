$(function(){
    var layer = layui.layer
    var index = null;
    var indexEdit=null
    var form = layui.form
    initArtCateList()
    //获取文章分类得列表
    function initArtCateList(){
        $.ajax({
            method:"GET",
            url:"/my/article/cates",
            success:function(res){
                var htmlStr = template("tpl_table",res)
                $("tbody").html(htmlStr)
            }
        })
    }



    $("#btnAddCate").on("click",function(){
        index = layer.open({
            type:1,
            area:["500px","250px"],
            title: '添加文章分类'
            ,content: $("#dialog-add").html()
          });    
    })

    //通过代理得方式  绑定点击事件
    $("body").on("submit","#from_add",function(e){
        e.preventDefault()

        $.ajax({
            type:"POST",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    layer.msg(res.message)
                }
                initArtCateList()
                layer.close(index)
                

            }
        })
    })

    //通过代理形式，为btn-edit绑定点击事件
    $("tbody").on("click","#btn-edit",function(){
        indexEdit = layer.open({
            type:1,
            area:["500px","250px"],
            title: '修改文章分类'
            ,content: $("#dialog-edit").html()
          });  

          var id = $(this).attr("data-id");
          //发起ajax请求
          $.ajax({
              type:"GET",
              url:"/my/article/cates/"+id,
              success:function(res){
                form.val("from_edit",res.data)
              }
          })
    })


    //通过代理得方式，为修改分类得表单  绑定submit事件
    $("body").on("submit","#from_edit",function(e){
        e.preventDefault()
        $.ajax({
            type:"POST",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg("更新失败")
                }
                layer.msg("更新成功")
                layer.close(indexEdit)
                initArtCateList()
            }

        })
    })
    //通过代理得形式为我们删除得按钮绑定点击事件
    $("tbody").on("click","#btn-delete",function(e){
        var id = $(this).attr("data-id")
        // 提示用户是否删除
        layer.confirm('确认要删除吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type:"GET",
                url:"/my/article/deletecate/"+id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg("删除失败")
                    }
                    layer.msg("删除成功")
                    layer.close(index);
                    initArtCateList()
                }

            })

           
          });
        
    })
})

