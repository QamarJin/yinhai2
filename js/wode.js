function setEmpSex(sex){
	var serverip = localStorage.getItem("serverip");
	var empid = localStorage.getItem("loginid");
	
	$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/setEmpSex.do',
        data: {sex:sex,empid:empid},
        dataType: "json",
        success: function(data){
        	if(!data.success){
				mui.toast('性别设置失败');
			}else{
				if(sex=='1'){
	    			$('#imgSex').attr('src','../image/wd/ios-bgboy.png');
	        	}else{
	        		$('#imgSex').attr('src','../image/wd/ios-bggril.png');
	        	}
				$('#sexSetting').hide();
			}
        }
    });
	
}

//注销登录
function logout(){
	localStorage.removeItem("islogin");
	localStorage.removeItem("loginid");
	localStorage.removeItem("deptid");
	localStorage.removeItem("areaid");
	localStorage.removeItem("hasArea");
	localStorage.removeItem("loginTime");
	localStorage.removeItem("hasSetDept");
	var loginViewID = plus.webview.getLaunchWebview().id;
    var loginView = plus.webview.getWebviewById(loginViewID);
    mui.fire(loginView, 'scanLogin');
    //关闭index界面
	plus.webview.getWebviewById("index").close();
}

function bindWdTap(){
	//切换病区
	$('#changeArea').on('tap',function(){
		var empid = localStorage.getItem("loginid");
		var serverip = localStorage.getItem("serverip");
		
		$.ajax({
	        type: 'POST',
	        url: 'http://'+serverip+'/deskNurse/app/getEmp.do',
	        data: {
					loginid: empid
				},
	        dataType: "json",
	        success: function(data){
	        	var area = data.area;
				if(area.length==1){
					mui.toast('您只有当前病区权限');
				}else{
					mui.openWindow({
						id: 'deptset',
				        url: 'deptSet.html',
				        extras: {type:'area'},
				        reload: true
					});
				}
	        }
	    });
		
	});
	
	$('#changeDept').on('tap',function(){
		var hasArea = localStorage.getItem("hasArea");
		
		var serverip = localStorage.getItem("serverip");
		
		if(hasArea==1){
			var areaid = localStorage.getItem("areaid");
			
			$.ajax({
		        type: 'POST',
		        url: 'http://'+serverip+'/deskNurse/app/getDeptByArea.do',
		        data: {
						areaid: areaid
					},
		        dataType: "json",
		        success: function(data){
		        	var dept = data;
					if(dept.length==1){
						mui.toast('您只有当前科室权限');
					}else{
						mui.openWindow({
							id: 'deptset',
					        url: 'deptSet.html',
					        extras: {type:'dept'},
					        reload: true
						});
					}
		        }
		    });
			
		}else{
			var empid = localStorage.getItem("loginid");
			
			$.ajax({
		        type: 'POST',
		        url: 'http://'+serverip+'/deskNurse/app/getDeptByEmp.do',
		        data: {
						empid: empid
					},
		        dataType: "json",
		        success: function(data){
		        	var dept = data;
					if(dept.length==1){
						mui.toast('您只有当前科室权限');
					}else{
						mui.openWindow({
							id: 'deptset',
					        url: 'deptSet.html',
					        extras: {type:'dept'},
					        reload: true
						});
					}
		        }
		    });
			
		}
	});
	
	//修改密码
	$('#modifyPassword').on('tap',function(){
		mui.openWindow({
			id: 'modifiyPassword',
	        url: 'modifiyPassword.html',
	        extras: {},
	        reload: true
		});
	});
}