X.message={};
X.message.applicant={
        send_message:function(){
            var config = {};
            config.content = $("input[name='content']").val();
            config.jobId = $("input[name='jobId']").val();
            config.receiveId = $("input[name='receiveId']").val();
            
            if($.trim(config.content)==''){
                X.dialog.tips("请输入消息");
                return false;
            }            
            
            var param="";
            for(key in config){
                param += key+'='+encodeURI(config[key])+'&';
            }
            X.ajax("/message/send_message",param,function(data){
                if(data.success){
                    X.dialog.tips("成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);  
                    $("input[name='content']").val("")
                }else{
                    X.dialog.tips(data.message);
                }
            });
        },
        
        send_resume:function(jobId,receiveId){
            var config = {};
            config.jobId = jobId;
            config.receiveId = receiveId;
            
            var param="";
            for(key in config){
                param += key+'='+encodeURI(config[key])+'&';
            }
            X.ajax("/message/send_resume",param,function(data){
                if(data.success){
                    X.dialog.tips("发送简历成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);
                }else{
                    X.dialog.tips(data.message);
                }
            });
        },        
        
        send_mobile:function(jobId,receiveId){
            var config = {};
            config.jobId = jobId;
            config.receiveId = receiveId;
            
            var param="";
            for(key in config){
                param += key+'='+encodeURI(config[key])+'&';
            }
            X.ajax("/message/send_mobile",param,function(data){
                if(data.success){
                    X.dialog.tips("发送手机号码成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);                   
                }else{
                    X.dialog.tips(data.message);
                }
            });
        },     
        
        send_system_message:function(){
            var config = {};
            config.content = $("input[name='content']").val();
            
            if($.trim(config.content)==''){
                X.dialog.tips("请输入消息");
                return false;
            }            
            
            var param="";
            for(key in config){
                param += key+'='+encodeURI(config[key])+'&';
            }
            X.ajax("/message/send_system_message",param,function(data){
                if(data.success){
                    X.dialog.tips("成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);      
                }else{
                    X.dialog.tips(data.message);
                }
            });
        },           
}

X.message.boss={
        send_message:function(){
            var config = {};
            config.content = $("input[name='content']").val();
            config.jobId = $("input[name='jobId']").val();
            config.receiveId = $("input[name='receiveId']").val();
            
            if($.trim(config.content)==''){
                X.dialog.tips("请输入消息");
                return false;
            }            
            
            var param="";
            for(key in config){
                param += key+'='+encodeURI(config[key])+'&';
            }
            X.ajax("/boss/message/send_message",param,function(data){
                if(data.success){
                    X.dialog.tips("成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);  
                    $("input[name='content']").val("");
                }else{
                    X.dialog.tips(data.message);
                }
            });
        },
        send_mobile:function(jobId,receiveId){
            var config = {};
            config.jobId = jobId;
            config.receiveId = receiveId;
            
            var param="";
            for(key in config){
                param += key+'='+encodeURI(config[key])+'&';
            }
            X.ajax("/boss/message/send_mobile",param,function(data){
                if(data.success){
                    X.dialog.tips("发送手机号码成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);
                }else{
                    X.dialog.tips(data.message);
                }
            });
        },  
        send_system_message:function(){
            var config = {};
            config.content = $("input[name='content']").val();
            
            if($.trim(config.content)==''){
                X.dialog.tips("请输入消息");
                return false;
            }            
            
            var param="";
            for(key in config){
                param += key+'='+encodeURI(config[key])+'&';
            }
            X.ajax("/boss/message/send_system_message",param,function(data){
                if(data.success){
                    X.dialog.tips("成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);      
                }else{
                    X.dialog.tips(data.message);
                }
            });
        },                 
}