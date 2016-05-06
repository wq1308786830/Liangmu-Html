X.boss_contact={
    favorite_post: function(applicantId, jobId){
        X.ajax("/boss/applicant/favorite",{"applicantId": applicantId, "jobId": jobId},function(data){
            if(data.success){
                X.dialog.tips("收藏成功");
                X.timing.setInterval(function(){
                    window.location.reload();
                },500);                      
            }else{
                X.dialog.tips(data.message);
            }
        });    
    },
};