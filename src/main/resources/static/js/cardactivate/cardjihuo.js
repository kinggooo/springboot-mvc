//校验其他证件类型只能输入英文和数字
function validataOtherCard(d){
    var cardType=$("#cardType").val();
    var othercard=/^[A-Za-z0-9]+$/;
    if(cardType!="01"&&cardType!="02") {
        // alert("come in");
        if(othercard.test(d)){
            return true;
        }else{
            return false;
        }
    }
}

// 卡号校验
function validataCardNum(s) {
	return true;
    var p=/^\d{15,16}$/g;  
    var money=/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
    if(!p.test(s)){ 
        alert( "请输入正确的信用卡卡号！"); 
        return false;
    }else { 
        return true;
    }
}

$("#next").live("click", function() {
	var cardNum=$("#cardNum").val();
	if(cardNum==""){
	    alert("请输入您的信用卡卡号");
	    $("#cardNum").focus();
	    return false;
	}else if(validataCardNum(cardNum)==false){
	    return false;
	}

    $.ajax({
        cache:false,
        async:false,
        type:"post", 
        url:"./nextStep.do",
        data:{ type:"next",cardNum:$("#cardNum").val(),openId:"123"},
        // 请求成功后的回调函数有两个参数
        success:function(data,textStatus){
            if(data=="0000"){
                /*
				 * $("#cardType").attr("disabled",false);
				 * $("#zjhm").removeAttr("readonly");
				 * $("#yy").removeAttr("readonly");
				 * $("#mm").removeAttr("readonly");
				 * $("#cvv2").removeAttr("readonly");
				 * $("#dtmm").removeAttr("readonly");
				 * $("#getpass").attr("disabled",false);
				 * $("#send").attr("disabled",false);
				 */
                $("#hidden1,#hidden2,#hidden3,#hidden4,#hidden5,#hidden6,#hidden7").show();
                $("#cardNum").attr("readonly",true);
            }else if(data=="0001"){
                alert("非常抱歉，目前支付宝服务窗不支持激活该信用卡，请拨打信用卡背面的客服热线获得帮助，谢谢！");
            }else if(data=="0002"){
                alert("您输入的卡号有误，请您重新输入 。");
            }else if(data=="9999"){
                alert("非常抱歉，目前系统异常，请您稍后再试");
            }
        }
    }); 
 });
 
