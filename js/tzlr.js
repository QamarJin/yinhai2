//绑定事件选择事件
function bindTzlrEvent(){
	$('#btnSaveTz').on('tap',function(){
		saveSign();
	});
	$('.mui-input-clear').on('change',function(){
		if($(this).val()){
			$('#wcyyPicker').html('');
		}
	});
	
	$('#prevTime').on('tap',function(){
		if(timeCount>0){
			$("#lrTime").html("录入时间："+timeArray[timeCount-1]+"点");
			timeCount--;
		}else{
			$("#lrTime").html("录入时间："+timeArray[timeArray.length-1]+"点");
			timeCount = timeArray.length-1;
		}
		selectPatient(yzPatientid);
	});
	
	$('#nextTime').on('tap',function(){
		if(timeCount<timeArray.length-1){
			$("#lrTime").html("录入时间："+timeArray[timeCount+1]+"点");
			timeCount++;
		}else{
			$("#lrTime").html("录入时间："+timeArray[0]+"点");
			timeCount=0;
		}
		selectPatient(yzPatientid);
	});
	
	$('#wcyyClear').on('tap',function(){
		$("#wcyyPicker").html('');
	});
	
	$('#zyClear').on('tap',function(){
		$("#zyPicker").html('');
	});
}
//初始化下拉框
function initPicker(){
	(function($$, doc,$) {
		$$.init({
			gestureConfig:{
			   tap: true, //默认为true
			   doubletap: false, //默认为false
			   longtap: false, //默认为false
			   swipe: true, //默认为true
			   drag: false, //默认为true
			   hold:false,//默认为false，不监听
			   release:false//默认为false，不监听
			}
			
		});
		$$.ready(function() {
			//未测原因选择
			var wcyypopPicker = new $$.PopPicker();
			wcyypopPicker.setData(wcyyData);
			var wcyyPicker = doc.getElementById('wcyyPicker');
			wcyyPicker.addEventListener('tap', function(event) {
				wcyypopPicker.show(function(items) {
					wcyyPicker.innerHTML = items[0].text;
					$('.mui-input-clear').val('');
				});
			}, false);
			
			//摘要选择
			var zypopPicker = new $$.PopPicker();
			zypopPicker.setData(zhaiyaoData);
			var zyPicker = doc.getElementById('zyPicker');
			zyPicker.addEventListener('tap', function(event) {
				zypopPicker.show(function(items) {
					zyPicker.innerHTML = items[0].text;
				});
			}, false);
			
			//绑定滑动事件
			var timeCard = doc.getElementById('time-card');
			timeCard.addEventListener('swipeleft', function(event) {
				if(timeCount<timeArray.length-1){
					$("#lrTime").html("录入时间："+timeArray[timeCount+1]+"点");
					timeCount++;
				}else{
					$("#lrTime").html("录入时间："+timeArray[0]+"点");
					timeCount=0;
				}
				selectPatient(yzPatientid);
			});
			
			timeCard.addEventListener('swiperight', function(event) {
				if(timeCount>0){
					$("#lrTime").html("录入时间："+timeArray[timeCount-1]+"点");
					timeCount--;
				}else{
					$("#lrTime").html("录入时间："+timeArray[timeArray.length-1]+"点");
					timeCount = timeArray.length-1;
				}
				selectPatient(yzPatientid);
			});
		});
	})(mui, document,Zepto);
}

var timeArray = [];
var timeCount = 0;
//体征录入按照默当前时间设置默认选中
function initTzlr(){
	var serverip = localStorage.getItem("serverip");
	
	var param = {};
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
	
	$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/getNowHours.do',
        data: param,
        dataType: "json",
        success: function(data){
        	var hours = data.hours;
	    	for(var i=0;i<hours.length;i++){
	    		timeArray.push(hours[i].hour);
	    		var hour = parseFloat(data.hour);
	    		if((parseFloat(hours[i].hour)-hour<=2&&parseFloat(hours[i].hour)-hour>0)||
	    			(hour-parseFloat(hours[i].hour)<=2&&hour-parseFloat(hours[i].hour)>0)){
	    			timeCount = i;
	    			$("#lrTime").html("录入时间："+hours[i].hour+"点");
	    		}
	    	}
	    	
        }
    });
}

