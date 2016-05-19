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
    activityCode = '77A034B0877172DA',
    prizePackage = '484A7E55C8E294B2',
    activityId = 3196,
    localUrl,
    onlineUrl;

/* 判断 url */
if (location.hostname.indexOf('dianping') > -1) {
    localUrl = 'http://event.dianping.com';
    onlineUrl = 'http://evt.dianping.com/midas';
} else {
    localUrl = 'http://event.51ping.com';
    onlineUrl = 'http://event.51ping.com/market';
}

//定位
evt_whereami(
    function (res) {
        //成功回调, res.lat, res.lng 获取经纬度
        longitude = res.lng;
        latitude = res.lat;
        cityId = res.city.cityid;
        cityName = res.city.cityname;

        //拿到城市后打点（注意大小写）
        Stts.init({
            activityId: activityId,
            cityid: cityId
        });
    }, function () {

        //失败回调，失败时打点城市可记为0，以做区分
        Stts.init({
            activityId: activityId,
            cityid: 0
        });
    }
);

var shareTitle = '我在真果粒年趣福利大派送游戏中抢到年趣福利，你也来试试看嘛~',
    shareDesc = '',
    link = onlineUrl + '/1activities/3196/index.html';

//默认点评右上角分享
DpShare({
    title: shareTitle,
    desc: shareDesc,
    img_url: 'http://evt.dianping.com/midas/wx-logo/3196.jpg', //需放在CDN上
    link: link,
    feed: 'WECHAT_FRIENDS,WECHAT_TIMELINE,WEIBO,QQ,QZONE,SMS,EMAIL,COPY',
    initShareCallback: function () {
        var shareStatus = 'success';
    },
    initShareFail: function () {
        var shareStatus = 'failed';
    },
    getCXCallback: function (e) {
        window.J_cxString = e.cx;
    }
});

var is = true;
function drawLottery(prizePackageOne) {
    //登陆成功后执行方法
    if (is) {
        is = false;
        $.ajax({
            //url: 'json/emidas/lottery/siteweb/ajax/drawLottery',
            url: localUrl + '/emidas/lottery/siteweb/ajax/drawLottery',
            dataType: 'jsonp',
            data: {
                activity: activityCode,
                prizePackage: prizePackageOne,
                cxString: window.J_cxString,
                hint: true,
                cityId: cityId ? cityId : 0,
                origin: Stts.source
            },
            success: function (data) {
                if (typeof data == 'string') data = JSON.parse(data);
                result = data;
                switch (result.code) {
                    case 200:
                        envelop();
                        //中奖
                        isItemPrize = data.msg.prize.itemPrize; //实物奖
                        picUrl = data.msg.prize.picUrl;
                        prizeDetail = data.msg.prize.prizeDetail;
                        winningRecordId = data.msg.prize.winningRecordId;
                        prizeName = data.msg.prize.prizeName;
                        prizeCode = result.code;
                        prizeId = data.msg.prize.prizeId;
                        switch (prizeId) {
                            case 5844:
                                $('.p-font').addClass('p5');
                                break;
                            case 5843:
                                $('.p-font').addClass('p10');
                                break;
                            case 5842:
                                $('.p-font').addClass('p30');
                                break;
                            case 5841:
                                $('.p-font').addClass('p50');
                                break;
                            case 5840:
                                $('.p-font').addClass('p100');
                                break;
                        }
                        $('.p-t').addClass('pt1');
                        $('.y-btn-group').html('<p class="look J-bag"></p>');
                        break;
                    case 202:
                        envelop();
                        //未中奖
                        $('.p-t').addClass('pt2');
                        $('.p-font').addClass('np');
                        $('.y-btn-group').html('<p class="again J-start"></p><p class="share J-share"></p>');
                        break;
                    case 203:
                        //没有机会了
                        $.pop.popAlert({
                            tips: '没有机会了',
                            subtitle: '明天再来哦',
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            }
                        });
                        break;
                    case 201:
                        //绑定手机号
                        $.pop.popAlert({
                            tips: '您未绑定手机哦～',
                            subtitle: '赶快去绑定手机～',
                            subNameOne: '暂不验证',
                            towBtn: true,
                            subDowFn: function (thisPop) {
                                hint = false;
                                thisPop.fadeOut(100);
                            },
                            subName: '立即验证',
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100, function () {
                                    smsVerify(activityCode, prizePackageOne);
                                });
                            }
                        });
                        break;
                    case 204:
                        //活动未开始
                        $.pop.popAlert({
                            tips: '活动已关闭！',
                            subtitle: '尽情期待其它更多的活动哦！',
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            }
                        });
                        break;
                    case 401:
                        $.pop.popAlert({
                            tips: '参数错误啦',
                            subtitle: '请重试！',
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            }
                        });
                        break;
                    case 402:
                        //登陆
                        $.pop.popAlert({
                            towBtn: true,
                            tips: "需要先登录啦！",
                            subtitle: "快点喔，等你抽奖",
                            icon: "smile",
                            subName: "立即登陆",
                            subDowFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            },
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100);
                                window.location.href = 'http://m.' + location.host.split('.').slice(1, 3).join('.') + '/login?redir=' + encodeURIComponent(window.location.href);
                            }
                        });
                        break;
                    case 403:
                        $.pop.popAlert({
                            tips: '您没有操作权限哦～',
                            alertTitle: '错误信息',
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            }
                        });
                        break;
                    case 500:
                        $.pop.popAlert({
                            tips: '服务器错误',
                            subtitle: '请稍后重试',
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            }
                        });
                        break;
                    default:
                        $.pop.popAlert({
                            tips: '系统打了个盹~',
                            subtitle: '请稍后重试！',
                            btnFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            }
                        });
                }
                is = true;
            }
        });
    }
}

