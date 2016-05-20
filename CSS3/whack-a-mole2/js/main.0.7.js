/* resLoader */
(function (t, o) {
    if (typeof define === "function" && define.amd) {
        define(o)
    } else if (typeof exports === "object") {
        module.exports = o()
    } else {
        t.resLoader = o(t)
    }
})(this, function () {
    var t = function (t) {
        return typeof t === "function"
    };

    function o(t) {
        this.option = {
            resourceType: "image",
            baseUrl: "./",
            resources: [],
            onStart: null,
            onProgress: null,
            onComplete: null
        };
        if (t) {
            for (i in t) {
                this.option[i] = t[i]
            }
        } else {
            alert("参数错误！");
            return
        }
        this.status = 0;
        this.total = this.option.resources.length || 0;
        this.currentIndex = 0
    }

    o.prototype.start = function () {
        this.status = 1;
        var o = this;
        var e = this.option.baseUrl;
        for (var i = 0, n = this.option.resources.length; i < n; i++) {
            var s = this.option.resources[i], r = "";
            if (s.indexOf("http://") === 0 || s.indexOf("https://") === 0) {
                r = s
            } else {
                r = e + s
            }
            var a = new Image;
            a.onload = function () {
                o.loaded()
            };
            a.onerror = function () {
                o.loaded()
            };
            a.src = r
        }
        if (t(this.option.onStart)) {
            this.option.onStart(this.total)
        }
    };
    o.prototype.loaded = function () {
        if (t(this.option.onProgress)) {
            this.option.onProgress(++this.currentIndex, this.total)
        }
        if (this.currentIndex === this.total) {
            if (t(this.option.onComplete)) {
                this.option.onComplete(this.total)
            }
        }
    };
    return o
});

function setCookie(c_name, value, expiredays, domain) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ";path=/" +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

var cityId,
    activityCode = '',
    prizePackage = '',
    activityId = 3196,
    localUrl,
    onlineUrl;


var shareTitle = '我在真果粒年趣福利大派送游戏中抢到年趣福利，你也来试试看嘛~',
    shareDesc = '',
    link = onlineUrl + '/1activities/3196/index.html';


function appendShow(ele, html) {
    !$(ele).length ? $('body').append(html) : $(ele).show();
}

var coverHTML = '<section class="cover rule-cover"></section>';

$('.J-rule').on('click', function () {
    var ruleHTML = '<section class="rule-wrap J-rule-close">' +
        '<div class="rule">' +
        '<img src="image/r1.png">' +
        '<img src="image/r2.png">' +
        '</div>' +
        '</section>';
    appendShow('.rule-wrap', ruleHTML);
    appendShow('.rule-cover', coverHTML);
});

var flag = true;
$('.J-play').on('tap', function () {
    $('#video').addClass('opacity');
    $('#video')[0].play();
    flag = false;
    $('.index').addClass('stop-swiping');
})

$('#video').on('ended', function () {
    $('#video').removeClass('opacity');
    flag = true;
    $('.index').removeClass('stop-swiping');
})

$('body').on('click', '.J-rule-close', function () {
    $('.rule-wrap, .rule-cover').hide();
    Stts.special('关闭规则');
})

$('body').on('click', '.J-start', function () {
    Stts.special('开始游戏');
    window.location = 'game.html';
})

$('body').on('click', '.J-share', function () {
    var shareHTML = '<section class="cover share-cover"></section>';
    appendShow('.share-cover', shareHTML);
    Stts.special('请求外援');
})

$('body').on('click', '.J-prize', function () {
    drawLottery(prizePackage);
    Stts.special('抽取礼券');
})

$('body').on('click', '.share-cover', function () {
    $(this).hide();
})

$('body').on('click', '.J-bag', function () {
});

if (getQueryStringByName('win')) {
    var yesHTML = '<div class="yes">' +
        '<div class="man"></div>' +
        '<div class="f-t1"></div>' +
        '<span class="line1"></span>' +
        '<span class="line2"></span>' +
        '<div class="s1"></div>' +
        '<div class="s2"></div>' +
        '<span class="bag"></span>' +
        '<span class="J-prize prize-btn"></span>' +
        '</div>';
    $('.branch').html(yesHTML);
} else {
    var noHTML = '<div class="no">' +
        '<div class="woman">' +
        '<div>' +
        '<span></span>' +
        '</div>' +
        '</div>' +
        '<div class="f-t2"></div>' +
        '<div class="n-btn-group">' +
        '<p class="J-start"></p>' +
        '<p class="J-share"></p>' +
        '</div>' +
        '</div>';
    $('.branch').html(noHTML);
}

function envelop() {
    $('.branch').remove();
    $('.prize-wrap').html(
        '<section class="prize-pop">' +
        '<span class="p-t"></span>' +
        '<div class="p-envelop">' +
        '<div class="bg-color"></div>' +
        '<div class="p-page">' +
        '<span class="p-font"></span>' +
        '<img src="image/p-page.png" alt=""/>' +
        '</div>' +
        '<img class="envelop-cover" src="image/p-envelop.png" alt=""/>' +
        '</div>' +
        '<div class="y-btn-group">' +
        '</div>' +
        '</section>'
    );
}