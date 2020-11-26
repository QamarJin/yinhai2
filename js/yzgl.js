function yzglBindTap(){
	//刷新按钮
	$("#btnRefreshAdvince").bind('tap',function(){
		loadAdvince(yzPatientid);
	});
	   
	$("#checkAll-kf").parent().on('tap',function(){
		fncheckAll(this,'kfyzl','checkAll-kf');
	});
	
	$("#checkAll-zs").parent().on('tap',function(){
		fncheckAll(this,'zsyzl','checkAll-zs');
	});
	
	$("#checkAll-ps").parent().on('tap',function(){
		fncheckAll(this,'psyzl','checkAll-ps');
	});
	
	$("#checkAll-wh").parent().on('tap',function(){
		fncheckAll(this,'whyzl','checkAll-wh');
	});

	$("#checkAll-bb").parent().on('tap',function(){
        fncheckAll(this,'bbyzl','checkAll-bb');
    });

	//保存口服医嘱
	$('#btnSaveKf').on('tap',function(){
		saveyz('kfyzl','kf');
	});
	//保存注射医嘱
	$('#btnSaveZs').on('tap',function(){
		saveyz('zsyzl','zs');
	});
	//保存皮试医嘱
	$('#btnSavePs').on('tap',function(){
		saveyz('psyzl','ps');
	});
	//保存雾化医嘱
	$('#btnSaveWh').on('tap',function(){
		saveyz('whyzl','wh');
	});

	//保存标本
    $('#btnSaveBb').on('tap',function(){
        saveyz('bbyzl','jy');
    });
}