//验证手机号
function smsVerify(activityCode, prizePackageOne) {
    $.pop.verifyInput({
        verify: true,
        verifyFn: function (mobileNoVal) {
            $.ajax({
                url: localUrl + '/emidas/lottery/siteweb/ajax/sendVerifyCode',
                dataType: 'jsonp',
                data: {
                    mobileNo: mobileNoVal,
                    date: new Date().getTime()
                },
                success: function (mobileData) {
                    switch (mobileData.code) {
                        case 200:
                            $.pop.popAlert({
                                icon: 'smile',
                                tips: '发送成功！',
                                subtitle: '收到信息后请填写验证码哟～'
                            });
                            break;
                        case 205:
                            $.pop.popAlert({
                                tips: '参数错误',
                                subtitle: '重新试一次吧'
                            });
                            break;
                        case 206:
                            $.pop.popAlert({
                                tips: '发送验证码太快啦',
                                subtitle: '休息一下再发送～'
                            });
                            break;
                        case 207:
                            $.pop.popAlert({
                                tips: '验证码请求太频繁啦～',
                                subtitle: '休息一下再发送～'
                            });
                            break;
                        default:
                            $.pop.popAlert({
                                tips: '发送失败～',
                                subtitle: '重新发送一下吧～'
                            });
                            break;
                    }
                },
                error: function () {
                    $.pop.popAlert({
                        icon: 'smile',
                        tips: "系统打了个盹儿~",
                        subtitle: '请稍后重试'
                    });
                }
            })
        },
        verifyOkFn: function (verifyPhone, verifyCode, thisPop) {
            $.ajax({
                url: localUrl + '/emidas/lottery/siteweb/ajax/verifyMobile',
                dataType: 'jsonp',
                data: {
                    activity: activityCode,
                    prizePackage: prizePackageOne,
                    mobileNo: verifyPhone,
                    verifyCode: verifyCode,
                    date: new Date().getTime()
                },
                success: function (verifyData) {
                    if (typeof data == "string") {
                        data = eval("(" + data + ")");
                    }
                    switch (verifyData.code) {
                        case 200:
                            $.pop.inputDown(thisPop);
                            $.pop.popAlert({
                                tips: '恭喜您，绑定成功！',
                                icon: 'smile'
                            });
                            break;
                        case 209:
                            $.pop.popAlert({
                                tips: '验证码校验失败'
                            });
                            break;
                        case 210:
                            $.pop.popAlert({
                                tips: '验证码不匹配'
                            });
                            break;
                        case 211:
                            $.pop.popAlert({
                                tips: '验证码已过期'
                            });
                            break;
                        case 401:
                            $.pop.popAlert({
                                tips: '参数错误',
                                subtitle: '重新试一次吧'
                            });
                            break;
                    }
                },
                error: function () {
                    $.pop.popAlert({
                        icon: 'smile',
                        tips: "系统打了个盹儿~",
                        subtitle: '请稍后重试'
                    });
                }
            })
        }
    })
}

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
    Stts.special('查看礼券');
    window.location = 'dianping://web?url=http%3A%2F%2Fh5.dianping.com%2Ftuan%2Fnewwallet%2Findex.html%3Futm_source%3D__3npp&utm_=__3npp';
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