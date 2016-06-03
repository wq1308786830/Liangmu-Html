X.profile={};
X.boss_profile={};

X.profile.basic={

        /* 数据组装*/
        getFormData:function(){
            var config = {};
            config.nickname = $("input[name='nickname']").val();
            config.gender = $("input[name='gender']:checked").val();
            config.birthYear = $("select[name='birthYear']").find("option:selected").val();
            config.degree = $("select[name='degree']").find("option:selected").val();
            config.education = $("select[name='education']").find("option:selected").val();
            config.startWorkYear = $("select[name='workYear']").find("option:selected").val();
            config.functional1 = $("select[name='functional1']").find("option:selected").val();
            config.functional2 = $("select[name='functional2']").find("option:selected").val();
            config.currentTeam = $("input[name='currentTeam']").val();
            config.level = $("select[name='level']").find("option:selected").val();
            config.managementExperience = $("select[name='managementExperience']").find("option:selected").val();
            config.province = $("select[name='province']").find("option:selected").val();
            config.city = $("select[name='city']").find("option:selected").val();
            config.occupationalStatus = $("select[name='occupationalStatus']").find("option:selected").val();
            config.lowestSalary = $("select[name='salary']").find("option:selected").val();
            config.shield = $("input[name='shield']").val();

            return config;
        },
        /* 检测  */
        check:function(config){
            if($.trim(config.nickname)==''){
                X.dialog.tips("请输入昵称");
                return false;
            }
            if($.trim(config.gender)==''){
                X.dialog.tips("请输入性别");
                return false;
            }
            if(config.birthYear==0){
                X.dialog.tips("请输入出生年份");
                return false;
            }
            if(config.degree==0){
                X.dialog.tips("请输入最高学历");
                return false;
            }
            if(config.education==''){
                X.dialog.tips("请输入教育背景");
                return false;
            }
            if(config.startWorkYear==0){
                X.dialog.tips("请输入工作起始");
                return false;
            }
            if($.trim(config.currentTeam)==''){
                X.dialog.tips("请输入当前服务的公司");
                return false;
            }
            if($.trim(config.functional2)==''){
                X.dialog.tips("请输入职能");
                return false;
            }            
            if(config.level==0){
                X.dialog.tips("请输入层级");
                return false;
            }
            if($.trim(config.managementExperience)==''){
                 X.dialog.tips("请输入管理经验");
                 return false;
            }
            if($.trim(config.city)==''){
                X.dialog.tips("请输入工作地点");
                return false;
            }
            if(config.occupationalStatus==''){
                X.dialog.tips("请输入职业状态");
                return false;
            }
            if(config.lowestSalary==0){
                X.dialog.tips("请输入期望薪水");
                return false;
            }
            return true;
        }, 
		/* 提交申请 */
		submit:function(done){
	       var config = X.profile.basic.getFormData();
	       if(X.profile.basic.check(config)){
                var param="";
                for(key in config){
                    param += key+'='+encodeURI(config[key])+'&';
                }
                X.ajax("/profile/basic",param,function(data){
                    if(data.success){
                        X.dialog.tips("保存成功");
                        X.timing.setInterval(function(){
                            if(done){
                                window.location.href=done;
                            } else {
                                window.location.href="/profile/tag";
                            }
                        },500);        
                    }else{
                        X.dialog.tips(data.message);
                    }
                });
	       }
		},

};

X.profile.tag={

        /* 数据组装*/
        getFormData:function(){
            var config = {};

            config.serviceTeams = [];
            $("ul.serviceTeam li.curr").each(function(){ config.serviceTeams.push($(this).attr("data")); });            

            config.industries = [];
            $("ul.industries li.curr").each(function(){ config.industries.push($(this).attr("data")); });
            config.price = $("input[name='price']").val();

            return config;
        },
        /* 检测  */
        check:function(config){
            if(config.serviceTeams.length==0){
                X.dialog.tips("请输入服务过的团队");
                return false;
            }
            if(config.industries.length==0){
                X.dialog.tips("请输入行业偏好");
                return false;
            }
            if($.trim(config.price)==''){
                X.dialog.tips("请输入我的报价");
                return false;
            }
            if(!X.valid.isMoney(config.price)){
                X.dialog.tips("我的报价填写错误");
                return false;
            }
            if(!X.valid.isInt(config.price)){
                X.dialog.tips("沟通礼金只能输入整数!");
                return false;

            }

            return true;
        }, 
        /* 提交申请 */
        submit:function(done){
           var config = X.profile.tag.getFormData();
           if(X.profile.tag.check(config)){
                var param="";
                for(key in config){
                    param += key+'='+encodeURI(config[key])+'&';
                }
                X.ajax("/profile/tag",param,function(data){
                    if(data.success){
                        X.dialog.tips("保存成功");
                        X.timing.setInterval(function(){
                            if(done){
                                window.location.href=done;
                            } else {
                                window.location.href="/mine";
                            }
                        },500);                      
                    }else{
                        X.dialog.tips(data.message);
                    }
                });
           }
        },

};

