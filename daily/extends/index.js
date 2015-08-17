/*
* @Author: haoyang.li
* @Date:   2015-08-04 19:54:13
* @Last Modified by:   haoyang.li
* @Last Modified time: 2015-08-05 14:24:04
*/

'use strict';

function extend(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
};

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
extend(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};
var pop = new PrimaryStudent();
console.log(pop.name());