var tapcount=0;
//保存医嘱执行
function saveyz(id,type){
    var ids = "";
    var psRs = "";
    var count = 0;
    if(type=='ps'){
        var items = $('.divReadio');
        $(items).each(function(index,item){
            if($(item).hasClass('active')){
                count++;
                ids += $(item).parent().children().first().val()+'|'+$(item).parent().children().first().next().val()+'|'+
                		$(item).parent().children().first().next().next().val()+'|'+$(item).parent().children().first().next().next().next().val()+',';
                psRs += $(item).children().val()+',';
            }
        });
    }else{
        var items = $('#'+id).find('input[type="checkbox"][value="1"]');
        $(items).each(function(index,item){
            count++;
            ids+=$(item).next().val()+'|'+$(item).next().next().val()+'|'+$(item).next().next().next().val()+'|'+$(item).next().next().next().next().val()+",";
        });
    }
     
    ids = ids.substring(0,ids.length-1);
	psRs = psRs.substring(0,psRs.length-1);
    if(count==0){
        mui.toast('至少选择一条医嘱');
        return;
    }
	$(".btnSave").attr("disabled","true");
    count=0;

	var loginid = localStorage.getItem("loginid");
	
	var serverip = localStorage.getItem("serverip");
	if(tapcount==0){
		tapcount++;
		$.ajax({
	        type: 'POST',
	        url: 'http://'+serverip+'/deskNurse/app/execYz.do',
	        data: {ids:ids,empid:loginid,type:type,psRs:psRs,patientid:yzPatientid},
	        dataType: "json",
	        success: function(data){
	        	/*if(data.hasPs){
	        		mui.toast('该病人有未执行的皮试');
					return;
	        	}*/
	        	if(data.success){
					loadAdvince(yzPatientid);
					loadDaiban();
					mui.toast('保存成功');
				}else{
					mui.alert("保存失败","错误");
				}
	        },error:function(e){
	           alert(e.responseText);
	        }
	    });
	}
	
	
}
//检查医嘱状态
function checkAdvinceStutas(patientid,groupno,printTimes,kdDate){
	var serverip = localStorage.getItem("serverip");
	
	$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/checkAdvinceStutas.do',
        data: {patientid:patientid,groupno:groupno,printTimes:printTimes,kdDate:kdDate},
        dataType: "json",
        success: function(data){
            if(data.stutas=="end"){
                mui.toast('该医嘱已经完成');
                setTimeout(function(){
                    plus.device.beep("2");
                },500);
                var home = plus.webview.getWebviewById("home");
                mui.fire(home,'scanHome');
            }else if(data.stop=='stop'){
            	mui.toast("该医嘱已停止!");
				setTimeout(function(){
	        		plus.device.beep("2");
	        	},500);
            	var home = plus.webview.getWebviewById("home");
                mui.fire(home,'scanHome');
                /*mui.confirm('该医嘱已停止，是否执行','',['确定','取消'],function(e){
                    if(e.index==0){
                        if(ISEXECWC){
                            openSyWindow(data.stutas,patientid,groupno,printTimes,kdDate);
                        }else{
                            if(data.stutas=="wc"){
                                execAdvince(patientid,groupno,printTimes,kdDate);
                            }else{
                                openSyWindow(data.stutas,patientid,groupno,printTimes,kdDate);
                            }
                        }
                    }else{
                        var home = plus.webview.getWebviewById("home");
                        mui.fire(home,'scanHome');
                    }
                });*/
        	} else{
				if(data.outFlag!=0){
					mui.toast("该病人已出院!");
					setTimeout(function(){
		        		plus.device.beep("2");
		        	},500);
	            	var home = plus.webview.getWebviewById("home");
	                mui.fire(home,'scanHome');
			        /*mui.confirm('该病人医生已下出院医嘱，是否执行','',['确定','取消'],function(e){
                        if(e.index==0){
                            if(ISEXECWC){
                                openSyWindow(data.stutas,patientid,groupno,printTimes,kdDate);
                            }else{
                                if(data.stutas=="wc"){
                                    execAdvince(patientid,groupno,printTimes,kdDate);
                                }else{
                                    openSyWindow(data.stutas,patientid,groupno,printTimes,kdDate);
                                }
                            }
                        }else{
                            var home = plus.webview.getWebviewById("home");
                        	mui.fire(home,'scanHome');
                        }
                    });*/
			    }else{
					if(ISEXECWC){
						openSyWindow(data.stutas,patientid,groupno,printTimes,kdDate);
					}else{
						if(data.stutas=="wc"){
							execAdvince(patientid,groupno,printTimes,kdDate);
						}else{
							openSyWindow(data.stutas,patientid,groupno,printTimes,kdDate);
						}
					}
				}
			}
        },error:function(e){
            var home = plus.webview.getWebviewById("home");
            mui.fire(home,'scanHome');
            alert(e.responseText);
        }
    });
}
function openSyWindow(status,patientid,groupno,printTimes,kdDate){
	var url="execpy.html";
	if("hd"==status){
		url="exechd.html"
	}else if("zx"==status){
		url="execzx.html"
	}else if("wc"==status){
		url="execwc.html"
	}
	mui.openWindow({
		id: 'execpy',
        url: url,
        extras: {
        	patientid:patientid,
        	groupno:groupno,
        	printTimes:printTimes,
        	kdDate:kdDate
        }
	});
}

/*function openSyWindow(patientid,groupno,printTimes,kdDate){
	//查看是否启动流程，没有启动流程则打开配液窗口
	//如果流程已经启动则查询出流程运行到哪一步，打开对应窗口
	var serverip = localStorage.getItem("serverip");
	
	$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/checkProcessRun.do',
        data: {patientid:patientid,groupno:groupno,printTimes:printTimes,kdDate:kdDate},
        dataType: "json",
        success: function(data){
        	if(data.count==0){
				mui.openWindow({
					id: 'execpy',
			        url: 'execpy.html',
			        extras: {
			        	patientid:patientid,
			        	groupno:groupno,
			        	printTimes:printTimes,
			        	kdDate:kdDate
			        }
				});
			}else{
				$.ajax({
			        type: 'POST',
			        url: 'http://'+serverip+'/deskNurse/app/getProcessUrl.do',
			        data: {patientid:patientid,groupno:groupno,printTimes:printTimes,kdDate:kdDate},
			        dataType: "json",
			        success: function(data){
			        	//关闭扫码
						var url = data.url;
						mui.openWindow({
					        id: 'execsy',
					        url: url,
					        extras: {
					        	patientid:patientid,
					        	groupno:groupno,
					        	printTimes:printTimes,
					        	kdDate:kdDate
					        }
					    });
			        },error:function(){
			        	mui.toast("服务器数据错误");
			        	var home = plus.webview.getWebviewById("home");
                        mui.fire(home,'scanHome');
			        	alert(e.responseText);
			        }
			    });
			}
        },error:function(e){
            var home = plus.webview.getWebviewById("home");
            mui.fire(home,'scanHome');
            alert(e.responseText);

        }
    });
}*/

