// $(function() {
// 	var d = window.localStorage.getItem("ww");
// 	var ping = window.localStorage.getItem("ping");
// 	var pin = $.parseJSON(ping)
// 	var d = $.parseJSON(c);
// 	var i = window.localStorage.getItem("t");
// 	console.log(i)
// 	//判断匿名实名
// 	function bbimg(data){
// 		if(data.anonymous==0){
// 			return tx(data);
// 		}else{
// 			return '../img/txmr.png';
// 		}
// 	}
// 	function bbname(data){
// 		if(data.anonymous==0){
// 			return name(data);
// 		}else{
// 			return '匿名用户';
// 		}
// 	}
// 	function tx(data) {
// 		if(data.image_url == null) {
// 			return "../img/txmr.png"
// 		} else if((data.image_url).indexOf('/image/') !== -1) {
// 			return "/app4friendv2" + d[i].image_url;
// 		} else {
// 			return data.image_url.replace(/http/g, "https");
// 		}
// 	};

// 	function imgs() {
// 		if(d[i].imgurls == null) {
// 			return "../img/txmr.png"
// 		} else if(d[i].imgurls.indexOf("jpeg") != -1) {
// 			return "/app4friendv2" + d[i].imgurls.substring(0, 25);
// 		} else {
// 			return "/app4friendv2" + d[i].imgurls.substring(0, 24);
// 		}
// 	};

// 	function name(data) {
// 		if((data.nikename) == "nikename" || (data.nikename) == "(null)" || (data.nikename) == null) {
// 			return "有空帮用户"
// 		} else {
// 			return data.nikename;
// 		};
// 	};

// 	function jn() {
// 		if(d[i].specialty_info == null) {
// 			return "&nbsp;TA&nbsp;"
// 		} else {
// 			return "&nbsp;" + (d[i].specialty_info).replace(/,/g, "").substring(0, 4) + "&nbsp;";
// 		}
// 	};

// 	function zy() {
// 		if(d[i].profession == null) {
// 			return "&nbsp;犯懒&nbsp;"
// 		} else {
// 			return "&nbsp;" + d[i].profession.replace(/,/g, "").substring(0, 4) + "&nbsp;";
// 		}
// 	};

// 	function ah() {
// 		if(d[i].person_label == null) {
// 			return "&nbsp;未填&nbsp; "
// 		} else {
// 			return "&nbsp;" + d[i].person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
// 		}
// 	};

// 	var str = '<div class="top">' +
// 		'<img class="tx" src=' + bbimg(d[i]) + '>' +
// 		'<p class="user_name">' + bbname(d[i]) + '</p>' +
		
// 		'</div>' +
// 		'<p class="user_text">' + d[i].content + '</p>' +
// 		'<div class="user_img">' +
// 		'<img src=' + imgs() + ' > ' +
// 		'</div>' +
// 		'<p class="pl">全部评论</p>'
// 	// var zan='<div class="Zan">' +
// 	// 	'<span class="zan">赞  ' + d[i].zan_num + '</span><span>评 ' + d[i].pin_num + '</span><span class="bj">编辑|分享</span>' +
// 	// 	'</div>' ;
// 	var niming='<p class="lzl"><span class="lan">' + zy() + '</span><span class="zi">' + jn() + '</span><span class="lv">' + ah() + '</span></p>' ;
// 	$(".body").append(str);
// 	if(d[i].anonymous==0){//判断匿名
// 		$('.top').append(niming);
// 	}
// 	for(var i = 0; i < pin.length; i++) {
// 		function pintx(data) {
// 			if(data.image_url == null) {
// 				return "../img/txmr.png"
// 			} else if((data.image_url).indexOf('/image/') !== -1) {
// 				return "/app4friendv2" + data.image_url;
// 			} else {
// 				return data.image_url;
// 			}
// 		};

// 		function pinname(data) {
// 			if((data.nikename) == "nikename" || (data.nikename) == "(null)" || (data.nikename) == null) {
// 				return "有空帮用户"
// 			} else {
// 				return data.nikename;
// 			};
// 		};
// 		var qwe = '<li class="ping">' +
// 			'<img class="tx" src=' + aaimg(pin[i]) + '>' +
// 			'<p class="user_name">' + aaname(pin[i]) + '</p>' +
// 			'<p class="user_ping">' + pin[i].pincontent + ' </p>' +
// 			'</li>'
// 		$("#Ww").append(qwe);
// 	};

