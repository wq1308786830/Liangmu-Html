X.functional={
	p:null, c:null, dp:'', dc:'',nosel:true,

    province: ["研发", "产品", "设计", "运营", "服务","市场","销售","人事","财务","行政","法务"],

    citys : [["研发","前端开发"],["研发","后端开发"],["研发","IOS开发"],["研发","安卓开发"],["研发","测试"],["研发","运维"],["研发","DBA"],["研发","硬件开发"],["研发","技术管理"],
    ["产品","产品经理"],["产品","产品管理"],
    ["设计","视觉设计"],["设计","交互设计"],["设计","用研"],["设计","平面"],["设计","原型设计"],["设计","设计管理"],
    ["运营","策划"],["运营","编辑"],["运营","推广"],["运营","内容运营"],["运营","产品运营"],["运营","数据运营"],["运营","用户运营"],["运营","活动运营"],["运营","商家运营"],["运营","品类运营"],["运营","游戏运营"],["运营","网店运营"],["运营","新媒体运营"],["运营","海外运营"],["运营","运营管理"],
    ["服务","服务"],["服务","服务管理"],
    ["市场","营销"],["市场","公关"],["市场","广告"],["市场","市场管理"],
    ["销售","BD"],["销售","大客户"],["销售","渠道"],["销售","电话"],["销售","销售管理"],
    ["人事","招聘"],["人事","薪酬"],["人事","培训"],["人事","OC/ER"],["人事","HRBP"],["人事","OD"],["人事","综合"],
    ["财务","会计"],["财务","出纳"],["财务","财务"],["财务","结算"],["财务","税务"],["财务","审计"],["财务","风控"],["财务","综合"],
    ["行政","行政"],
    ["法务","法务"]],


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