function fncheckAll(target,contentid,allid){
	var flag = $(target).children().first().val();
	if(flag==0){
		$("#"+allid).val(1);
		$("#"+allid).attr('checked','');
		$("#"+allid).removeClass("myunchecked");
		$("#"+allid).addClass("mychecked");
	}else{
		$("#"+allid).val(0);
		$("#"+allid).removeAttr('checked');
		$("#"+allid).removeClass("mychecked");
		$("#"+allid).addClass("myunchecked");
	}
	
	$("#"+contentid).children().each(function(index,item){
		var checkbox = $(this).find("input[type=checkbox]");
		changeChecked(checkbox,$(target).children().first().val());
	});
}

function changeChecked(target,type){
	var flag = $(target).val();
	if(type==1){
		if(flag==0){
			$(target).attr('checked','');
			$(target).removeClass("myunchecked");
			$(target).addClass("mychecked");
			$(target).val(1);
			
			var li = $(target).parent().next().next().children().children();
			$(li).each(function(index,item){
				$(item).children().each(function(ix,s){
					if($(s).hasClass('transverse')){
						$(s).css("background-color","#0FA3E5");
					}
				});
			});
		}
	}else{
		if(flag==1){
			$(target).removeAttr('checked');
			$(target).removeClass("mychecked");
			$(target).addClass("myunchecked");
			$(target).val(0);
			
    		var li = $(target).parent().next().next().children().children();
			$(li).each(function(index,item){
				$(item).children().each(function(ix,s){
					if($(s).hasClass('transverse')){
						$(s).css("background-color","#999");
					}
				});
   			});
		}
	}
}

function fnCheck(target,contentid,allid){
	target = $(target).find('input[type=checkbox]');
	
	var flag = $(target).val();
	if(flag==0){
		$(target).attr('checked','');
		$(target).removeClass("myunchecked");
		$(target).addClass("mychecked");
		$(target).val(1);
		
		var li = $(target).parent().next().next().children().children();
		$(li).each(function(index,item){
			$(item).children().each(function(ix,s){
				if($(s).hasClass('transverse')){
					$(s).css("background-color","#0FA3E5");
				}
			});
		});
		//检查是否全部选中
		var ckFlag = true;
		$("#"+contentid).children().each(function(index,item){
			var checkbox = $(this).find("input[type=checkbox]");
			if($(checkbox).val()==0){
				ckFlag = false;
			}
		});
		if(ckFlag){
			$("#"+allid).val(1);
			$("#"+allid).attr('checked','');
			$("#"+allid).removeClass("myunchecked");
			$("#"+allid).addClass("mychecked");
		}
	}else{
		$(target).val(0);
		$(target).removeAttr('checked');
		$(target).removeClass("mychecked");
		$(target).addClass("myunchecked");
		
		var li = $(target).parent().next().next().children().children();
		$(li).each(function(index,item){
			$(item).children().each(function(ix,s){
				if($(s).hasClass('transverse')){
					$(s).css("background-color","#999");
				}
			});
		});
		
		if($("#"+allid).val()==1){
			$("#"+allid).val(0);
    		$("#"+allid).removeAttr('checked');
			$("#"+allid).removeClass("mychecked");
			$("#"+allid).addClass("myunchecked");
		}
	}
}

//医嘱管理左右tab滑动事件
function yzglSlide(){
	document.getElementById('yzglslider').addEventListener('slide', function(e) {
		var tabid;
		if (e.detail.slideNumber === 0) {
			tabid = 'kfItem';
		}else if(e.detail.slideNumber===1){
			tabid = 'zsItem';
		} else if (e.detail.slideNumber === 2) {
			tabid = 'psItem';
		}else if(e.detail.slideNumber===3){
			tabid = 'whItem';
		}else if(e.detail.slideNumber===4){
            tabid = 'bbItem';
        }
		
		$('#'+tabid).css({'color':'#0FA3E5','font-weight':'600'});
		var yzglOtherTabs = $('#'+tabid).siblings();
		$.each(yzglOtherTabs, function(index,item) {
			$(item).css({'color':'#444','font-weight':'400'});
		});
		
	});		
}

