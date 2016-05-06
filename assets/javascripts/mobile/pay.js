X.pay={};
X.pay.withdraw={
		/**
		 * 提款
		 */
		withdraw:function(){
			var amount = $("#amount").val();		
			if(amount=='' || parseFloat(amount) <= 0){
				X.dialog.tips("请输入提款金额");
				return false;
			}
			if(!X.valid.isMoney(amount)){
				X.dialog.tips("提款金额填写错误");
				return false;
			}
			if(1 > parseFloat(amount)){
				X.dialog.tips("提款金额不能小于1元");
				return false;
			}	
			if(parseFloat($("#balance").val())<parseFloat(amount)){
				X.dialog.tips("提款金额不能大于帐户余额");
				return false;
			}			
			X.dialog.confirm('您确定要提现吗？',{title:'提现',notify:function(nt){
			    if(nt==1){
					 X.ajax("/capital/withdraw", {"amount":amount},
						function(data){
							if(data.success){
								X.dialog.tips('提现成功');
							}else{
								X.dialog.tips(data.message);
							}
					});
			    }
			}});
		}
}