// 	//评论
// 	$(".input").click(function(e) {
// 		$("#qwe").css("display", "block");
// 		$("#qwer").css("display","block");
// 	})
// 	$("#qwe span:eq(0)").click(function() {
// 		$("#qwe").css("display", "none");
// 		$("#qwer").css("display", "none");
// 	})
// 	$("#qwe span:eq(2)").click(function() {
// 		$("#nr").focus();
// 		var a = window.localStorage.getItem("a");
// 		var b = $.parseJSON(a);
// 		var c = window.localStorage.getItem("ww");
// 		var d = $.parseJSON(c);
// 		var t = $(this).parent().parent().index() - 1;
// 		var cofid = d[t].id;
// 		var Url = '/app4friendv2/portal_appBaseQuery.jspx?';
// 		Url += 'project=COFFEESAY';
// 		Url += '&modul=insertCoffeePin';
// 		Url += '&returnType=UPDATE';
// 		Url += '&userid=' + b.user_id;
// 		Url += '&coffeeid=' + cofid;
// 		Url += '&pincontent=' + $("#nr").val();
// 		Url += '&anonymous='+$('#select').val();//0匿名1实名
// 		Url += '&visible=1';
// 		$.ajax({
// 			url: Url,
// 			cache: true,
// 			type: 'get',
// 			success: function(data) {
// 				// console.log(Url);
// 				// console.log(data)
// 				var qe = '<li class="ping">' +
// 					'<img class="tx" src='  + aaimg(b) + '>' +
// 					'<p class="user_name">' + aaname(b) + '</p>' +
// 					'<p class="user_ping">' + $("#nr").val() + ' </p>' +
// 					'</li>'
// 				$("#Ww").prepend(qe);
// 				$("#qwe").css("display", "none");
// 				$("#qwer").css("display", "none");
// 			},
// 			error: function(data) {
// 				alert('error');
// 			}
// 		});
// 	})
// //判断匿名实名
// function aaimg(data){
// 	if(data.anonymous==0){
// 		return pintx(data);
// 	}else{
// 		return '../img/txmr.png';
// 	}
// }
// function aaname(data){
// 	if(data.anonymous==0){
// 		return pinname(data);
// 	}else{
// 		return '匿名用户';
// 	}
// }
// })
userinfor=eval('('+window.localStorage.getItem("a")+')');
ping=eval('('+window.localStorage.getItem("ping")+')');
new Vue({
  el: '#app',
  data: {
    item:ping,
    httpHead:'https://uk.5zixi.com/app4friendv2',
    isok:true,
    evaluate:'',
    isok:false
  },
  mounted(){//初始化
  	 this.getquestions();
  },	
  watch:{
    	user_page(){
    		this.loader=true;
    		this.getquestions();
    	},
    	evaluate(){
    	 	console.log(this.evaluate);
    	}
    },
  methods: {
  	getquestions(){
  		var Url = this.httpHead+'/app4friendv2/portal_appBaseQuery.jspx?project=COFFEESAY&modul=listCoffeePin&returnType=LIST&coffeeid='+ping.id+'&pageSize=100&currentPage=1';
		this.$http.get(Url).then(res=>{
			this.evaluate=eval('('+res.body+')');
		},err=>{});
	},
    user_img(data){
		 if(data.indexOf('qlogo')!=-1){
		 	return data;
		 }else{
		 	return 'https://uk.5zixi.com/app4friendv2'+data;
		 }
		},
	user_imgs(data){
		 if(data.anonymous==0){
		 	if(data.image_url.indexOf('qlogo')!=-1){
		 	return data.image_url;
		 	}else{
		 	return 'https://uk.5zixi.com/app4friendv2'+data.image_url;

		 	}
		 }else{
		 	return 'https://uk.5zixi.com/app4friendv2/image/1496744425213.png';
		 }
		},
	user_names(data){
		 if(data.anonymous==0){
		 	return data.nikename;
		 }else{
		 	return '匿名';
		 }
		},
	zan(data){
			var Url = 'https://uk.5zixi.com/app4friendv2/portal_appBaseQuery.jspx?';
					Url += 'project=COFFEESAY';
					Url += '&modul=insertCoffeeZan';
					Url += '&returnType=UPDATE';
					Url += '&userid=' + userinfor.id;
					Url += '&coffeeid=' + data;

			this.$http.get(Url).then(res=>{},err=>{});
			this.itemp.zan_num++;
		},
	content_img(data){
		if(data==null){
		 	return '../img/txmr.png';
		 }else{
		 	return this.httpHead+data;
		 }
	},
	showbigimg(data,that){
		this.isok=false;
		if(data==null){
		 	this.big_url='../img/txmr.png';
		 }else{
		 	this.big_url=this.httpHead+'/app4friendv2'+data;
		 }
	},
	add_questions(){
		this.user_page+=5;
	},
	comment(item){//评价
		var Url = this.httpHead+'/app4friendv2/portal_appBaseQuery.jspx?project=COFFEESAY&modul=listCoffeePin&returnType=LIST&coffeeid='+item.id+'+&pageSize=100&currentPage=1';
		this.$http.get(Url).then(res=>{
			window.localStorage.setItem("t",index);
			window.localStorage.setItem("ping",JSON.stringify(res.body));
			window.location = "ping.html";
		},err=>{});
		
	},
	compile(item){//编辑
			window.localStorage.setItem("con",item.content);
			window.localStorage.setItem("img",item.imgurls);
			window.location = "bianji.html";
	},
	// 判断图片方向
	img_direction(that){

	  },
	pin(){
		this.isok=true;
	},
	pinContent(){
		var Url = '/app4friendv2/portal_appBaseQuery.jspx?';
		Url += 'project=COFFEESAY';
		Url += '&modul=insertCoffeePin';
		Url += '&returnType=UPDATE';
		Url += '&userid=' + userinfor.user_id;
		Url += '&coffeeid=' +ping.id;
		Url += '&pincontent=' + $("#nr").val();
		Url += '&anonymous='+$('#select').val();//0匿名1实名
		Url += '&visible=1';
		this.$http.get(Url).then(res=>{
			this.isok=false;
			this.getquestions();
		},err=>{});
	}
  }//methods
})

























	









