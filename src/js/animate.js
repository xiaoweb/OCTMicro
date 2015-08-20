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