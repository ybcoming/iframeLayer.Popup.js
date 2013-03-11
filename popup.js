(function(window, undefined){
    var iframeLayer = {};

    var uagent = navigator.userAgent.toLocaleLowerCase();
    if (uagent.indexOf("msie") > -1){
        iframeLayer.browser = 'ie';
    }
    else {
        iframeLayer.browser = 'netscape';
    }

    iframeLayer.Popup = function(){
        return {
            init : function(){
                var iframeContextButton=(function(){ return function(){ return false; }; })();
                var iframeResize = (function(){
                    return function () {
                        var objIframe = document.getElementById("iframeLayer"); var newHeight; var newWidth;
                        if(window.addEventListener){
                            newHeight = objIframe.contentWindow.document.body.offsetHeight;
                            newWidth = objIframe.contentWindow.document.body.scrollWidth;
                        }
                        else if (window.attachEvent){
                            newHeight = objIframe.contentWindow.document.body.scrollHeight + 5;
                            newWidth = objIframe.contentWindow.document.body.scrollWidth + 5;
                        }

                        objIframe.style.height= newHeight+'px';
                        objIframe.style.width= newWidth+'px';
                        objIframe.style.top = (document.documentElement.clientHeight - newHeight)/2 + "px";
                        objIframe.style.left = (document.documentElement.clientWidth - newWidth)/2 + "px";
                    };
                })();

                var iframe = document.createElement('iframe'); iframe.id='iframeLayer'; iframe.style.border = 0; iframe.style.visibility = 'hidden'; iframe.style.top = 0; iframe.style.left = 0; iframe.style.position = 'absolute'; iframe.style.zIndex = 99; iframe.onload= iframe.onresize= iframeResize;
                document.body.appendChild(iframe);
            },
            show : function(src){
                var objIframe = document.getElementById("iframeLayer");
                objIframe.contentWindow.document.location.replace(src);
                objIframe.style.visibility = 'visible';
                if(window.addEventListener){
                    newHeight = objIframe.contentWindow.document.body.offsetHeight;
                    newWidth = objIframe.contentWindow.document.body.scrollWidth;
                }
                else if (window.attachEvent){
                    newHeight = objIframe.contentWindow.document.body.scrollHeight + 5;
                    newWidth = objIframe.contentWindow.document.body.scrollWidth + 5;
                }

                objIframe.style.height= newHeight+'px';
                objIframe.style.width= newWidth+'px';
                objIframe.style.top = (document.documentElement.clientHeight - newHeight)/2 + "px";
                objIframe.style.left = (document.documentElement.clientWidth - newWidth)/2 + "px";
            },
            hide : function(){
                var objIframe = document.getElementById("iframeLayer");
                objIframe.contentWindow.document.location.replace('about://');
                objIframe.style.visibility = 'hidden';
                objIframe.style.top = 0;
                objIframe.style.left = 0;
            }
        }
    }

    window.iframeLayerPopup = iframeLayer.Popup();
    iframeLayerPopup.init();
})(window)
