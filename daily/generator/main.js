/*
 * @Author: haoyang.li
 * @Date:   2015-07-10 18:14:12
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-07-10 18:15:35
 */

'use strict';
function* next_id() {
    var current_id = 0;
    while (true)
        yield ++current_id;
}
// 测试:
var x,
    pass = true,
    g = next_id();
for (x = 1; x < 100; x++) {
    if (g.next().value !== x) {
        pass = false;
        alert('测试失败!');
        break;
    }
}
if (pass) {
    alert('测试通过!');
}