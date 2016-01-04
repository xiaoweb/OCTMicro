/** * Created with WebStorm. * User: RD-小小WEB * Date: 2015/3/26 * Time: 11:20 */
/*效果集合*/
var animates = {};
/*用的比较多的动画方法*/
function playFn(actDom){
    $(actDom).find(".style-content").removeClass("ready");
}
function resetFn(actDom){
    $(actDom).find(".style-content").addClass("ready");
}
/*slide1*/
animates.common = {
    play: playFn,
    reset: resetFn
};

/*slide4*/
animates.slide4 = {
    play :function(actDom){
        $(actDom).find(".style-content").removeClass("ready");
        $(actDom).find(".pic").click(function(){
            $(this).toggleClass("act").addClass("zin").siblings(".pic").removeClass("act");
        });
    },
    reset :function(actDom){
        $(actDom).find(".pic").removeClass("act").removeClass("zin").unbind("click");
        $(actDom).find(".style-content").addClass("ready");
    }
};
/*slide5*/
animates.slide5 = {
    play :function(actDom){
        //$(actDom).find(".pic_h").eraser();
    },
    reset :resetFn
};

//兼容amd模块
if(typeof define === 'function' && define.amd){
    define(function(){
        return animates
    })
}


