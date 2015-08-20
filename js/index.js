/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/3/26 * Time: 11:20 */
$(function(){
    var loadEndDir = "";
    var activeIndex = 0;
    var t, loadTime;
    t = loadTime = 0;
    /*显示加载下一页*/
    function showNextPage(swiper,slide){
        $(".loading-next-page-tips").show();
    }
    /*隐藏加载下一页*/
    function hideNextPage(swiper,slide){
        $(".loading-next-page-tips").hide();
        $(".slide-arrow").show();
    }
    /*适应屏幕大小*/
    function fit(){
        $(".swiper-container").css("-webkit-transform","scale("+$(window).width() / 320 + ")");
    }
    window.mySwiper = new Swiper('.swiper-container', {
        direction : "vertical",
        onInit : function(swiper){
            fit();
            swiper.myactive = 0;
        } ,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        noSwiping : true,
        onLazyImageLoad : function(swiper, slide, image){
            if(t == 0){
                swiper.lockSwipes();
                $(swiper.slides[swiper.activeIndex]).addClass("act");
            }
            t++;
        },
        onLazyImageReady : function(swiper, slide, image){
            t--;
            if(t==0){
                swiper.unlockSwipes();
                if(!loadTime){
                    swiperAnimateCache(swiper);
                    swiperAnimate(swiper);
                    (animates[$(swiper.slides[swiper.activeIndex]).attr("animation_name")]).play(swiper.slides[swiper.activeIndex]);
                    $(".startbg").hide();
                    loadTime++;
                }
                hideNextPage();
                $(swiper.slides[swiper.activeIndex]).removeClass("act");
                if(loadEndDir == "up"){
                    swiper.slideNext();
                }else if(loadEndDir == "down"){
                    swiper.slidePrev();
                }
                loadEndDir = "";
            }
        },
        onReachEnd : function(swiper){
            $(".slide-arrow").hide();
        },
        threshold :50,
        watchSlidesProgress: true,
        onTransitionEnd: function(swiper, speed) {
            swiper.myactive = activeIndex = swiper.activeIndex;
            /*根据slide上的animation_name属性执行animation里的方法*/
            var actSlide = swiper.slides[swiper.activeIndex];
            $(swiper.slides).each(function(i,d){
                animates[$(d).attr("animation_name")].reset(d);
            });
            if(loadTime){
                (animates[$(actSlide).attr("animation_name")]).play(actSlide);
                swiperAnimate(swiper);
            }
        },
        loop : false,
        speed :400,
        //缩放slide效果
        onProgress: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides[i];
                var progress = slide.progress;
                var translate, boxShadow;
                translate = progress * swiper.height * 0.8;
                scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                boxShadowOpacity = 0;
                slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
                if (i == swiper.myactive) {
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                    es.zIndex=0;
                }else{
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
                    es.zIndex=1;
                }
            }
        },
        onSetTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
                es = swiper.slides[i].style;
                es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
            }
        }
    });
    $(window).on("resize",function(){
        fit();
    });
    //播放音乐
    $("#music-icon").on("click",function(){
        if($(this).hasClass("play")){
            $(this).removeClass("play");
            $("#music")[0].pause();
        }else{
            $(this).addClass("play");
            $("#music")[0].play();
        }
    });
    function orientationChange(){
        switch(window.orientation) {
            default :
                mySwiper.slideTo(activeIndex,0);
                break;
        }
    }
    window.addEventListener("orientationchange", orientationChange, false);
    //加载中用户滑动事件
    KISSY.use("core",function(S){
        S.all("body").delegate("swipe",".swiper-slide.act",function(e){
            if(t!=0 && !loadEndDir){
                switch (e.direction){
                    case "up":
                        loadEndDir =  "up";
                        break;
                    case "down":
                        loadEndDir =  "down";
                        break;
                }
                showNextPage();
            }
        });
    });
});


