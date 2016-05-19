/*
 * @Author: haoyang.li
 * @Date:   2015-04-22 15:45:42
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-12-20 21:17:05
 */
if (~navigator.userAgent.toLowerCase().indexOf('dianping')) {
    var getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r !== null)
            return unescape(r[2]);
        return null;
    };
    $.ajax({
        dataType: 'jsonp',
        url: 'http://event.dianping.com/activities/common/checkToken',
        data: {
            token: getQueryString('token')
        },
        success: function (data) {}
    });
}
function prize(activityCode, prizePackageOne, cxString) {
    $.ajax({
        dataType: 'jsonp',
        url: locOrigin + '/emidas/lottery/siteweb/ajax/drawLottery?activity=' + activityCode + '&prizePackage=' + prizePackageOne + '&cxString=' + cxString + '&hint=true&date=' + new Date().getTime(),
        // url: '/150129oldnavy/drawPrize',
        success: function (data) {
            // var data = JSON.parse(data);
            var code = data.code;
            switch (code) {
                case 200:
                    //中奖
                    var prizeName = data.msg.prize.prizeName,
                        prizeDetail = data.msg.prize.prizeDetail,
                        winningRecordId = data.msg.prize.winningRecordId,
                        isItemPrize = data.msg.prize.itemPrize;
                    if (isItemPrize) {
                        $.pop.prizeAlert({
                            icon: 'smile',
                            prizeName: prizeName,
                            subtitle: prizeDetail,
                            btnFn: function (pop) {
                                pop.fadeOut(100);
                                physical(winningRecordId);
                            }
                        });
                    } else {
                        //非实物奖
                        $.pop.prizeVirtual({
                            icon: 'smile',
                            prizeName: prizeName,
                            subtitle: prizeDetail,
                            subNameOne: '确定',
                            subDowFn: function (thisPop) {
                                thisPop.fadeOut(100);
                            }
                        });
                    }
                    break;
                case 202:
                    // 未中奖
                    var leftChance = data.msg.leftChance;
                    $.pop.popAlert({
                        tips: '<span style="color:#666">很抱歉未中奖</span>',
                        // subtitle: '<span style="color:#ff8400">邀请好朋友们一起赢取点评团购抵用券等好礼吧，赶快行动！</span>',
                        subName: '确定',
                        btnFn: function (thisPop) {
                            thisPop.fadeOut(100);
                        }
                    });
                    break;
                case 201:
                    //绑定手机号
                    $.pop.popAlert({
                        icon: 'smile',
                        towBtn: true,
                        tips: '您未绑定手机哦～',
                        subtitle: '赶快去绑定手机～',
                        subNameOne: '暂不验证',
                        subDowFn: function (thisPop) {
                            hint = false;
                            thisPop.fadeOut(100);
                        },
                        subName: '立即验证',
                        btnFn: function (thisPop) {
                            thisPop.fadeOut(100);
                            smsVerify(activityCode, prizePackageOne);
                        }
                    });
                    break;
                case 203:
                    //没有机会了
                    $.pop.popAlert({
                        icon: 'smile',
                        tips: '抽奖次数用完啦~'
                    });
                    break;
                case 204:
                    //活动未开始
                    $.pop.popAlert({
                        icon: 'smile',
                        tips: '活动未在有效期内'
                    });
                    break;
                case 401:
                    $.pop.popAlert({
                        tips: '参数错误啦',
                        subtitle: '重新试一次吧'
                    });
                    break;
                case 402:
                    //登陆
                    //登陆的弹窗
                    $.pop.popAlert({
                        towBtn: true,
                        tips: "需要先登录啦！",
                        icon: "smile",
                        subName: "立即登陆",
                        subDowFn: function (thisPop) {
                            thisPop.fadeOut(100);
                            $('#cdKey').val('');
                        },
                        btnFn: function (thisPop) {
                            thisPop.fadeOut(100, function () {
                                var ua = navigator.userAgent.toLowerCase(),
                                    href = window.location.href;
                                if (ua.match(/MicroMessenger/i)) {
                                    window.location.href = 'http://m.' + location.host.split('.').slice(1, 3).join('.') + '/login?redir=' + encodeURIComponent(href);
                                } else if (ua.match('dianping')) {
                                    if (href.indexOf("?") > 0) {
                                        if (href.indexOf("token=") > 0) {
                                            window.location.href = href.replace(/token=([^&]*)(&|$)/, function (a) {
                                                if (/&$/.test(a)) {
                                                    return 'token=!&';
                                                } else {
                                                    return 'token=!';
                                                }
                                            });
                                        } else {
                                            window.location.href = href + '&token=!';
                                        }
                                    } else {
                                        window.location.href = href + '?token=!';
                                    }
                                } else {
                                    window.location.href = 'http://m.' + location.host.split('.').slice(1, 3).join('.') + '/login?redir=' + encodeURIComponent(href);
                                }
                            });
                        }
                    });
                    break;
                case 403:
                    $.pop.popAlert({
                        tips: '您没有操作权限哦～',
                        alertTitle: '错误信息'
                    });
                    break;
                case 500:
                    $.pop.popAlert({
                        icon: 'smile',
                        tips: '服务器错误',
                        subtitle: '请稍后重试'
                    });
                    break;
                default:
                    $.pop.popAlert({
                        icon: 'smile',
                        tips: "系统打了个盹儿~",
                        subtitle: '请稍后重试'
                    });
            }
        },
        error: function () {
            $.pop.popAlert({
                icon: 'smile',
                tips: "系统打了个盹儿~",
                subtitle: '请稍后重试'
            });
        }
    });
}
//实物中奖信息
function physical(winningRecordId) {
    $.pop.verifyInput({
        verify: false,
        subName: '提交',
        winFn: function (winName, winPhone, winAddress, _thisPop) {
            $.ajax({
                dataType: 'jsonp',
                url: locOrigin + '/emidas/lottery/siteweb/ajax/recordContact',
                data: {
                    winningRecordId: winningRecordId,
                    name: winName,
                    address: winAddress,
                    phoneNo: winPhone,
                    date: new Date().getTime()
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.pop.popAlert({
                            icon: 'smile',
                            tips: '发送成功',
                            subtitle: '奖品将在活动结束后5个工作日寄出！',
                            btnFn: function (pop) {
                                pop.fadeOut(100, function () {
                                    $.pop.inputDown(_thisPop);
                                });
                            }
                        });
                    } else {
                        $.pop.popAlert({
                            tips: '发送失败',
                            subtitle: '重新试一下吧！'
                        });
                    }
                }
            });
        }
    });
}