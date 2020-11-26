function scanAction(){
    var B = window.plus.bridge;
        var callbackID = B.callbackId(function(data){
            if(data.success){
                scanner.getBarCodeInfo(data);
                var loginFlag = false;
                var islogin = localStorage.getItem("islogin");
                if('1'==islogin){
                    loginFlag = true;
                }
                if(arr[0]=='1'&&loginFlag){
                var tabFlag = localStorage.getItem("tabFlag");
                alert(tabFlag);
                    if(tabFlag==1){//体征录入选择病人
                        selectPatient(arr[1]);
                    }else if(tabFlag==2){//加载医嘱
                        selectPatient(arr[1]);
                        loadAdvince(arr[1]);
                    }else if(tabFlag==3){//患者巡视选择病人
                        selectPatient(arr[1]);
                    }
                }else if(arr[0]=='2'&&loginFlag){
                    checkAdvinceStutas(arr[1],arr[2],arr[3]);
                }else if(arr[0]=='3'||(arr[0]!='1'&&arr[0]!='2'&&arr[0]!='3')){//扫描工牌二维码登录
                    localStorage.removeItem("islogin");
                    localStorage.removeItem("loginid");
                    localStorage.removeItem("deptid");
                    localStorage.removeItem("areaid");
                    localStorage.removeItem("hasArea");
                    localStorage.removeItem("hasSetDept");
                    stopInterval();
                    var empid;
                    var head = data.value.substring(0,2);
                    if(head=='gp'){
                        empid = data.value.substring(2,data.value.length);
                    }else{
                        if(arr.length==1){
                            empid = data.value;
                        }else{
                            empid = arr[1];
                        }
                    }
                    mui.openWindow({
                        id: 'login',
                        url: '../login.html',
                        extras:{empid:empid},
                    });
                }
            }else{
                scanAction();//失败后重新注册扫码监听
                mui.toast("扫码失败");
                return false;
            }
        }, function(){
            scanAction();//失败后重新注册扫码监听
            mui.toast("系统异常");
        });
        B.exec('InfraredScan', "scan", [callbackID,_DEVICE]);
}

function scanTzlr(){
    var B = window.plus.bridge;
    var callbackID = B.callbackId(function(data){
        alert("tzlr+==="+data.success);
        if(data.success){
            alert("tzlrflag="+tabFlag);
            scanner.getBarCodeInfo(data);
            var loginFlag = false;
            var islogin = localStorage.getItem("islogin");
            if('1'==islogin){
                loginFlag = true;
            }
            if(arr[0]=='1'&&loginFlag){
                alert("tzlrSelect");
               selectPatient(arr[1]);
            }
        }else{
            scanTzlr();//失败后重新注册扫码监听
            mui.toast("扫码失败");
            return false;
        }
    }, function(){
        scanTzlr();//失败后重新注册扫码监听
        mui.toast("系统异常");
    });
    B.exec('InfraredScan', "scan", [callbackID,"1"]);
}

function scanYzgl(){
    var B = window.plus.bridge;
    var callbackID = B.callbackId(function(data){
        alert("yzgl+==="+data.success);
        if(data.success){
            alert(+"yzglflag="+tabFlag);
            scanner.getBarCodeInfo(data);
            var loginFlag = false;
            var islogin = localStorage.getItem("islogin");
            if('1'==islogin){
                loginFlag = true;
            }
            if(arr[0]=='1'&&loginFlag){
                 alert("yzglselect");
                //加载医嘱
                selectPatient(arr[1]);
                loadAdvince(arr[1]);
            }
        }else{
            scanYzgl();//失败后重新注册扫码监听
            mui.toast("扫码失败");
            return false;
        }
    }, function(){
        scanYzgl();//失败后重新注册扫码监听
        mui.toast("系统异常");
    });
    B.exec('InfraredScan', "scan", [callbackID,"1"]);
}

function scanHzxs(){
    var B = window.plus.bridge;
    var callbackID = B.callbackId(function(data){
        alert("hzxs+==="+data.success);
        if(data.success){
            alert(+"hzxsflag="+tabFlag);
            scanner.getBarCodeInfo(data);
            var loginFlag = false;
            var islogin = localStorage.getItem("islogin");
            if('1'==islogin){
                loginFlag = true;
            }
            if(arr[0]=='1'&&loginFlag){
                alert("hzxsselect");
               //患者巡视选择病人
                selectPatient(arr[1]);
            }
        }else{
            scanHzxs();//失败后重新注册扫码监听
            mui.toast("扫码失败");
            return false;
        }
    }, function(){
        scanHzxs();//失败后重新注册扫码监听
        mui.toast("系统异常");
    });
    B.exec('InfraredScan', "scan", [callbackID,"1"]);
}