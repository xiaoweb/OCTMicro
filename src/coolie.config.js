/**
 * ======================================================
 * coolie-cli 配置文件 `coolie.config.js`
 * 使用 `coolie init -c` 生成 `coolie.config.js` 文件模板
 * 当前配置文件所在的目录为构建的根目录
 *
 * @link http://coolie.ydr.me/guide/coolie.config.js/
 * @author ydr.me
 * @version 1.1.1
 * @create 2015-12-30 16:09:17
 * =======================================================
 */

'use strict';

module.exports = function (coolie) {
    // coolie 配置
    coolie.config({
        // 是否在构建之前清空目标目录
        clean: true,

        // 目标配置
        dest: {
            // 目标目录，相对于当前文件
            dirname: '../dest/',
            // 目标根域
            host: 'http://image.octmami.com/public/pic/web/OCTMicro_Static',
            // 版本号长度
            versionLength: 32
        },

        // js 构建
        js: {
            // 入口模块，相对于当前文件
            main: [
                './js/index.js'
            ],
            // coolie-config.js 路径，相对于当前文件
            'coolie-config.js': 'coolie-config.js',
            // js 文件保存目录，相对于 dest.dirname
            dest: './static/',
            // 分块配置
            chunk: []
        },

        // html 构建
        html: {
            // html 文件，相对于当前文件
            src: [
                './*.html'
            ],
            // 是否压缩
            minify: true
        },

        // css 构建
        css: {
            // css 文件保存目录，相对于 dest.dirname
            dest: './static/',
            // css 压缩配置
            minify: {
                compatibility: '*'
            }
        },

        // 资源
        resource: {
            // 资源保存目录，相对于 dest.dirname
            dest: './static/',
            // 是否压缩
            minify: true
        },

        // 原样复制文件，相对于当前文件
        copy: [
            './favicon.ico',
            './robots.txt'
        ]
    });

    // 使用 coolie 中间件
    // coolie.use(require('coolie-*'));

    // 自定义 coolie 中间件
    //coolie.use(function (options) {
    //    // do sth.
    //    return options;
    //});
    coolie.use(function(options){
        var REG_IMG = /<img[\s\S]*?>(?!["'])/gi;

        options.code = options.code.replace(REG_IMG, function (htmlTag) {

            // 读取 data-original 属性
            var dataOriginal = coolie.utils.getHTMLTagAttr(htmlTag, 'data-src');
            // 属性不为空或者属性为 true
            if (!dataOriginal || dataOriginal === true) {
                return htmlTag;
            }
            // 转换为绝对文件地址
            var dataOriginalFile = coolie.utils.getAbsolutePath(dataOriginal, options.file);

            if (!dataOriginalFile) {
                return htmlTag;
            }
            // 复制文件
            var toURI = coolie.utils.copyResourceFile(dataOriginalFile);
            // 重设 data-original 属性值
            return coolie.utils.setHTMLTagAttr(htmlTag, 'data-src', toURI);
        });
            return options;
    })
};