function loadAdvince(patientid){
	if(patientid==''||!patientid){
		return;
	}
	$("#freshLog").removeClass();
	$("#freshLog").addClass("mui-spinner");
	var serverip = localStorage.getItem("serverip") ;
	
	$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/getAdvince.do',
        data: {patientid:patientid},
        dataType: "json",
        success: function(data){
			activeContent(data);
			$(".btnSave").removeAttr("disabled");
			tapcount=0;
        }
    });
}
/**
 * 加载医嘱内容
 * @param {Object} advince
 */
var curTime = new Date();
curTime.setHours(00, 00, 00, 0);
function activeContent(advince){
	//口服医嘱
	var kf = advince.kf;
	loadkfAdvince(kf);
	//注射医嘱
	var zs = advince.zs;
	loadzsAdvince(zs);
	//皮试医嘱
	var ps = advince.ps;
	loadPsAdvince(ps,advince.psRet);
	
	//雾化医嘱
	var wh = advince.wh;
	loadWhAdvince(wh);

	//标本医嘱
    /*var bbyz = advince.bbyz;
    loadbbAdvince(bbyz);*/

	//初始化选择状态
	$("#freshLog").removeClass();
	$("#freshLog").addClass("mui-icon mui-icon-loop");
	
	$("#checkAll-kf").val(0);
	$("#checkAll-kf").removeAttr('checked');
	$("#checkAll-kf").removeClass("mychecked");
	$("#checkAll-kf").addClass("myunchecked");
	
	$("#checkAll-zs").val(0);
	$("#checkAll-zs").removeAttr('checked');
	$("#checkAll-zs").removeClass("mychecked");
	$("#checkAll-zs").addClass("myunchecked");
	
	$("#checkAll-ps").val(0);
	$("#checkAll-ps").removeAttr('checked');
	$("#checkAll-ps").removeClass("mychecked");
	$("#checkAll-ps").addClass("myunchecked");
	
	$("#checkAll-wh").val(0);
	$("#checkAll-wh").removeAttr('checked');
	$("#checkAll-wh").removeClass("mychecked");
	$("#checkAll-wh").addClass("myunchecked");

	$("#checkAll-bb").val(0);
    $("#checkAll-bb").removeAttr('checked');
    $("#checkAll-bb").removeClass("mychecked");
    $("#checkAll-bb").addClass("myunchecked");
}
/**
 * 加载口服医嘱
 * @param {Object} kf
 */

