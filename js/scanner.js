//病人腕带条码分隔符
var wristbandSplitChar='_';
//床头卡条码分隔符
var bedsideCardSplitChar='+';
//输液瓶签条码分隔符
var bottleLabelBarCordSplitChar='P';
//分隔后的条码数组
let arr = null;

//东软广播
//var ACTION_BARCODE_READER_VALUE = "com.neusoft.action.scanner.read";

//霍尼威尔
//var ACTION_BARCODE_READER_VALUE = "com.scanner.honeywell";

//深圳成为技术
//var ACTION_BARCODE_READER_VALUE = "com.scanner.broadcast"

//成都富立叶
//var ACTION_BARCODE_READER_VALUE = "com.barcode.sendBroadcast"

//BayNexus
// var ACTION_BARCODE_READER_VALUE = "SYSTEM_BAR_READ";

//东集小码哥
// var ACTION_BARCODE_READER_VALUE = "com.android.server.scannerservice.broadcast";

//联新Nr510
var ACTION_BARCODE_READER_VALUE = "com.nr";


var scanner={
	scan:function(successBack,failBack){
		//获取activity
		var main = plus.android.runtimeMainActivity();
		//广播接收器
		var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
			onReceive: function(context, intent) { //实现onReceiver回调函数
				plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
				var action = intent.getAction();
				if(action == ACTION_BARCODE_READER_VALUE) {
					//东软设置
					//var resultText = intent.getStringExtra("scanner_value").trim();
					
					//霍尼威尔
					//var resultText = intent.getStringExtra("data").trim();
					
					//深圳成为技术
					//var resultText = intent.getStringExtra("data").trim();
					
					//成都富立叶
					//var resultText = intent.getStringExtra("BARCODE").trim();
					
					//BayNexus
					// var resultText = intent.getStringExtra("BAR_VALUE").trim();
					
					//东集小马哥
					// var resultText = intent.getStringExtra("scannerdata").trim();
					
					//联新Nr510
					var resultText = intent.getStringExtra("data").trim();
					var ret = {};
					ret.success = true;
					ret.value = resultText;
					successBack(ret);
				}
				try{
					main.unregisterReceiver(receiver);//取消监听
				}catch(e){
					//TODO handle the exception
				}
				
			}
		});
		//监听器
		var IntentFilter = plus.android.importClass('android.content.IntentFilter');
		var filter = new IntentFilter();
		filter.addAction(ACTION_BARCODE_READER_VALUE);
		//注销之前的监听
		try{
			var oldReceiver = JSON.parse(localStorage.getItem("receiver"));
			main.unregisterReceiver(oldReceiver);
		}catch(e){
			//TODO handle the exception
		}
		//注册监听
		main.registerReceiver(receiver, filter); 
		localStorage.setItem("receiver",JSON.stringify(receiver));
	},
	close:function(){
		try{
			var receiver = JSON.parse(localStorage.getItem("receiver"));
			//获取activity
			var main = plus.android.runtimeMainActivity();
			//取消监听
			main.unregisterReceiver(receiver);
		}catch(e){
			//TODO handle the exception
		}
	},
	//扫码获取条码的内容
	getBarCodeInfo:function(data){
		//通过分隔符判断
		arr = data.value.split(wristbandSplitChar);
		if(arr==data.value){
			arr = data.value.split(bedsideCardSplitChar);
		}else if(arr==data.value){
			arr = data.value.split(bottleLabelBarCordSplitChar);
		}
	}
}
