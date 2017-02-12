/**
 * Created by Administrator on 2016/11/6.
 */
$(function(){
    //轮播图的实现
    function resize(){
        //获取屏幕的宽度
        var windowWidth = $(window).width();
        //console.log(windowWidth);
        //判断是否屏幕的宽度小于768
        var isSmallScreen = windowWidth < 768;
        $("#main_ad > .carousel-inner > .item").each(function(i,e){
            //当屏幕是小于768时，用小图
            var imgSrc = $(this).data(isSmallScreen? "image-xs" : "image-lg");
            //屏幕大于768时，用背景的方式插入图片
            $(this).css("backgroundImage","url('" + imgSrc + "')");

            // 当需要小图时 尺寸等比例变化，所以小图时使用img方式
            if(isSmallScreen){
                $(this).html("<img src='"+imgSrc+"'>")
            }
            else{
                $(this).empty();
            }

        })
    }
    //在窗口加载之前首先加载一次resize函数
    $(window).on("resize",resize).trigger('resize');

    //面板里面的小图标提示
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页元素的宽度
    var $ulContainer = $(".nav-tabs");
    //console.log($(".nav-tabs").children());
    var width = 30;  //第一个li有一个padding-left
    //遍历ul里面的li的宽度，求和
    $ulContainer.children().each(function(index,ele){

       width += $(ele).width();
    });
    //console.log(width);
    //console.log($(window).width());
    //判断所有li的宽度和与屏幕的宽度的关系
    if(width > $(window).width())
    {
        $ulContainer
            .css("width",width)  //把所有li的宽度和赋值给ul
            .parent().css("overflow-x","scroll");
    }


    getWidth($(".nav-pills"));
    //获得ul里面所有li的宽度的和
    function getWidth(target){
        var width = 0;
        target.children().each(function(index,ele){

            width += $(ele).width() + 20;
            //console.log(width)
        });
        target.css("width",width);
    }

    //点击nav-pills里面的li
    $(".nav-pills > li > a").on("click",function(){
        //获取到a里面的data-title内容
        var title = $(this).data('title');
        //console.log(title)
        //将获取到的内容放到.news-title里面
        $("#news .news-title").text(title);
    });

    ////获取手指在轮播图上的滑动方向（左或者右）
    //var $carousel = $(".carousel");
    //
    //var startX,endX;
    //
    //var offset = 50; //偏移量
    //
    //$carousel.on("touchstart",function(e){
    //
    //    //手指触摸开始时记录一下手指所在的坐标startX
    //    startX = e.originalEvent.touches[0].clientX;
    //    //console.log(startX);
    //});
    //
    //$carousel.on("touchmove",function(e){
    //
    //    //结束触摸一瞬间记录最后的手指所在坐标endX
    //    endX = e.originalEvent.touches[0].clientX;
    //    //console.log(endX);
    //})
    //$carousel.on("touchend",function(){
    //    //触摸结束后，用|starX-endX|,获得两点之间的距离distance
    //    var distance = Math.abs(startX - endX);
    //    //当距离小于某一个值(偏移量)时触发滑动
    //    //console.log(distance)
    //    if(distance>offset)
    //    {
    //         //starX - endX < 0时向右边滑动，反之向左滑动
    //        $(this).carousel(startX - endX < 0? "prev" : "next");
    //    }
    //})

    carouselTouchControl(".carousel");
    function carouselTouchControl(obj){
        //获取手指在轮播图上的滑动方向（左或者右）
        var $carousel = $(obj);

        var startX,endX;

        var offset = 50; //偏移量

        $carousel.on("touchstart",function(e){

            //手指触摸开始时记录一下手指所在的坐标startX
            startX = e.originalEvent.touches[0].clientX;
            //console.log(startX);
        });

        $carousel.on("touchmove",function(e){

            //结束触摸一瞬间记录最后的手指所在坐标endX
            endX = e.originalEvent.touches[0].clientX;
            //console.log(endX);
        })
        $carousel.on("touchend",function(){
            //触摸结束后，用|starX-endX|,获得两点之间的距离distance
            var distance = Math.abs(startX - endX);
            //当距离小于某一个值(偏移量)时触发滑动
            //console.log(distance)
            if(distance>offset)
            {
                //starX - endX < 0时向右边滑动，反之向左滑动
                $(this).carousel(startX - endX < 0? "prev" : "next");
            }
        })

    }
});