function loadkfAdvince(kf){
	if(kf.length>0){
		$("#kfItem").html('口服 <span class="mui-badge tab-brage">'+kf.length+'</span>');
		$("#kfyzl").html('');
		for(var i=0;i<kf.length;i++){
			var item = '<div class="mui-row bindtap-kf" style="border-bottom: 0.5rem solid #F6F6F6;padding: 0 1rem;">'+
				'<div class="mui-input-row mui-checkbox mui-col-sm-4" style="width: 33%;height: 3rem;line-height: 3rem;">';
				if(!kf[i].enddate){
					item+='<input type="checkbox" style="left: 0;" value="0">'
				}
				item+='<input type="hidden" value="'+kf[i].patientid+'">'+
				'<input type="hidden" value="'+kf[i].groupno+'">'+
				'<input type="hidden" value="'+kf[i].print_times+'">'+
				'<input type="hidden" value="'+kf[i].exec_date+'">';
			var yzType;
			if(kf[i].yztype=='1'){
				yzType = '临时';
			}else if(kf[i].yztype=='2'){
				yzType = '长期';
			}

			var tmp_pinci;

			if(kf[i].pinci){
				tmp_pinci = kf[i].pinci;
			}else{
				tmp_pinci = 'qd';
			}
			
			var startTime = new Date(Date.parse(kf[i].exec_date));
			item+='<label style="padding: 0;margin-left: 2rem;">'+yzType+'</label>'+
				'</div>'+
				'<div class="mui-col-sm-8" style="width: 67%;height: 3rem;line-height: 3rem;">'+
					'<span style="">'+tmp_pinci+'</span>';
				if(curTime>startTime){
					item+='<span style="color:red">[昨]</span>'
				}
				if(kf[i].enddate){
					item+='<span style="color:red">[停]</span>'
				}
				item+='<span style="float: right;">开单医生:'+kf[i].doctor+'</span>'+
				'</div>'+
				'<div style="padding: 0.5rem 1rem;">'+
					'<ul class="myul-noborder">'+
					'<li><span>'+kf[i].doctor_note+'</span></li>'+
					'<li><span>'+kf[i].exec_date+'</span></li>';
			var itemname = kf[i].itemname.split("$&");
			if(itemname.length>1){
				var dose = kf[i].dose.split("$&");
				var unit = kf[i].unit.split("$&");
				for(var j=0;j<itemname.length;j++){
					item+='<li>'+
						'<span style="float: right;color: #999;">剂量:'+
							'<span class="mui-badge" style="background-color:#F75758 ;color: #FFFFFF;">'+
								dose[j]+'</span>'+unit[j]+'</span>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+itemname[j]+'</span>'+
					  '</li>';
				}
			}else{
				item+='<li>'+
						'<span style="float: right;color: #999;">剂量:'+
							'<span class="mui-badge" style="background-color:#F75758 ;color: #FFFFFF;">'+
								kf[i].dose+'</span>'+kf[i].unit+'</span>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+kf[i].itemname+'</span>'+
					  '</li>';
			}
						
			item+='</ul></div></div>';
			$("#kfyzl").append(item);
		}
		$('.bindtap-kf').on('tap',function(){
			fnCheck(this,'kfyzl','checkAll-kf');
		});
		
		$("#yzHeader-kf").show();
	}else{
		$("#yzHeader-kf").hide();
		$("#kfItem").html('口服');
		$("#kfyzl").html('<div style="text-align: center;margin-top: 4rem;color: #999;font-size: 1.5rem;">没有该项医嘱</div>');
	}
}
/**
 * 加载注射医嘱
 * @param {Object} zs
 */
function loadzsAdvince(zs){
	if(zs.length>0){
		$("#zsItem").html('注射 <span class="mui-badge tab-brage">'+zs.length+'</span>');
		$("#zsyzl").html('');
		for(var i=0;i<zs.length;i++){
			var item = '<div class="mui-row bindtap-zs" style="border-bottom: 0.5rem solid #F6F6F6;padding: 0 1rem;">'+
				'<div class="mui-input-row mui-checkbox mui-col-sm-4" style="width: 33%;height: 3rem;line-height: 3rem;">';
				if(!zs[i].enddate){
					item+='<input type="checkbox" style="left: 0;" value="0">'
				}	
				item+='<input type="hidden" value="'+zs[i].patientid+'">'+
					'<input type="hidden" value="'+zs[i].groupno+'">'+
					'<input type="hidden" value="'+zs[i].print_times+'">'+
					'<input type="hidden" value="'+zs[i].exec_date+'">';
			var yzType;
			if(zs[i].yztype=='1'){
				yzType = '临时';
			}else if(zs[i].yztype=='2'){
				yzType = '长期';
			}

			var tmp_pinci;

			if(zs[i].pinci){
				tmp_pinci = zs[i].pinci;
			}else{
				tmp_pinci = 'qd';
			}
			var startTime = new Date(Date.parse(zs[i].exec_date));
			item+='<label style="padding: 0;margin-left: 2rem;">'+yzType+'</label>'+
				'</div>'+
				'<div class="mui-col-sm-8" style="width: 67%;height: 3rem;line-height: 3rem;">'+
					'<span style="">'+tmp_pinci+'</span>';
				if(curTime>startTime){
					item+='<span style="color:red">[昨]</span>'
				}
				if(zs[i].enddate){
					item+='<span style="color:red">[停]</span>'
				}
				item+='<span style="float: right;">开单医生:'+zs[i].doctor+'</span>'+
				'</div>'+
				'<div style="padding: 0.5rem 1rem;">'+
					'<ul class="myul-noborder">'+
					'<li><span>'+zs[i].doctor_note+'</span></li>'+
					'<li><span>'+zs[i].exec_date+'</span></li>';
			var itemname = zs[i].itemname.split("$&");
			if(itemname.length>1){
				var dose = zs[i].dose.split("$&");
				var unit = zs[i].unit.split("$&");
				for(var j=0;j<itemname.length;j++){
					item+='<li>'+
						'<span style="float: right;color: #999;">剂量:'+
							'<span class="mui-badge" style="background-color:#F75758 ;color: #FFFFFF;">'+
								dose[j]+'</span>'+unit[j]+'</span>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+itemname[j]+'</span>'+
					  '</li>';
				}
			}else{
				item+='<li>'+
						'<span style="float: right;color: #999;">剂量:'+
							'<span class="mui-badge" style="background-color:#F75758 ;color: #FFFFFF;">'+
								zs[i].dose+'</span>'+zs[i].unit+'</span>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+zs[i].itemname+'</span>'+
					  '</li>';
			}
						
			item+='</ul></div></div>';
			$("#zsyzl").append(item);
		}
		$('.bindtap-zs').on('tap',function(){
			fnCheck(this,'zsyzl','checkAll-zs');
		});
		$("#yzHeader-zs").show();
	}else{
		$("#yzHeader-zs").hide();
		$("#zsItem").html('注射');
		$("#zsyzl").html('<div style="text-align: center;margin-top: 4rem;color: #999;font-size: 1.5rem;">没有该项医嘱</div>');
	}
}
/**
 * 加载皮试医嘱
 * @param {Object} ps
 */
