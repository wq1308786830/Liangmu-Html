X.job={};

X.job.save={

        /* 数据组装*/
        getFormData:function(){
            var config = {};
            config.name = $("input[name='name']").val();
            config.reportTo=$("input[name='reportTo']").val();
            config.functional1 = $("select[name='functional1']").find("option:selected").val();
            config.functional2 = $("select[name='functional2']").find("option:selected").val();            
            config.lowestSalary = $("select[name='salary']").find("option:selected").val();
            config.workExperience = $("select[name='workExperience']").find("option:selected").val();
            config.province = $("select[name='province']").find("option:selected").val();
            config.city = $("select[name='city']").find("option:selected").val(); 
            config.level = $("select[name='level']").find("option:selected").val();
            config.jobIntroduction = $("textarea[name='jobIntroduction']").val();
            config.jobId = $("input[name='jobId']").val();
            config.tags = [];
            $("ul.tags li.curr").each(function(){ config.tags.push($(this).text()); });
            return config;
        },
        /* 检测  */
        check:function(config){
            if($.trim(config.name)==''){
                X.dialog.tips("请输入职位名称");
                return false;
            }
            if($.trim(config.functional2)==''){
                X.dialog.tips("请输入职位职能");
                return false;
            }
            if($.trim(config.lowestSalary)==''){
                X.dialog.tips("请输入起步年薪");
                return false;
            }
            if($.trim(config.workExperience)==''){
                X.dialog.tips("请输入工作经验");
                return false;
            }                      
            if($.trim(config.city)==''){
                X.dialog.tips("请输入工作地点");
                return false;
            }   
            if($.trim(config.level)==''){
                X.dialog.tips("请输入层级");
                return false;
            }  
            if($.trim(config.jobIntroduction)==''){
                X.dialog.tips("请输入职位介绍");
                return false;
            }                      
            return true;
        }, 
        submit:function(action){
           var config = X.job.save.getFormData();
           config.action = action;
           if(X.job.save.check(config)){
                var param="";
                for(key in config){
                    param += key+'='+encodeURI(config[key])+'&';
                }
                X.ajax("/boss/job/save",param,function(data){
                    if(data.success){
                        X.dialog.tips("保存成功");
                        X.timing.setInterval(function(){
                            window.location.href="/boss/jobs";
                        },500);        
                    }else{
                        X.dialog.tips(data.message);
                    }
                });           
           }
        },        
};


X.job.delivery={
        submit:function(jobId){
            X.ajax("/job/delivery",{"jobId":jobId},function(data){
                if(data.success){
                    X.dialog.tips("投递成功");
                    X.timing.setInterval(function(){
                    	//投递成功后，创建一个沟通，进入消息页面
                    	window.location.href="/system_messages"
                        //window.location.reload();
                    },500);                       
                }else{
                    X.dialog.tips(data.message);
                }
            });           
        },  
};

X.job.follow={
        submit:function(jobId){
            X.ajax("/job/follow",{"jobId":jobId},function(data){
                if(data.success){
                    X.dialog.tips("关注成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);                       
                }else{
                    X.dialog.tips(data.message);
                }
            });           
        },  
};

X.job.unfollow={
        submit:function(jobId){
            X.ajax("/job/unfollow",{"jobId":jobId},function(data){
                if(data.success){
                    X.dialog.tips("取消关注成功");
                    X.timing.setInterval(function(){
                        window.location.reload();
                    },500);                       
                }else{
                    X.dialog.tips(data.message);
                }
            });           
        },  
};


X.job.hide={
        submit:function(jobId){
            X.ajax("/boss/job/hide",{"jobId":jobId},function(data){
                if(data.success){
                    X.dialog.tips("职位关闭成功");
                    window.location.reload();

                }else{
                    X.dialog.tips(data.message);
                }
            });           
        },  
};

X.job.publish={
        submit:function(jobId){
            X.ajax("/boss/job/publish",{"jobId":jobId},function(data){
                if(data.success){
                    X.dialog.tips("职位发布成功");
                }else{
                    X.dialog.tips(data.message);
                }
            });           
        },  
};

X.job.rate={

        /* 数据组装*/
        getFormData:function(){
            var config = {};
            config.jobId = $("input[name='jobId']").val();
            config.jobDescriptionRating = $("span[id='jobDescriptionRating']").attr("data");
            config.interviewerRating = $("span[id='interviewerRating']").attr("data");
            config.corporateEnvironmental = $("span[id='corporateEnvironmental']").attr("data");
            config.note = $("textarea[name='note']").val();
            return config;
        },
        /* 检测  */
        check:function(config){
            if($.trim(config.jobDescriptionRating)==''){
                X.dialog.tips("请输入职位描述评分");
                return false;
            }
            if($.trim(config.interviewerRating)==''){
                X.dialog.tips("请输入面试官评分");
                return false;
            }
            if($.trim(config.corporateEnvironmental)==''){
                X.dialog.tips("请输入公司环境评分");
                return false;
            }
            return true;
        }, 
        submit:function(){
           var config = X.job.rate.getFormData();
           if(X.job.rate.check(config)){
                var param="";
                for(key in config){
                    param += key+'='+encodeURI(config[key])+'&';
                }
                X.ajax("/job/job_rating",param,function(data){
                    if(data.success){
                        X.dialog.tips("评价成功");
                    }else{
                        X.dialog.tips(data.message);
                    }
                });           
           }
        },        
};