X.functional={
	p:null, c:null, dp:'', dc:'',nosel:true,
	
    province: ["研发", "产品", "运营", "设计", "市场/销售"],

    citys : [["研发","前端开发"],["研发","后端开发"],["研发","移动开发"],["研发","测试"],["研发","技术管理岗位"],["研发","硬件开发"],
                ["产品","产品经理"],["产品","产品管理岗位"],
                ["运营","网站运营"],["运营","用户运营/内容运营"],["运营","运营管理岗位"],
                ["设计","视觉设计"],["设计","交互设计"],["设计","设计管理岗位"],
                ["市场/销售","公关"],["市场/销售","市场/营销"],["市场/销售","销售"],["市场/销售","BD"],["市场/销售","管理岗位"]],

	//加载下拉列表
	init:function(ps){
		var t=this;
		t.p=$(ps.province);
		t.c=$(ps.city);
		t.dp=ps.dp;
		t.dc=ps.dc;
		t.getProvince();
	},
	//获取省份
	getProvince:function(){
		var t=this,so=-1,pv='';
		if($.no(t.p))return;
		if(t.nosel){t.addOption(t.p,'请选择','');}
		$(t.province).each(function(i,v){
			t.addOption(t.p,v,v);
			if(t.dp==v){so=i;pv=v;}
		});	
		setTimeout(function(){
			if(so!=-1){t.p.val(pv);}
		},0);
		t.loadCity(pv);
		t.p.change(function(){
			t.loadCity(t.p.val());
		});
	},
	//获取城市
	getCity:function(pv){
		var t=this,tem=[];
		$(t.citys).each(function(i,v){
			if(v[0]==pv){
				tem.push([v[0],v[1]]);
			}
		});	
		return tem;
	},
	//加载城市
	loadCity:function(pv){
		var t=this,so,cv;
		if(t.c!=null&&t.c.length==0)return;
		t.c.empty();
		if(pv==''){t.addOption(t.c,'请选择','');return;}
		var cities = t.getCity(pv);
		$(cities).each(function(i,v){
			t.addOption(t.c,v[1],v[1]);
			if(t.dc==v[1]){so=i;cv=v[1];}
		});
		setTimeout(function(){
			if(so){t.c.val(cv);}
		},0);

	},
	//添加选项内容
	addOption:function(se,text,value){
		var theOption=$('<option value="'+value+'">'+text+'</option>');
		se.append(theOption);
	}
};