function loadPsAdvince(ps,psRet){
	if(ps.length>0){
		$("#psItem").html('皮试 <span class="mui-badge tab-brage">'+ps.length+'</span>');
		$("#psyzl").html('');
		
		var psRetItems = '';
		var rclass='';
		if(psRet.length==3){
			rclass = "mui-col-sm-4";
		}else if(psRet.length==4){
			rclass = "mui-col-sm-3";
		}else{
            rclass = "mui-col-sm-6";
        }
		var rwidth = 100/psRet.length;
		
		for(var i=0;i<psRet.length;i++){
			psRetItems+='<div class="'+rclass+' divReadio" style="width: '+rwidth+'%;">'+
					'<input type="hidden" value="'+psRet[i].id+'">'+
					psRet[i].text+
				'</div>'
		}
		
		for(var i=0;i<ps.length;i++){
			var item = '<div class="mui-row" style="box-shadow: 0.1rem 0.2rem 0.3rem #e6e6e6;">'+
						'<input type="hidden" value="'+ps[i].patientid+'">'+
						'<input type="hidden" value="'+ps[i].groupno+'">'+
						'<input type="hidden" value="'+ps[i].print_times+'">'+
						'<input type="hidden" value="'+ps[i].exec_date+'">'+
						psRetItems+'</div>'+
			'<div style="padding: 0.5rem 1rem;">'+
				'<ul class="myul-noborder">'+
					'<li><span>'+ps[i].doctor_note+'</span></li>'+
					'<li><span>'+ps[i].exec_date+'</span></li>';
			var itemname = ps[i].itemname.split("$&");
			if(itemname.length>1){
				var dose = ps[i].dose.split("$&");
				var unit = ps[i].unit.split("$&");
				for(var j=0;j<itemname.length;j++){
					item +='<li>'+
							'<span class="transverse tr-blue"></span><span style="color: #444;">'+
								itemname[j]+
							'</span>'+		
						'</li>';
				}
			}else{
				item +='<li>'+
						'<span class="transverse tr-blue"></span><span style="color: #444;">'+
							ps[i].itemname+
						'</span>'+		
					'</li>';
			}
					
			item+='</ul></div>';
			
			$("#psyzl").append(item);
		}
		$(".divReadio").on('tap',function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).attr('selected',false);
			}else{
				$(this).addClass('active').siblings().removeClass('active');
				$(this).attr('selected',true);
			}
		});
		$("#yzHeader-ps").show();
	}else{
		$("#yzHeader-ps").hide();
		$("#psItem").html('皮试');
		$("#psyzl").html('<div style="text-align: center;margin-top: 4rem;color: #999;font-size: 1.5rem;">没有该项医嘱</div>');
	}
}
/**
 * 加载雾化医嘱
 * @param {Object} wh
 */