X.profile.avatar={
        //验证照片
        legalizeIMG:function(){
                var picture1= $("#avatar").val();
                if(''==picture1){
                    X.dialog.tips('请选择照片');
                    return false;
                }
                
                if(!X.valid.isImg(picture1)){
                    X.dialog.tips("照片必须是图片");
                    return false;
                }
                X.loading.show();
                $("#uploadAvatar").submit();
        },
        submit:function(dom,target){
            var param;
            for(var i=0;i<dom.length;i++){
                if(dom[i].checked){param = "avatar="+dom[i].getAttribute("value");}
            }

            X.ajax(target+"/profile/upload_avatar",param,function(data){
                    if(data.success){
                        X.dialog.tips("设置成功");
                        X.timing.setInterval(function(){
                            window.location.href=target+"/mine";
                        },500);
                    }else{
                        X.dialog.tips(data.message);
                    }
            });
        },
};

X.profile.resume={
        //验证简历
        legalizeIMG:function(){
                var picture1= $("#resume").val();
                if(''==picture1){
                    X.dialog.tips('请选择简历');
                    return false;
                }

                X.loading.show();
                $("#uploadResume").submit();
        },
        
        delete:function(){
            X.dialog.confirm('您确认要删除简历吗？',{title:'删除简历',notify:function(nt){
                if(nt == 1){//表示确定
                    X.ajax("/profile/delete_resume",{},function(data){
                        if(data.success){
                            X.dialog.tips("删除成功");
                            X.timing.setInterval(function(){
                                window.location.href="/profile/upload_resume";
                            },500);                    
                        }else{
                            X.dialog.tips(data.message);
                        }
                    });                    
                }
            }});
        }
};

X.profile.price = {

        /* 数据组装*/
        getFormData:function(){
            var config = {};
            config.price = $("input[name='price']").val();
            return config;
        },
        /* 检测  */
        check:function(config){
            if($.trim(config.price)==''){
                X.dialog.tips("请输入我的报价");
                return false;
            }
            if(!X.valid.isMoney(config.price)){
                X.dialog.tips("我的报价填写错误");
                return false;
            }            
            return true;
        }, 
        /* 提交申请 */
        submit:function(done){
           var config = X.profile.price.getFormData();
           if(X.profile.price.check(config)){
                var param="";
                for(key in config){
                    param += key+'='+encodeURI(config[key])+'&';
                }
                X.ajax("/profile/communication_price",param,function(data){
                    if(data.success){
                        X.dialog.tips("保存成功");    
                        X.timing.setInterval(function(){
                            window.location.href="/mine";
                        },500);                                           
                    }else{
                        X.dialog.tips(data.message);
                    }
                });
           }
        },

};

/////////////////////////////////


X.boss_profile.basic={

        /* 数据组装*/
        getFormData:function(){
            var config = {};
            config.nickname = $("input[name='nickname']").val();
            config.gender = $("input[name='gender']:checked").val();
            config.corporation = $("input[name='corporation']").val();
            config.title = $("input[name='title']").val();
            return config;
        },
        /* 检测  */
        check:function(config){
            if($.trim(config.nickname)==''){
                X.dialog.tips("请输入昵称");
                return false;
            }
            if($.trim(config.gender)==''){
                X.dialog.tips("请输入性别");
                return false;
            }
            if($.trim(config.corporation)==''){
                X.dialog.tips("请输入所在公司");
                return false;
            }                      
            if($.trim(config.title)==''){
                X.dialog.tips("请输入职位名称");
                return false;
            }                      
            return true;
        }, 
        submit:function(){
           var config = X.boss_profile.basic.getFormData();
           if(X.boss_profile.basic.check(config)){
                X.loading.show();
                $("#form").submit();
           }
        },        
};


X.boss_profile.create_corp={
        /* 数据组装*/
        check:function(){
            var config = {};
            config.brandName = $("input[name='brandName']").val();
            config.fullName = $("input[name='fullName']").val();
            config.industry = $("select[name='industry']").find("option:selected").val();
            config.licensePicture = $("#licensePicture").val();
            if($.trim(config.brandName)==''){
                X.dialog.tips("请输入品牌名称");
                return false;
            }     
            if($.trim(config.fullName)==''){
                X.dialog.tips("请输入公司全名");
                return false;
            }     
            if($.trim(config.industry)==''){
                X.dialog.tips("请输入所在行业");
                return false;
            }     
            if($.trim(config.licensePicture)==''){
                X.dialog.tips("请选择营业执照");
                return false;
            }  
            return true;   
        },

        //验证简历
        submit:function(){
            if(X.boss_profile.create_corp.check()){
                X.loading.show();
                $("#form").submit();
            }
        }

};