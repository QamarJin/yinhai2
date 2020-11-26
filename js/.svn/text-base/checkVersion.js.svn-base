function checkVersion(isTap){
	var serverip = localStorage.getItem("serverip");	
	var islogin = localStorage.getItem("islogin");
	if(islogin!='1'){
		return;
	}
	if(!serverip){
		return;
	}
	var appVersion;
	var reqUrl = "http://"+serverip+"/deskNurse/desk/checkVersion.do"; 
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		var appVersion = inf.version;
		$.ajax({
	        type: 'POST',
	        url: reqUrl,
	        data: {appVersion:appVersion},
	        dataType: "json",
	        success: function(data){
	        	if(data.update){
	        		mui.confirm('有新版本，是否立即更新','提示',['确定','取消'],function(e){
	        			if(e.index==0){
					    	downloadApp(data.versionCode);
					    }
	        		});
				}else{
					if(isTap){
	        			mui.toast('已经是最新版本了');
	        		}
				}
	        }
	    });
	});
}

/**
 * 下载新版本apk
 * @param {Object} versionCode
 */
function downloadApp(versionCode){
	var serverip = localStorage.getItem("serverip");	
	var url = "http://"+serverip+"/deskNurse/desk/downloadApk.do?versionCode="+versionCode;
	var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
		if(status == 200) { // 下载成功
			var path = d.filename;
			installWgt(d.filename);
		} else { //下载失败
			alert("Download failed: " + status);
		}
	}).start();
}

// 更新应用资源
function installWgt(path){
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        plus.nativeUI.alert("更新文件失败["+e.code+"]："+e.message);
    });
}