function loadWhAdvince(wh){
	if(wh.length>0){
		$("#whItem").html('雾化 <span class="mui-badge tab-brage">'+wh.length+'</span>');
		$("#whyzl").html('');
		for(var i=0;i<wh.length;i++){
			var item = '<div class="mui-row bindtap-wh" style="border-bottom: 0.5rem solid #F6F6F6;padding: 0 1rem;">'+
				'<div class="mui-input-row mui-checkbox mui-col-sm-4" style="width: 33%;height: 3rem;line-height: 3rem;">';
				if(!wh[i].enddate){
					item+='<input type="checkbox" style="left: 0;" value="0">'
				}
				
				item+='<input type="hidden" value="'+wh[i].patientid+'">'+
					'<input type="hidden" value="'+wh[i].groupno+'">'+
					'<input type="hidden" value="'+wh[i].print_times+'">'+
					'<input type="hidden" value="'+wh[i].exec_date+'">';
			var yzType;
			if(wh[i].yztype=='1'){
				yzType = '临时';
			}else if(wh[i].yztype=='2'){
				yzType = '长期';
			}

			var tmp_pinci;

			if(wh[i].pinci){
				tmp_pinci = wh[i].pinci;
			}else{
				tmp_pinci = 'qd';
			}
			var startTime = new Date(Date.parse(wh[i].exec_date));
			
			item+='<label style="padding: 0;margin-left: 2rem;">'+yzType+'</label>'+
				'</div>'+
				'<div class="mui-col-sm-8" style="width: 67%;height: 3rem;line-height: 3rem;">'+
					'<span style="">'+tmp_pinci+'</span>';
				if(curTime>startTime){
					item+='<span style="color:red">[昨]</span>'
				}
				if(wh[i].enddate){
					item+='<span style="color:red">[停]</span>'
				}
				item+='<span style="float: right;">开单医生:'+wh[i].doctor+'</span>'+
				'</div>'+
				'<div style="padding: 0.5rem 1rem;">'+
					'<ul class="myul-noborder">'+
					'<li><span>'+wh[i].doctor_note+'</span></li>'+
					'<li><span>'+wh[i].exec_date+'</span></li>';
			var itemname = wh[i].itemname.split("$&");
			if(itemname.length>1){
				var dose = wh[i].dose.split("$&");
				var unit = wh[i].unit.split("$&");
				for(var j=0;j<itemname.length;j++){
					item+='<li>'+
						'<span style="float: right;color: #999;">剂量:'+
							'<span class="mui-badge" style="background-color:#F75758 ;color: #FFFFFF;">'+
								dose[j]+'</span>'+unit[j]+'</span>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+itemname[j]+'</span>'+
					  '</li>';
				}
			}else{
				item+='<li>'+
						'<span style="float: right;color: #999;">剂量:'+
							'<span class="mui-badge" style="background-color:#F75758 ;color: #FFFFFF;">'+
								wh[i].dose+'</span>'+wh[i].unit+'</span>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+wh[i].itemname+'</span>'+
					  '</li>';
			}
						
			item+='</ul></div></div>';
			$("#whyzl").append(item);
		}
		$('.bindtap-wh').on('tap',function(){
			fnCheck(this,'whyzl','checkAll-wh');
		});
		$("#yzHeader-wh").show();
	}else{
		$("#yzHeader-wh").hide();
		$("#whItem").html('雾化');
		$("#whyzl").html('<div style="text-align: center;margin-top: 4rem;color: #999;font-size: 1.5rem;">没有该项医嘱</div>');
	}
}


/**
 * 加载标本医嘱
 * @param {Object} bb
 */