$("#send").live("click", function() {
    var cardNum=$("#cardNum").val();
    var endnum=cardNum.slice(-4);
    var cardType=$("#cardType").val();
    var zjhm=$.trim($("#zjhm").val());
    var year=$.trim($("#yy").val());
    var mm=$.trim($("#mm").val());
    var date=year+""+mm;
    var cvv2=$("#cvv2").val();
    var openId=$("#openId").val();
    var y=/\d{2}/g; 
    var m=/^0[1-9]|1[0-2]$/g; 
    var cv=/\d{3}/g;
    var othercard=/^[0-9a-zA-Z]*$/g;
    if(cardType==""){
        alert("请选择证件类型");
        $("#cardType").focus();
        return false;
    }else if(zjhm==""){
        alert("请输入您的证件号码");
        $("#zjhm").focus();
        return false;
    }else if((($("#cardType").val()=="01"||$("#cardType").val()=="02"))&&isIdCardNo(zjhm)==false){
        return false;
    }else if(validataOtherCard(zjhm)==false){
        alert("请输入正确的证件号码");
        $("#zjhm").focus();
        return false;
    }else if(yy==""){
        alert("请输入年");
        $("#yy").focus();
        return false;
    }else if(year.length!=2){ 
        alert( "请输入正确的年份末两位！"); 
        $("#yy").focus();
        return false;
    }else if(!y.test(year)){ 
        alert( "请输入正确的年份末两位！"); 
        $("#yy").focus();
        return false;
    }else if(mm==""){
        alert("请输入月");
        $("#mm").focus();
        return false;
    }else if(mm.length!=2){
        alert( "请输入正确的月份！"); 
        $("#mm").focus();
        return false;
    }else if(!m.test(mm)){ 
        alert( "请输入正确的月份！"); 
        $("#mm").focus();
        return false;
    }else if(cvv2==""){
        alert("请输入cvv2");
        $("#cvv2").focus();
        return false;
    }else if(cvv2.length!=3){ 
        alert("请输入正确的cvv2");
        $("#cvv2").focus();
        return false;
    }else if(!cv.test(cvv2)){
        alert("请输入正确的cvv2");
        $("#cvv2").focus();
        return false;
    }else if($("#dtmm").val()==""){
        alert("请输入动态密码！");
        return false;
    }else if($("#getpass").val()=="获取"){
        alert("请重新获取动态密码！");
        return false;
    }else if(pass!=$("#dtmm").val()){
        alert("您输入的动态密码不对！");
        return false;
    }
    $.ajax({
        cache:false,
        async:false,
        type:"post",
        url:"./CardJiHuo.do",
        data:{ type: "submit",cardNum:cardNum,cardType:cardType,zjhm:zjhm,date:date,cvv2:cvv2,openId:openId},
        // 请求成功后的回调函数有两个参数
        success:function(data,textStatus){
            if(data=="0001"){
                $("#hidden1,#hidden2,#hidden3,#hidden4,#hidden5,#hidden6,#hidden7").hide();
                $("#hidden8").show();
                $("#next").attr("disabled",true);
            }else if(data=="0002"){
                if($("#dtmm").val()==""){
                    alert("请输入动态密码！");
                    return false;
                }else if($("#getpass").val()=="获取"){
                    alert("请重新获取动态密码！");
                    return false;
                }else if(pass!=$("#dtmm").val()){
                    alert("您输入的动态密码不对！");
                    return false;
                }else{
                    window.location.href="activation/CardjihuoResult.jsp?result="+data+"&openId="+openId;
                }
            }else if(data=="0003"||data=="0004"){
                if($("#dtmm").val()==""){
                    alert("请输入动态密码！");
                    return false;
                }else if($("#getpass").val()=="获取"){
                    alert("请重新获取动态密码！");
                    return false;
                }else if(pass!=$("#dtmm").val()){
                    alert("您输入的动态密码不对！");
                    return false;
                }else{
                    alert("非常抱歉，您输入的信息有误，请重新输入。");
                    $("#getpass").attr("disabled",false);
                    $("#getpass").val("获取");
                    clearInterval(time);
                    return false;
                }
            }else if(data=="0005"){
                if($("#dtmm").val()==""){
                    alert("请输入动态密码！");
                    return false;
                }else if($("#getpass").val()=="获取"){
                    alert("请重新获取动态密码！");
                    return false;
                }else if(pass!=$("#dtmm").val()){
                    alert("您输入的动态密码不对！");
                    return false;
                }else{
                    window.location.href="activation/CardjihuoResult.jsp?result="+data+"&openId="+openId;
                }
            }else if(data=="0006"){
                if($("#dtmm").val()==""){
                    alert("请输入动态密码！");
                    return false;
                }else if($("#getpass").val()=="获取"){
                    alert("请重新获取动态密码！");
                    return false;
                }else if(pass!=$("#dtmm").val()){
                    alert("您输入的动态密码不对！");
                    return false;
                }else{
                	alert("非常抱歉，您输入的证件号必须与绑定服务窗的证件号相同，请重新输入。");
                    $("#getpass").attr("disabled",false);
                    $("#getpass").val("获取");
                    clearInterval(time);
                    return false;
                }
            }else if(data=="0007"){
                if($("#dtmm").val()==""){
                    alert("请输入动态密码！");
                    return false;
                }else if($("#getpass").val()=="获取"){
                    alert("请重新获取动态密码！");
                    return false;
                }else if(pass!=$("#dtmm").val()){
                    alert("您输入的动态密码不对！");
                    return false;
                }else{
                	alert("非常抱歉，目前无法完成您的请求，请您携带信用卡及申请卡片时的有效证件至我行网点柜面激活，谢谢。");
                    $("#getpass").attr("disabled",false);
                    $("#getpass").val("获取");
                    clearInterval(time);
                    return false;
                }
            }else if(data=="unBind"){
                window.location.href="error.jsp?openId="+openId+"&oper=unBind";
            }else if(data=="9999"){
                window.location.href="activation/CardjihuoResult.jsp?result="+data+"&openId="+openId;
            }else if(data=="0000" || data=="0000_1"){
                if($("#dtmm").val()==""){
                    alert("请输入动态密码！");
                    return false;
                }else if($("#getpass").val()=="获取"){
                    alert("请重新获取动态密码！");
                    return false;
                }else if(pass!=$("#dtmm").val()){
                    alert("您输入的动态密码不对！");
                    return false;
                }else{
                    window.location.href="activation/CardjihuoResult.jsp?result="+data+"&endnum="+endnum+"&openId="+openId;
                }
            }
        }
    }); 
});
 
 
 
 
var pass;
var time;
$("#getpass").live("click", function() {
    $("#getpass").attr("disabled",true);
    $("#getpass").val("120");
    var certType=$("#cardType").val();
    var certNo=$("#zjhm").val();
    $.ajax({
        cache:false,
        async:false,
        type:"post",
        url:"./GetdtPassByCertNo.do?noCheck=1&ran="+Math.random(), // 发送请求地址
        data:{openId:$("#openId").val(),certType:certType,certNo:certNo},
        // 请求成功后的回调函数有两个参数
        success:function(data,textStatus){
            time=setInterval(function(){
                if(($("#getpass").val()-1)<=0){
                    $("#getpass").attr("disabled",false);
                    $("#getpass").val("获取");
                    clearInterval(time);
                }else{
                    $("#getpass").val($("#getpass").val()-1);
                }
            },1000);
            if(data == ""){
                alert("动态验证码获取失败，请拨打卡片背面24小时客服热线获得帮助。");
            }else{
                pass=data;
            }
        }
    }); 
            
    function showTime(){
        if(($("#getpass").val()-1)<=0){
            $("#getpass").attr("disabled",false);
            $("#getpass").val("获取");
        }else{
            $("#getpass").val($("#getpass").val()-1);
        }
    }
 });


