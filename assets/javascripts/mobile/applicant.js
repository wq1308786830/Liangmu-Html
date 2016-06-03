X.applicant={};


X.applicant.rate={

        /* 数据组装*/
        getFormData:function(){
            var config = {};
            config.applicantId = $("input[name='applicantId']").val();
            config.jobId = $("input[name='jobId']").val();
            config.skillRating = $("span[id='skillRating']").attr("data");
            config.overallRating = $("span[id='overallRating']").attr("data");
            config.talentDescriptionRating = $("span[id='talentDescriptionRating']").attr("data");
            config.note = $("textarea[name='note']").val();
            return config;
        },
        /* 检测  */
        check:function(config){
            if($.trim(config.skillRating)==''){
                X.dialog.tips("请输入专业能力评分");
                return false;
            }
            if($.trim(config.overallRating)==''){
                X.dialog.tips("请输入综合素质评分");
                return false;
            }
            if($.trim(config.talentDescriptionRating)==''){
                X.dialog.tips("请输入简历描述真实性评分");
                return false;
            }
            return true;
        }, 
        submit:function(){
           var config = X.applicant.rate.getFormData();
           if(X.applicant.rate.check(config)){
                var param="";
                for(key in config){
                    param += key+'='+encodeURI(config[key])+'&';
                }
                X.ajax("/boss/applicant/applicant_rating",param,function(data){
                    if(data.success){
                        X.dialog.tips("评价成功");
                    }else{
                        X.dialog.tips(data.message);
                    }
                });           
           }
        },        
};