/*function loadbbAdvince(bbyz){
	if(bbyz.length>0){
		$("#bbItem").html('标本 <span class="mui-badge tab-brage">'+bbyz.length+'</span>');
		$("#bbyzl").html('');
		for(var i=0;i<bbyz.length;i++){
			var item = '<div class="mui-row bindtap-bb" style="border-bottom: 0.5rem solid #F6F6F6;padding: 0 1rem;">'+
				'<div class="mui-input-row mui-checkbox mui-col-sm-4" style="width: 33%;height: 3rem;line-height: 3rem;">'+
					'<input type="checkbox" style="left: 0;" value="0">'+
					'<input type="hidden" value="'+bbyz[i].patientid+'">'+
					'<input type="hidden" value="'+bbyz[i].groupno+'">'+
					'<input type="hidden" value="'+bbyz[i].print_times+'">'+
					'<input type="hidden" value="'+bbyz[i].exec_date+'">';
			var yzType;
			if(bbyz[i].yztype=='1'){
				yzType = '临时';
			}else if(bbyz[i].yztype=='2'){
				yzType = '长期';
			}

			var tmp_pinci;

			if(bbyz[i].pinci){
				tmp_pinci = bbyz[i].pinci;
			}else{
				tmp_pinci = 'qd';
			}
			var startTime = new Date(Date.parse(bbyz[i].exec_date));
			item+='<label style="padding: 0;margin-left: 2rem;">'+yzType+'</label>'+
				'</div>'+
				'<div class="mui-col-sm-8" style="width: 67%;height: 3rem;line-height: 3rem;">'+
					'<span style="">'+tmp_pinci+'</span>';
				if(curTime>startTime){
					item+='<span style="color:red">[昨]</span>'
				}
				if(bbyz[i].enddate){
					item+='<span style="color:red">[停]</span>'
				}
				item+='<span style="float: right;">开单医生:'+bbyz[i].doctor+'</span>'+
				'</div>'+
				'<div style="padding: 0.5rem 1rem;">'+
					'<ul class="myul-noborder">'+
					'<li><span>'+bbyz[i].exec_date+'</span></li>';
			var itemname = bbyz[i].itemname.split("$&");
			if(itemname.length>1){
				//var dose = bbyz[i].dose.split("$&");
				//var unit = bbyz[i].unit.split("$&");
				for(var j=0;j<itemname.length;j++){
					item+='<li>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+itemname[j]+'</span>'+
					  '</li>';
				}
			}else{
				item+='<li>'+
						'<span class="transverse" style="background:#999"></span><span style="color: #444;">'+bbyz[i].itemname+'</span>'+
					  '</li>';
			}

			item+='</ul></div></div>';
			$("#bbyzl").append(item);
		}
		$('.bindtap-bb').on('tap',function(){
			fnCheck(this,'bbyzl','checkAll-bb');
		});

		$("#yzHeader-bb").show();
	}else{
		$("#yzHeader-bb").hide();
		$("#bbItem").html('标本');
		$("#bbyzl").html('<div style="text-align: center;margin-top: 4rem;color: #999;font-size: 1.5rem;">没有该项医嘱</div>');
	}
}*/



function scanYzgl(){
	scanner.scan(function(data){
        if(data.success){
            scanner.getBarCodeInfo(data);
            var loginFlag = false;
            var islogin = localStorage.getItem("islogin");
            if('1'==islogin){
                loginFlag = true;
            }
            if(arr[0]=='1'&&loginFlag){
                //加载医嘱
                selectPatient(arr[1]);
                loadAdvince(arr[1]);
            }
            scanYzgl();
        }else{
            scanYzgl();//失败后重新注册扫码监听
            mui.toast("扫码失败");
            return false;
        }
    }, function(){
        scanYzgl();//失败后重新注册扫码监听
        mui.toast("系统异常");
    });
}

function execAdvince(patientid,groupno,printTimes,kdDate){
	var param = {};
	param['patientid'] = patientid;
	param['groupno'] = groupno;
	param['printTimes'] = printTimes;
	param['kdDate'] = kdDate;
	param['executer'] = localStorage.getItem("loginid");
	var serverip = localStorage.getItem("serverip");
	$.ajax({
        type: 'POST',
        url: 'http://'+serverip+'/deskNurse/app/execWcAdvince.do',
        data: param,
        dataType: "json",
        success: function(data){
        	if(data.success){
				mui.toast('完成成功');
				var home = plus.webview.getWebviewById("home");
				mui.fire(home,'scanHome');
			}else{
				mui.alert("完成失败，请联系管理员");
				var home = plus.webview.getWebviewById("home");
                mui.fire(home,'scanHome');
				setTimeout(function(){
					plus.device.beep("2");
				},500);
			}
        }
    });
}
