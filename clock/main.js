/**
 * [Clock]
 * @param  clockDiv [传入的div对象]
 */
function Clock(clockDiv){
	this.clockDiv = clockDiv;
	this.getCurrentDate = function(){
		//获取当前日期
		var currDate = new Date();
		//分别获取 年、月、日、时、分、秒
		var currDateTime = currDate.getYear();
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