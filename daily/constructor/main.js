/*
 * @Author: haoyang.li
 * @Date:   2015-07-16 15:39:44
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-07-16 15:47:11
 */

'use strict';

function Cat(name) {
    this.name = name;
}

Cat.prototype.say = function() {
    return 'Hello, ' + this.name + '!';
};


var kitty = new Cat('Kitty');
var doraemon = new Cat('哆啦A梦');
console.log(kitty.say());
if (kitty && kitty.name === 'Kitty' && kitty.say && typeof kitty.say === 'function' && kitty.say() === 'Hello, Kitty!' && kitty.say === doraemon.say) {
    console.log('测试通过!');
} else {
    console.log('测试失败!');
}