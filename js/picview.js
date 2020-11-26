document.writeln("<!-- Root element of PhotoSwipe. Must have class pswp. -->");
document.writeln("<div class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">");
document.writeln("");
document.writeln("    <!-- Background of PhotoSwipe.");
document.writeln("         It\'s a separate element as animating opacity is faster than rgba(). -->");
document.writeln("    <div class=\"pswp__bg\"><\/div>");
document.writeln("");
document.writeln("    <!-- Slides wrapper with overflow:hidden. -->");
document.writeln("    <div class=\"pswp__scroll-wrap\">");
document.writeln("");
document.writeln("        <!-- Container that holds slides.");
document.writeln("            PhotoSwipe keeps only 3 of them in the DOM to save memory.");
document.writeln("            Don\'t modify these 3 pswp__item elements, data is added later on. -->");
document.writeln("        <div class=\"pswp__container\">");
document.writeln("            <div class=\"pswp__item\"><\/div>");
document.writeln("            <div class=\"pswp__item\"><\/div>");
document.writeln("            <div class=\"pswp__item\"><\/div>");
document.writeln("        <\/div>");
document.writeln("");
document.writeln("        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->");
document.writeln("        <div class=\"pswp__ui pswp__ui--hidden\">");
document.writeln("");
document.writeln("            <div class=\"pswp__top-bar\">");
document.writeln("");
document.writeln("                <!--  Controls are self-explanatory. Order can be changed. -->");
document.writeln("");
document.writeln("                <div class=\"pswp__counter\"><\/div>");
document.writeln("");
document.writeln("                <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"><\/button>");
document.writeln("");
document.writeln("                <button class=\"pswp__button pswp__button--share\" title=\"Share\"><\/button>");
document.writeln("");
document.writeln("                <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"><\/button>");
document.writeln("");
document.writeln("                <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in\/out\"><\/button>");
document.writeln("");
document.writeln("                <!-- Preloader demo http:\/\/codepen.io\/dimsemenov\/pen\/yyBWoR -->");
document.writeln("                <!-- element will get class pswp__preloader--active when preloader is running -->");
document.writeln("                <div class=\"pswp__preloader\">");
document.writeln("                    <div class=\"pswp__preloader__icn\">");
document.writeln("                        <div class=\"pswp__preloader__cut\">");
document.writeln("                            <div class=\"pswp__preloader__donut\"><\/div>");
document.writeln("                        <\/div>");
document.writeln("                    <\/div>");
document.writeln("                <\/div>");
document.writeln("            <\/div>");
document.writeln("");
document.writeln("            <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">");
document.writeln("                <div class=\"pswp__share-tooltip\"><\/div>");
document.writeln("            <\/div>");
document.writeln("");
document.writeln("            <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">");
document.writeln("            <\/button>");
document.writeln("");
document.writeln("            <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">");
document.writeln("            <\/button>");
document.writeln("");
document.writeln("            <div class=\"pswp__caption\">");
document.writeln("                <div class=\"pswp__caption__center\"><\/div>");
document.writeln("            <\/div>");
document.writeln("");
document.writeln("        <\/div>");
document.writeln("");
document.writeln("    <\/div>");
document.writeln("");
document.writeln("<\/div>");

/*****************************************************************
 * @param selector 为存放图片的div的ID
 * 不带删除按钮的图片dom结构如下
 * <figure><img src="http://192.168.23.224:8280/cs/20180321/photo/da16c389-2883-4110-8aad-be4471404a6e.jpg" width="60" height="60"></figure>
 * 带删除按钮的图片dom结构如下
 * <figure>
    <img src="http://192.168.23.224:8280/cs/20180321/photo/afc3725d-7640-49a0-ae4b-567e70285475.jpg" width="60" height="60">
     <a href="javascript:void(0)">
        <span class="glyphicon glyphicon-remove"></span>
     </a>
 </figure>
 * **************************************************************/
var initPhotoGallery=function(selector){
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var items =[];
    $('#'+selector).children().each(function(){
        var path = $(this).children().children(':first-child').attr("src");
        var img = new Image();
        img.src = path;
        var imageWidth = img.width;
        var imageHeight = img.height;
        var item = {
            src: path,
            w: imageWidth,
            h: imageHeight
        };
        items.push(item);
    });

    // define options (if needed)
    var options = {
        shareEl:false,
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}