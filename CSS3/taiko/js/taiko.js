/*
 * @Author: haoyang.li
 * @Date:   2015-12-22 00:00:04
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-12-24 16:26:10
 */

var BINGOFOOD;
var foodList = '';
var FoodCount = 25;
var _randomNum;
var _randomFoodType;
var FoodContainsWidth = -parseInt($('.food-contains').css('width'), 10);
var PerFoodWidth = -FoodContainsWidth * 0.04;
var MinDistance = parseInt($('.shiny')[0].getBoundingClientRect().left, 10) - 20;
var MaxDistance = parseInt($('.shiny')[0].getBoundingClientRect().left, 10) + parseInt($('.shiny').css('width'), 10);

for (var i = 0; i < FoodCount; i++) {
    _randomNum = parseInt(Math.random() * 12 + 1, 10);

    if (0 < _randomNum && 4 >= _randomNum) {
        _randomFoodType = 1;
    } else if (4 < _randomNum && 8 >= _randomNum) {
        _randomFoodType = 2;
    } else {
        _randomFoodType = 3;
    }
    foodList += '<img src="css/img/food/' + _randomNum + '.png" data-type="' + _randomFoodType + '">';
}
$('.food-contains').html(foodList);

var $foodImgs = $('.food-contains img');

var plusScore = function () {
    console.log(1);
};

var minusScore = function () {
    console.log(222);
};

$('.js-touch-btn').on('touchstart', function () {
    var $this = $(this);
    $this.css('opacity', '1');
    var foodIndex = parseInt((parseInt($('.food-contains')[0].getBoundingClientRect().left, 10) - FoodContainsWidth) / PerFoodWidth, 10);
    var e = $foodImgs[FoodCount - foodIndex + 1];
    if (e === undefined) {
        minusScore();
        return;
    }
    if (MinDistance <= e.getBoundingClientRect().left && MaxDistance >= e.getBoundingClientRect().left) {
        var _foodType = parseInt(e.getAttribute('data-type'), 10);
        if (~e.className.indexOf('foodhide')) {

        } else {
            e.className += ' foodhide';
            if (_foodType == $(this).data('foodtype')) {
                plusScore();
            } else {
                minusScore();
            }
        }
    } else {
        minusScore();
    }
});

var oo = 30;
var timeOut = setInterval(function() {
    oo--;
    if (oo === 10) {
        $('.js-shiny').removeClass('shiny');
        $('.js-shiny').addClass('shiny-crazy');
        clearInterval(timeOut);
    }
}, 999);






$('.js-touch-btn').on('touchend', function () {
    $(this).css('opacity', '0');
});