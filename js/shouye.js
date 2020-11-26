/**
 * 点击待办事件打开相应窗口
 */
function onDaibanClick(){
	$("#daibanul").find("li").bind('tap',function(){
		var code = $(this).attr('code');
		var htmlPath;
		var params = {};
		if(code=='001'){
			params['itemType'] = 'sy';
			params['stutas'] = 'init';
			htmlPath = 'dpeiye.html';
		}else if(code=='002'){
			params['itemType'] = 'sy';
			params['stutas'] = 'hd';
			htmlPath = 'dpeiye.html';
		}else if(code=='003'){
			params['itemType'] = 'sy';
			params['stutas'] = 'zx';
			htmlPath = 'dpeiye.html';
		}else if(code=='004'){
			params['itemType'] = 'sy';
			params['stutas'] = 'wc';
			htmlPath = 'dpeiye.html';
		}else if(code=='007'){
			htmlPath = 'patientList.html';
			params['qfflag'] = 1;
		}else if(code=='012'){
			htmlPath = 'fpbed.html';
		}else if(code=='010'){
			htmlPath = 'ops.html';
		}else if(code=='005'){
			params['itemType'] = 'kf';
			params['stutas'] = 'init';
			htmlPath = 'dpeiye.html';
		}else if(code=='006'){
			params['itemType'] = 'zs';
			params['stutas'] = 'init';
			htmlPath = 'dpeiye.html';
		}else if(code=='008'){
			params['itemType'] = 'ps';
			params['stutas'] = 'init';
			htmlPath = 'dpeiye.html';
		}else if(code=='009'){
			params['itemType'] = 'wh';
			params['stutas'] = 'init';
			htmlPath = 'dpeiye.html';
		}else if(code=='014'){
			params['itemType'] = 'jy';
			params['stutas'] = 'init';
			htmlPath = 'bbcj.html';
		}else if(code=='101'){
			htmlPath = 'pyWindow.html';
		}else if(code=='015'){
			htmlPath = 'patientList.html';
		}else if(code=='016'){
			htmlPath = 'advinceQuery.html';
		}else if(code=='017'){
			htmlPath = 'noteQuery.html';
		}else if(code=='018'){
			htmlPath = 'workQuery.html';
		}
		
		if(htmlPath){
			mui.openWindow({
				id:'daiban'+code,
				url:htmlPath,
				extras:params
			});
		}
	});
}

//找出数组元素下标
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
//删除指定元素
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
function paramDate(){
	var param = {};
	var serverip = localStorage.getItem("serverip");
	var hasArea = localStorage.getItem("hasArea");
	param['hasArea']  = hasArea;
	if(hasArea==1){
		param['areaid'] = localStorage.getItem("areaid");
	}else{
		param['deptid'] = localStorage.getItem("deptid");
	}
	var hasSetDept = localStorage.getItem("hasSetDept");
	if(hasSetDept == 1){
		param['hasSetDept'] = 1;
		param['deptid'] = localStorage.getItem("deptid");
	}else{
		param['hasSetDept'] = 0;
	}
	return param;
}
var serverip = localStorage.getItem("serverip");

function loadDaiban(){
	var islogin = localStorage.getItem("islogin");
	if(islogin!='1'){
		return;
	}
	if(!serverip){
		return;
	}
	DaibanSyInit();
	DaibanSyHd();
	DaibanSyWc();
	DaibanKf();
	DaibanZs();
	DaibanPs();
	DaibanWh();
	DaibanSssq()
	DaibanQfrs();
	DaibanFc();
	DaibanBbcj();
}

function DaibanSyInit(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanSyInit.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
        	var num='001';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanSyHd(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanSyHd.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='002';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanSyWc(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanSyWc.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='004';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanKf(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanKf.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='005';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanZs(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanZs.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='006';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanPs(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanPs.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='008';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanWh(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanWh.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='009';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanSssq(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanSssq.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='010';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanQfrs(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanQfrs.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='007';
			var count = data[num];
			loadCount(count,num);
        }
	});
}
function DaibanFc(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanFc.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
			var num='012';
			var count = data[num];
			loadCount(count,num);
        }
	});
}

function DaibanBbcj(){
	var param = paramDate();
	mui.ajax('http://'+serverip+'/deskNurse/app/getDaibanBbcj.do',{
		type: 'POST',
        data: param,
        dataType: "json",
        success: function(data){
        	var num='014';
			var count = data[num];
			loadCount(count,num);
        }
	});
}

function loadCount(count,num){
	var html;
	if(count>0&&count<100){
		html = '<span class="mui-badge numborder">'+count+'</span>';
	}

	if(count>=100){
		html = '<span class="mui-badge numborder" style="width:2rem;">'+count+'</span>';
	}

	$("#daibanul").find("li[code='"+num+"']").children().children().first().html(html);

	if(count==0){
		$("#daibanul").find("li[code='"+num+"']").children().children().first().empty();
	}
}
