X.user={
	loginCallback:$.no,
	account:{
			balance:null
	},
	
	refreshKaptcha:function(img) {
        var timstamp = (new Date()).valueOf();
        var url = img.attr("src") + "&t=" + timstamp;
        img.attr("src", url);	   
	},
	checkLogin:function(callback,loginback){
		X.ajax("/check_login",{},function(data){
			if(data&&data.authenticated){
				X.user.account.balance=data.balance;
				callback();
			}else{
				X.user.account.balance=0;
				loginback();
			}
		});
	},
	signin:function(){
		var t=this,uo=$('#username'),po=$('#password'),un=$.v(uo),pw=$.v(po);
		if($.clear(un).length==0){ 
				X.dialog.tips("请输入手机号码");
				uo.focus();
				return false;
			}
		if($.clear(pw).length==0){
				X.dialog.tips("请输入登录密码");
				po.focus();
				return false;
			}
		//清理cookie
		X.ajax("/signin",$('#signin-form').serialize(),function(data){
			if(data.success){
				window.location.href=data.done;
			}else{
				X.dialog.tips(data.message);
			}
		});
	},
	getUsername:function(){
		return $.getCookie("X-NAME",null);
	},
//	signup:function(){
//		var mobile=$('#mobile').val();
//		if(!X.valid.isMobile(mobile)){
//			X.dialog.tips("请输入正确的手机号码");
//			return false;
//		}
//		var checkcode=$('#checkcode').val();
//		if(checkcode==''){
//			X.dialog.tips("请输入短信验证码");
//			return false;
//		}
//		X.ajax("/signup_validcode",$('#signupForm').serialize(),function(data){
//			if(data.success){
//				window.location.href="/signup_setpass";
//			}else{
//				X.dialog.tips(data.message);
//			}
//		});
//	},
	getRegCheckCode:function(){
	    var mobile=$('#mobile').val();
        if(!X.valid.isMobile(mobile)){
            X.dialog.tips('请输入正确的手机号码');
            return;
        }
	
		X.form.button.disable("getCode");  //
		
		var i = 60;
		var hander = setInterval(function () {
			  if (i == 0) {
		          clearInterval(hander);
		          $("#getCode").val('获取短信验证码');
		          X.form.button.enable("getCode");
		      }
		      else {
		    	  $("#getCode").val( i+'秒后重新获取');
		      }
			i--;
        }, 1000);
		
		//提交短信信息
		X.ajax("/signup_checkcode",{mobile:mobile},function(data){
				if(data.success){
					X.dialog.tips('验证码已经发送至您的手机，请注意查收'); 
				}else{
					clearInterval(hander);
					X.form.button.enable("getCode");
					$("#getCode").html('获取短信验证码')
					X.dialog.tips(data.message);
				}
		});
	},	
	
	signupSubmit:function(){
		var password=$('#password').val();
		var mobile=$('#mobile').val();

		if(!X.valid.isMobile(mobile)){
			X.dialog.tips("请输入正确的手机号码");
			return false;
		}
		var checkcode=$('#checkcode').val();
		if(checkcode==''){
			X.dialog.tips("请输入短信验证码");
			return false;
		}

		if(password.length<6 || password.length>16){
			X.dialog.tips('密码由 6-16位数字和字母组成');
			return false;
		}
		if(/^\d+$/.test(password)){
			X.dialog.tips('密码不能全为数字');
			return false;
		}
		
		X.ajax("/signup_create", $('#signupForm').serialize() ,function(data){
			if(data.success){
				X.dialog.tips("注册成功!请等待跳转...");
				X.timing.setInterval(function(){
					window.location.href='/user/switchrole';
				},500);
			}else{
				X.dialog.tips(data.message);
			}
		});
	},
	
	/*  获取验证码*/
	getForgetCheckCode:function(){
		var mobile=$('#mobile').val();
		if(!X.valid.isMobile(mobile)){
			X.dialog.tips('请输入正确的手机号码');
			return;
		}
		
		X.form.button.disable("getCode");  //这个禁用有问题
		var i = 60;
		var hander = setInterval(function () {
			  if (i == 0) {
		          clearInterval(hander);
		          $("#getCode").val('获取短信验证码');
		          X.form.button.enable("getCode");
		      }
		      else {
		    	  $("#getCode").val(i+"秒后重新获取");
		      }
			i--;
        }, 1000);
		
		//提交短信信息
		X.ajax("/forget_checkcode",{mobile:mobile},function(data){
			if(data.success){
				X.dialog.tips('验证码已经发送至您的手机，请注意查收'); 
			}else{
				clearInterval(hander);
				X.form.button.enable("getCode");
				$("#getCode").html('获取短信验证码')
				X.dialog.tips(data.message);
			}
		});
	},		
	forgetValid:function(){
		var mobile=$('#mobile').val();
		if(!X.valid.isMobile(mobile)){
			X.dialog.tips('请输入正确的手机号码');
			return;
		}
		var code=$('#checkcode').val();
		if($.clear(code).length==0 || code=='验证码'){
			X.dialog.tips('请输入验证码');
			return false;
		}
		X.ajax("/forget_validate",{checkcode:code,mobile:mobile},function(data){
			if(data.success){
				window.location.href = "/forget_reset";
			}else{
				X.dialog.tips(data.message);
			}
		});
	},	
	
	forgetSubmit:function(){
			var mobile=$('#mobile').val();
            if(!X.valid.isMobile(mobile)){
                X.dialog.tips('请输入正确的手机号码');
                return;
            }
            var code=$('#checkcode').val();
            if($.clear(code).length==0 || code=='验证码'){
                X.dialog.tips('请输入验证码');
                return false;
            }
			var password=$('#password').val();
			if(password.length<6 || password.length>16){
				X.dialog.tips('6-16位数字和字母组成');
				return false;
			}
			if(/^\d+$/.test(password)){
				X.dialog.tips('密码不能全为数字');
				return false;
			}

			
			X.ajax("/forget_submit",{checkcode:code,mobile:mobile,password:password},function(data){
				if(data.success){
					X.dialog.tips("密码修改成功 请重新登录");
					X.timing.setInterval(function(){
						window.location.href = "/signin";
					},500);
				}else{
					X.dialog.tips(data.message);
				}
			});
	},		
	
	switchrole:function(role){
            X.ajax("/user/switchrole",{role:role},function(data){
                if(data.success){
                    window.location.href = data.done;
                }else{
                    X.dialog.tips(data.message);
                }
            });	
	},		
	
	wx_signin:function(){		
		var t=this,uo=$('#username'),po=$('#password'),un=$.v(uo),pw=$.v(po);
		if($.clear(un).length==0){ 
				X.dialog.tips("请输入手机号码");
				uo.focus();
				return false;
			}
		if($.clear(pw).length==0){
				X.dialog.tips("请输入登录密码");
				po.focus();
				return false;
			}		
		//清理cookie
		X.ajax("/weixin_signin",$('#signin-form').serialize(),function(data){			
			if(data.success){
				window.location.href=data.done;
			}else{
				X.dialog.tips(data.message);
			}
		});		
	}
};
