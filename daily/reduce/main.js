/*
 * @Author: haoyang.li
 * @Date:   2015-07-06 11:48:28
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-07-06 14:16:10
 */

'use strict';
/**
 * [字符串转数字]
 */
var stringToNumber = function (s) {
    return s.split('')
        .map(function (x) {
            return x.charCodeAt(0) - '0'.charCodeAt(0);
        })
        .reduce(function (x, y) {
            return x * 10 + y;
        });
};

/**
 * [首字母大写，其余小写]
 */
var normalize = function (arr) {
    return arr.map(function (e) {
        return (e[0].toUpperCase() + e.toLowerCase().substring(1));
    });
};
/**
 * 过滤素数
 */
function get_primes(arr) {
    return arr.filter(function (x) {
        var k = Math.sqrt(x);
        if (k == 1) {
            return false;
        }
        for (var i = 2; i <= k; i++) {
            if (x % i === 0) {
                return false;
            }
        }
        return true;
    });
}