//保存体征录入
function saveSign(){
	if(tzlrFlag==0){
		mui.toast('请扫描或者选择一个病人');
		return;
	}

	var tw = $("#twValue").val();//体温
	var jwtw = $("#jwtwValue").val();//降温体温
	var mb = $("#mbValue").val();//脉搏
	var hx = $("#hxValue").val();//呼吸
	var xl = $("#xlValue").val();//心率
	var temp_type = $("#temp_type").val();//体温类型
	var ssy= $("#ssy").val();//收缩压
	var szy = $("#szy").val();//舒张压
	var c_qtcl = $("#xuetang").val();//血糖
	var c_tszl1 = $("#ybhd").val();//氧保护度值
	var c_zlxm_name_2 = $("#zmy").val();//指脉氧%
	var dbcs = $("#dbcs").val();//大便次数
	var xbl = $("#xbl").val();//小便量
	var tizhong = $("#tizhong").val()//体重
	var wcyy = $('#wcyyPicker').html();//未测原因
	var zhiyao = $('#zyPicker').html();//摘要
	
	if((tw<36||tw>43)&&tw!=0){
		mui.toast('体温偏离较大，请核对');
		return;
	}
	
	if((hx<10||hx>25)&&hx!=0){
		mui.toast('呼吸频率偏离较大，请核对');
		return;
	}
	
	if((mb<50||mb>110)&&mb!=0){
		mui.toast( '脉搏偏离较大，请核对');
		return;
	}
	
	if((xl<50||xl>110)&&xl!=0){
		mui.toast('心率偏离较大，请核对');
		return;
	}
	if(tw==0&&mb==0&&hx==0&&xl==0&&tizhong==''&&ssy==''&&szy==''&&dbcs==''&&xbl==''){
		mui.toast('没有填写数据');
		return;
	}
	
	var param = {};
	param['patientid'] = yzPatientid;

	param['temperature_type'] = temp_type;
	
	param['unmeasure_reason'] = wcyy;
	
	param['event'] = zhiyao;
	
	if(tw>0){
		param['temperature'] = tw;
	}
	if(mb>0){
		param['pulse'] = mb;
	}
	if(xl>0){
		param['heartrate'] = xl;
	}
	
	if(hx>0){
		param['breath'] = hx;
	}
	

	param['jwtw'] = jwtw;
	param['empid'] = localStorage.getItem("loginid");
	
	param['hours'] = timeArray[timeCount];
	
	if(c_qtcl>0){
		param['c_qtcl'] = c_qtcl;
	}
	if(c_tszl1>0){
		param['c_tszl1'] = c_tszl1;
		param['c_zlxm_name_2'] = c_zlxm_name_2;
	}
	param['patientid'] = yzPatientid;
	param['weight'] = tizhong;
	param['shitTimes'] = dbcs;
	param['urineAmount'] = xbl;
	param['bloodpressure'] = ssy+"/"+szy;
	
	var serverip = localStorage.getItem("serverip");	
	$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/saveSignAndHuli.do',
        data: param,
        dataType: "json",
        success: function(data){
        	if(data.success){
				mui.toast('保存成功');
			}else{
				mui.alert('保存失败');
			}
        }
    });
	
	/*$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/saveSign.do',
        data: param,
        dataType: "json",
        success: function(data){
        	if(data.success){
				mui.toast('保存成功');
			}else{
				mui.alert('保存失败');
			}
        }
    });
    
    $.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/saveSignHuli.do',
        data: huliParam,
        dataType: "json",
        success: function(data){
        	if(data.success){
				mui.toast('保存成功');
			}else{
				mui.alert('保存失败');
			}
        }
    });*/
	
}

//利用键盘弹出窗口高度会改变来模拟键盘弹出事件
function keybordEvent(){
	var winHeight = $(window).height(); 
	$(window).resize(function(){
	   	var thisHeight=$(this).height();
	    if(winHeight - thisHeight >50){
	        //窗口发生改变(大),故此时键盘弹出
	         //当软键盘弹出，在这里面操作
	         $("#navbar").hide();
	    }else{
	        //窗口发生改变(小),故此时键盘收起
	        //当软键盘收起，在此处操作
	        $("#navbar").show();
	    }
	});
}

function scanTzlr(){
	scanner.scan(function(data){
        if(data.success){
            scanner.getBarCodeInfo(data);
            var loginFlag = false;
            var islogin = localStorage.getItem("islogin");
            if('1'==islogin){
                loginFlag = true;
            }
            if(arr[0]=='1'&&loginFlag){
               selectPatient(arr[1]);
            }
            scanTzlr();
        }else{
            scanTzlr();//失败后重新注册扫码监听
            mui.toast("扫码失败");
            return false;
        }
    }, function(){
        scanTzlr();//失败后重新注册扫码监听
        mui.toast("系统异常");
    });
}