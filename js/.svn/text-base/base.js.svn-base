function selectPatient(patientid) {
	yzPatientid = patientid;
	var serverip = localStorage.getItem("serverip");
	$.ajax({
		type: 'POST',
		url: 'http://' + serverip + '/deskNurse/app/selectPatient.do',
		data: {
			patientid: patientid
		},
		dataType: "json",
		success: function(data) {
			if(data != null) {
				var html = data.pname + "&nbsp;&nbsp;" + data.bedno;
				if(tabFlag == 2) {
					yzglFlag = 1;
					tzlrFlag = 0;
					hzxsFlag = 0;
					$('#yzglTitle').html(html);
					//检查是否有皮试医嘱
					/*$.ajax({
						type: 'POST',
						url: 'http://' + serverip + '/deskNurse/app/checkHasps.do',
						data: {
							patientid: patientid
						},
						dataType: "json",
						success: function(data) {
							if(data.hasPs) {
								mui.toast("请先执行皮试医嘱");
							}
						}
					});*/
				} else if(tabFlag == 1) {
					yzglFlag = 0;
					tzlrFlag = 1;
					hzxsFlag = 0;
					$('#tzlrTitle').html(html);

					$.ajax({
						type: 'POST',
						url: 'http://' + serverip + '/deskNurse/app/getSignByPatient.do',
						data: {
							patientid: patientid,
							hour: timeArray[timeCount]
						},
						dataType: "json",
						success: function(data) {
							if(data.count > 0) {
								$('#twValue').val(data.temperature);
								$('#jwtwValue').val(data.down_temperature);
								$('#mbValue').val(data.pulse);
								$('#hxValue').val(data.breath);
								$('#xlValue').val(data.heartrate);
								$('#wcyyPicker').html(data.unmeasure_reason);
								$('#zyPicker').html(data.event);
							} else {
								$('#twValue').val('');
								$('#jwtwValue').val('');
								$('#mbValue').val('');
								$('#hxValue').val('');
								$('#xlValue').val('');
								$('#wcyyPicker').html('');
								$('#zyPicker').html('');
							}
						},error:function(xhr,status,errorThrown){
					        	mui.toast("系统错误");
		        				mui.toast(status);
					        }
					});
					$.ajax({
                        type: 'POST',
                        url: 'http://' + serverip + '/deskNurse/app/getHuliByPatient.do',
                        data: {
                            patientid: patientid,
                            hour: timeArray[timeCount]
                        },
                        dataType: "json",
                        success: function(data) {
                            if(data.count > 0) {
                                if(data.bloodpressure){
                                    var arr = data.bloodpressure.split('/');
                                    if(arr[0]){
                                        $("#ssy").val(arr[0]);
                                    }else{
                                        $("#ssy").val('');
                                    }
                                    if(arr[1]){
                                        $("#szy").val(arr[1]);
                                    }else{
                                        $("#szy").val('');
                                    }
                                }else{
                                     $("#ssy").val('');
                                     $("#szy").val('');
                                }
                                $('#dbcs').val(data.shitTimes);
                                $('#xbl').val(data.urineAmount);
                                $('#tizhong').val(data.weight);
                                $('#xuetang').val(data.c_qtcl);
                                $('#ybhd').val(data.c_tszl1);
                                //$('#zmy').val(data.c_zlxm_name_2);
                            } else {
                                $("#ssy").val('');
                                $("#szy").val('');
                                $('#dbcs').val('');
                                $('#xbl').val('');
                                $('#tizhong').val('');
                                $('#xuetang').val('');
                                $('#ybhd').val('');
                                $('#zmy').val('指脉氧%');
                            }
                        },error:function(xhr,status,errorThrown){
                                mui.toast("系统错误");
                                mui.toast(status);
                            }
                    });
					searchTz(now_date);
				} else if(tabFlag == 3) {
					yzglFlag = 0;
					tzlrFlag = 0;
					hzxsFlag = 1;
					$('#hzxsTitle').html(html);
				}
			}
		},error:function(xhr,status,errorThrown){
	        	mui.toast("系统错误");
	        	mui.toast(status);
	        }
	});
}

function signOut() {
	var old_back = mui.back;
    var backButtonPress = 0;
    mui.back = function(event) {
        backButtonPress++;
        if (backButtonPress > 1) {
            var loginViewID = plus.webview.getLaunchWebview().id;
            var loginView = plus.webview.getWebviewById(loginViewID);
            mui.fire(loginView, 'scanLogin');
            plus.runtime.quit();
        } else {
            plus.nativeUI.toast('再按一次退出应用');
        }
        setTimeout(function() {
            backButtonPress = 0;
        }, 1000);
        return false;
    };
	/*mui.back = function() {
		var btn = ["确定", "取消"];
		mui.confirm('确认退出登录吗？', '', btn, function(e) {
			if(e.index == 0) {
				var loginViewID = plus.webview.getLaunchWebview().id;
				var loginView = plus.webview.getWebviewById(loginViewID);
				mui.fire(loginView, 'scanLogin');
				closeWebSocket();
				//注册登录的扫码事件
				old_back();
			}
		});
	}*/
}