/* 
 * @Author: haoyang.li
 * @Date:   2015-03-04 14:26:27
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-03-04 17:16:40
 */
//转动动画
function round() {
    $('.second')[0].style.transition = "600000s linear";
    $('.second')[0].style.transform = "rotate(3600000deg)";

    $('.minute')[0].style.transition = "360000s linear";
    $('.minute')[0].style.transform = "rotate(36000deg)";

    $('.hour')[0].style.transition = "216000s linear";
    $('.hour')[0].style.transform = "rotate(360deg)";
}

function startClock() {
    var angle = 360 / 60,
        date = new Date(),
        hour = date.getHours() % 12,
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourAngle = (360 / 12) * hour + (360 / (12 * 60)) * minute;

    $('.minute')[0].style.transform = 'rotate(' + angle * minute + 'deg)';
    $('.second')[0].style.transform = 'rotate(' + angle * second + 'deg)';
    $('.hour')[0].style.transform = 'rotate(' + hourAngle + 'deg)';
    setTimeout("round()", 1);
}
startClock();
setTimeout("startClock()", 60000);

//电子表
function Clock(clockDiv) {
    this.clockDiv = clockDiv;
    this.getCurrentDate = function() {
        //获取当前日期
        var currDate = new Date();
        //分别获取 年、月、日、时、分、秒
        var currDateTime = currDate.getFullYear();
        //getYear();在chrome和IE9以上的版本输出的是距离1900多少年而非实际年数
        //改为用getFullYear();

        currDateTime += "-";
        currDateTime += (currDate.getMonth() + 1);
        currDateTime += "-";
        currDateTime += currDate.getDate();
        currDateTime += " ";
        currDateTime += currDate.getHours();
        currDateTime += ":";
        currDateTime += currDate.getMinutes();
        currDateTime += ":";
        currDateTime += currDate.getSeconds();
        //将当前时间赋值到div对象中
        this.clockDiv.innerHTML = currDateTime;
    };
}
var clockDiv = document.getElementById("clock");
var clickObj = new Clock(clockDiv);
window.setInterval("clickObj.getCurrentDate()", 1000);