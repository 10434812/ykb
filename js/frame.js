 /*farme*/
 $(function() {
 	var a = window.localStorage.getItem("a");
 	if (a === null) {
 		moveDataa();
 	} else {
 		set();
 	}

 	function moveDataa() {
 		var url = window.location.search;
 		var uri = window.location.hash;
 		if (url.length > 0) {
 			var loc = url.match(/=(\S*)&/)[1];
 			var tUrl = "https://uk.5zixi.com/app4friendv2/wechat_backUrl.jspx?";
 			tUrl += "code=" + loc;
 			tUrl += "&grant_type=authorization_code";
 			tUrl += "&state=USERID" + 0;
 			cookie.set("wl", loc, 7);
 			$.ajax({
 				type: "get",
 				url: tUrl,
 				async: true,
 				success: function(data) {
 					window.location = "fried.html";
 					window.localStorage.setItem("a", data);
 					var data = $.parseJSON(data);
 					$("#tx img:eq(0)").attr("src", data.image_url);
 					$("#tx p strong").html(data.nikename);
 					$("#dl p a").html("退出");
 					var personalData = window.localStorage.getItem("personalData");
 					if (personalData != null) {
 						personalData = $.parseJSON(personalData);
 						move(personalData.profession, personalData.skill, personalData.hobby, 1, 1, personalData.cost);
 					}
 				},
 				error: function(data) {
 					alert(data);
 				}
 			});
 		} else if (uri.length > 0) {
 			var toke = uri.match(/=(\S*)&expires_in/)[1].replace("&expires_in", "");
 			var Url = "https://graph.qq.com/oauth2.0/me?access_token=" + toke;
 			$.ajax({
 				type: "get",
 				url: Url,
 				async: true,
 				dataType: "jsonp",
 				jsonpCallback: "callback",
 				success: function(data) {
 					var URI = "/app4friendv2/qq_backUrl.jspx?access_token=" + toke;
 					URI += "&openid=" + data.openid;
 					URI += "&state=USERID" + 0; //id;
 					var openid = data.openid;
 					$.ajax({
 						type: "get",
 						url: URI,
 						async: true,
 						success: function(data) {
 							//var hash = hex_md5(URI);
 							cookie.set("qt", toke, 7);
 							cookie.set("qo", openid, 7);
 							window.location = "fried.html";
 							window.localStorage.setItem("a", data);
 							var data = $.parseJSON(data);
 							$("#tx img:eq(0)").attr("src", data.image_url);
 							$("#tx p strong").html(data.nikename);
 							$("#dl p a").html("退出");
 							var personalData = window.localStorage.getItem("personalData");
 							//alert(personalData);
 							if (personalData != null) {
 								personalData = $.parseJSON(personalData);
 								move(personalData.profession, personalData.skill, personalData.hobby, 1, 1, personalData.cost);
 							};
 							//window.location = "fried.html";
 						},
 						error: function(data) {
 							alert(JSON.stringify(data))
 						}
 					});
 				},
 				error: function(data) {
 					alert(JSON.stringify(data))
 				}
 			});
 		} else {
 			set();
 		};
 	}; //movedataa
 	function set() {
 		var a = window.localStorage.getItem("a")
 		var b = $.parseJSON(a);
 		$("#tx").click(function() {
 			if ($("#tx>p>strong").text() == "未登录") {
 				window.location = "index.html";
 			}
 		});
 		$("#tx img:eq(0)").attr("src", img());
 		$("#tx p strong").html(b.nikename);
 		$("#dl p a").html("退出");

 		function img() {
 			if (b.image_url == null || b.image_url == "") {
 				return "../img/txmr.png"
 			} else if ((b.image_url).indexOf('qlogo') !== -1) {
 				return b.image_url;
 			} else {
 				return "/app4friendv2" + b.image_url;
 			}
 		};
 		$("#dl").click(function() {
 			localStorage.removeItem('a');
 		});
 	}; //movedataa
 	//修改资料；
 	function move(jineng, zhiye, aihao, gender, state, cost) {
 		var a = window.localStorage.getItem("a")
 		var b = $.parseJSON(a);
 		var surl = 'https://uk.5zixi.com/app4friendv2/member_upMember.jspx?'
 		surl += "member.mobile=" +
 			b.mobile
 		surl += "&member.password=" +
 			b.password
 		surl += "&member.user_id=" +
 			b.user_id;
 		surl += "&member.nikename=" +
 			b.nikename;
 		surl += "&member.personallable=" +
 			+cost; //b.personallable;获取价值
 		surl += "&member.age=" +
 			b.age;
 		surl += "&member.gender=" +
 			gender;
 		surl += "&member.city=" +
 			b.city;
 		surl += "&member.profession=" +
 			jineng;
 		surl += "&member.person_label=" +
 			aihao;
 		surl += "&member.specialty_info=" +
 			zhiye
 		surl += "&member.image_url=" +
 			b.image_url
 		var state = state;
 		$.ajax({
 			type: "post",
 			url: surl,
 			async: true,
 			success: function(data) {
 				//alert(data)
 				var data = JSON.parse(data)
 				if (data.member_upMember.result == 1) {
 					if (state == 1) {
 						//alert("微信资料成功");
 						return null;
 					} else {
 						alert("修改资料成功");
 					}
 					$(".add_sources").css("display", "none")
 					$(".sources").text(jineng);
 					$(".job").text(zhiye);
 					$(".hobby").text(aihao);
 				}
 			}
 		});
 	};
 	//move
 });