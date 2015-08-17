var DpShare = function() {
    return DpShare['init'].apply(DpShare, arguments);
};

(function(exp) {

    var shareWX = {
            appid: 'wx841a97238d9e17b2',
            title: document.title,
            desc: '分享来自大众点评',
            content: '',
            link: location.href,
            img_url: 'http://evt.dianping.com/midas/dper.jpg'
        },
        dpApp;

    exp.init = function(opt) {

        exp.ua = navigator.userAgent.toLowerCase();
        exp.initShareCallback = opt.initShareCallback;
        exp.initShareFail = opt.initShareFail;
        exp.getCXCallback = opt.getCXCallback;
        exp.wechat = 0;
        exp.weibo = 0;
        exp.tengxun = 0;

        exp.changeShare(opt);

    };

    exp.changeShare = function(opts) {

        for (var i in opts) {
            if (opts[i]) {
                shareWX[i] = opts[i];
            }
        }

        shareWX.link = exp.hrefDelete(shareWX.link);
        shareWXTL = {
            appid: shareWX.appid,
            title: '【' + shareWX.title + '】 ' + shareWX.desc || '【' + document.title + '】 ' + '分享来自大众点评',
            desc: shareWX.desc,
            content: shareWX.content,
            link: shareWX.link,
            img_url: shareWX.img_url
        };
        exp.autoListenWx();

        if (!exp.ua.match(/MicroMessenger/i)) {
            exp.DPAppReady(function() {
                exp.dpShareInit(DPApp);
                exp.getCx(DPApp)
            });
        }
    };

    exp.getCx = function(DPApp) {
        DPApp.getCX({
            business: "adPay-emidasvip", // 业务名
            success: function(e) {
                exp.getCXCallback && exp.getCXCallback(e)
            }
        });
    };
    exp.DPAppReady = function(callback) {

        exp.loadScript({
            src: 'http://i2.dpfile.com/mod/dpapp/1.1.6/standalone.js',
            cb: function() {
                var find = function(locat) {
                    return location.origin.indexOf(locat) > -1;
                };
                (!(find('51ping') || find('dianping') || find('dpfile') || find('alpha'))) && DPApp.config({
                    debug: true
                });
                DPApp.ready(function() {
                    dpApp = DPApp;
                    callback && callback(DPApp);
                });
            }
        });
    };



    exp.btnShare = function(option) {

        exp.changeShare(option);

        if (!exp.ua.match(/MicroMessenger/i)) {
            dpApp.share({
                title: shareWX.title,
                desc: shareWX.desc, //app到朋友圈里显示的是title+desc
                content: shareWX.content,
                image: shareWX.img_url,
                url: shareWX.link,
                feed: [dpApp.Share.WECHAT_FRIENDS, dpApp.Share.WECHAT_TIMELINE, dpApp.Share.WEIBO],
                success: function(e) {
                    option.initShareCallback && option.initShareCallback(e);
                }
            });
        }

        //微信
        exp.wechat = (exp.ua.match(/MicroMessenger/i) == "micromessenger") ? 1 : 0;
        if (exp.wechat || typeof WeixinJSBridge != 'undefined') {
            div = document.createElement('div');
            div.style.width = innerWidth;
            div.style.height = innerHeight;
            div.style.position = 'fixed';
            div.style.top = 0;
            div.style.left = 0;
            div.style.right = 0;
            div.style.bottom = 0;
            div.style.zIndex = 99999;
            div.style.backgroundColor = 'rgba(0,0,0,.8)';
            div.style.backgroundImage = 'url(http://si1.s1.dpfile.com/t/cssnew/events/labevent/seefilm/mmimages/share-cover-tips.e3893cb7ee521914fd768d05fab419b3.png)';
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundSize = 100 + '%';
            div.addEventListener('click', function() {
                this.parentNode.removeChild(this);
            }, false);
            document.body.insertBefore(div, document.body.firstChild);
        }

        //微博
        exp.weibo = (exp.ua.match(/weibo/i)) ? 1 : 0;
        exp.weibo && (location.href = 'http://v.t.sina.com.cn/share/share.php?appkey=1392673069&url=' + encodeURIComponent(shareWX.link) + '&title=' + encodeURIComponent(shareWX.title + shareWX.desc) + '&content=utf-8' + '&pic=' + encodeURIComponent(shareWX.img_url));

        //腾讯
        exp.tengxun = (exp.ua.match(/tencentmicroblog/i)) ? 1 : 0;
        exp.tengxun && (location.href = 'http://share.v.t.qq.com/index.php?c=share&a=index&source=1000013&url=' + encodeURIComponent(shareWX.link) + '&title=' + encodeURIComponent(shareWX.title + shareWX.desc) + '&content=utf-8' + '&pic=' + encodeURIComponent(shareWX.img_url));

    };

    exp.dpShareInit = function(DPApp) {

        var dpUa = DPApp.getUA();
        //点评右上角分享
        DPApp.initShare && DPApp.initShare({
            title: shareWX.title,
            desc: shareWX.desc,
            content: shareWX.content, // 7.1.0 支持
            image: shareWX.img_url,
            url: shareWX.link,
            success: function() {
                exp.initShareCallback && exp.initShareCallback();
            },
            fail: function() {
                exp.initShareFail && exp.initShareFail();
            }
        });

    };

    exp.loadScript = function(option) {

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function() {
            if (!exp.readyState || exp.readyState == 'loaded' || exp.readyState == 'complete') {
                script.onload = script.onreadystatechange = function() {};
                option.cb && option.cb();
            }
        };
        script.src = option.src;
        document.getElementsByTagName('head')[0].appendChild(script);

    };

    exp.autoListenWx = function() {

        if (window.WeixinJSBridge) {
            WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                WeixinJSBridge.invoke('sendAppMessage', shareWX, function(res) {
                    exp.initShareCallback && exp.initShareCallback();
                });
            });
            WeixinJSBridge.on('menu:share:timeline', function(argv) {
                WeixinJSBridge.invoke('shareTimeline', shareWXTL, function(res) {
                    exp.initShareCallback && exp.initShareCallback();
                });
            });
        } else {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                    WeixinJSBridge.invoke('sendAppMessage', shareWX, function(res) {
                        exp.initShareCallback && exp.initShareCallback();
                    });
                });
                WeixinJSBridge.on('menu:share:timeline', function(argv) {
                    WeixinJSBridge.invoke('shareTimeline', shareWXTL, function(res) {
                        exp.initShareCallback && exp.initShareCallback();
                    });
                });
            }, false);
        }

    };

    exp.hrefDelete = function(url) {
        var a, search, i, qs = '',
            k, split, href = {};
        a = document.createElement('a');
        a.href = url;
        search = a.search.slice(1).split('&');
        for (i = 0; i < search.length; i += 1) {
            split = search[i].split('=');
            if (split.length === 2) {
                href[split[0]] = split[1]
            }
        }
        (url.indexOf('token') > -1) && delete href.token;
        (url.indexOf('version') > -1) && delete href.version;
        for (k in href) {
            if (href.hasOwnProperty(k)) {
                qs += k + '=' + href[k] + '&';
            }
        }
        qs = qs.slice(0, -1);
        return qs.length === 0 ? (a.origin + a.pathname) + '?notdp=1' : (a.origin + a.pathname + '?' + qs + '&notdp=1')
    };

})(DpShare);
