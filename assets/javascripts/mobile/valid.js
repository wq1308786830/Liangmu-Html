String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

X.valid={
		isNumber:function(data,isPositive){
			return isPositive?/^\d+(\.\d{1,})?$/.test(data)&&parseFloat(data)>0:/^(-)?\d+(\.\d{1,})?$/.test(data);
		},
		isMoney:function(data,isPositive){
			return isPositive?/^\d+(\.\d{1,2})?$/.test(data)&&parseFloat(data)>0:/^(-)?\d+(\.\d{1,2})?$/.test(data);
		},
		isInt:function(data,isPositive){
			return isPositive?/^\d+$/.test(data)&&parseInt(data,10)>0:/^(-)?\d+$/.test(data);
		},
		isIdentityNumber : function(number) {
			if($.trim(number)==''||!/^[0-9]{17}[0-9X]$/.test(number)){
				return false;
			}
			var weights = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
			var parityBits = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4","3", "2");
			var power = 0;
			for ( var i = 0; i < 17; i++) {
				power += parseInt(number.charAt(i),10)*weights[i];
			}
			return parityBits[power%11]==number.substr(17);
		},
		isMobile:function(mobile){
			return mobile&&/^1[3-9]\d{9}$/.test(mobile);
		},
		isEmail:function(email){
			return email&&/^[0-9a-zA-Z_\-]+@[0-9a-zA-Z_\-]+\.\w{1,5}(\.\w{1,5})?$/.test(email);
		},
		isBankCard:function(cardNumber){
			return cardNumber&&/^\d{16,30}$/.test(cardNumber);
		},
		isChinaName:function(name){
			return name&&$.trim(name).length>=2&&!/^.*\\d{1,}.*$/.test(name);
		},
		isImg:function(filename){
			var imgs = ['.png','.bmp','.jpg','.jpeg','.gif'];
			for(var i=0;i<imgs.length;i++){
				if($.trim(filename).toLowerCase().endsWith(imgs[i]))
					return true;
			}
			return false;
		},
		isPwdValid:function(pwd){
			if($.trim(pwd).length<6){
				return {valid:false,msg:"密码必须由6-16位字符组成"};
			}else if($.trim(pwd).length>16){
				return {valid:false,msg:"密码必须由6-16位字符组成"};
			}else{
				if(/^\d+$/.test(pwd)){
					return {valid:false,msg:"密码不能全为数字"};
				}
			}
			return {valid:true,msg:''};
		},
		isUsernameValid:function(username){
			if($.trim(username)==''){
				return {valid:false,msg:'请输入用户名'};
			}else{
				if($.trim(username).length!=username.length){
					return {valid:false,msg:'用户名不能带有空格'};
				}else if($.strlen(username)>16||$.strlen(username)<4){
					return {valid:false,msg:"4-16个字符，中文算2个字符"};
				}else if(!/^[0-9a-zA-Z_\u4e00-\u9fa5]+$/.test(username)){
					return {valid:false,msg:'4-16位字母、数字、下划线或中文'};
				}else if(X.valid.isMobile(username)){
					return {valid:false,msg:'用户名不能是手机'};
				}else if(X.valid.isEmail(username)){
					return {valid:false,msg:"用户名不能是邮箱"};
				}else if(/.*?(\d+).*?/.test(username)&&X.valid.isMobile(RegExp.$1)){
					return {valid:false,msg:'用户名不能包含手机'};
				}
			}
			return {valid:true,msg:''};
		}
}