/*登录验证*/
$(function() {
	var a = localStorage.getItem("a");
	if (a != null) {
		window.location = "fried.html";
	} else {
		// var qt = cookie.get("qt");
		// var wl = cookie.get("wl");
		// if (qt != null) {
		// 	var qo = cookie.get("qo");
		// 	var qurl = "https://uk.5zixi.com/app4friendv2/qq_backUrl.jspx?access_token=" + qt;
		// 	qurl += "&openid=" + qo;
		// 	qurl += "&state=USERID" + 0;
		// 	getuser(qurl);
		// } else if (wl != null) {
		// 	var tUrl = "https://uk.5zixi.com/app4friendv2/wechat_backUrl.jspx?";
		// 	tUrl += "code=" + wl;
		// 	tUrl += "&grant_type=authorization_code";
		// 	tUrl += "&state=USERID" + 0;
		// 	getuser(tUrl);
		// } else {
		// 	
		// }
		qwe();
		function getuser(url) {
			$.ajax({
				type: "get",
				url: tUrl,
				async: true,
				success: function(data) {
					alert(data);
					window.location = "fried.html";
					window.localStorage.setItem("a", data);
				},
				error: function(err) {
					alert('error');
				}
			});
		}

		function qwe() {
			$(".inp input").eq(0).focus();
			$("#Dl").click(function() {
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				var pass = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
				if (!myreg.test($(".inp input").eq(0).val())) {
					$(".inp input").eq(0).val("");
					$(".inp input").eq(0).attr("placeholder", "手机号无效");
					$(".inp input").eq(0).focus();
					return false;
				} else if (!pass.test($(".inp input").eq(1).val())) {
					$(".inp input").eq(1).val("");
					$(".inp input").eq(1).attr("placeholder", "密码无效");
					$(".inp input").eq(1).focus();
					return false;
				}
				var user_name = $(".inp input:eq(0)").val();
				var user_pass = $(".inp input:eq(1)").val();
				tj(user_name, user_pass);
			});
		}

		function tj(user_name, user_pass) {
			$.ajax({
				type: "post",
				url: "/app4friendv2/member_getLogin.jspx",
				data: {
					'member.mobile': user_name,
					'member.password': user_pass,
					'member.token': 'abc123'
				},
				async: true,
				dataType: "json",
				success: function(data) {
					if (data.member_getLogin) {
						alert('帐号或密码错误');
					} else {
						//cookie.set("id", data.user_id, 7);
						window.location = "frame.html";
						window.localStorage.setItem("a", JSON.stringify(data));
					}
				},
				error: function(xhr, errorText, errorType) {
					alert("发送异常");
				},
			});
		}
		$(".weibo").click(function() {
			window.location = "jiazhi.html";
		});
		$(".weixin img").click(function() {
			cookie.clearCookie();
			var URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf07a2aadb806a199&redirect_uri=https://open.weixin.qq.com/connect/qrconnect?appid=wxc6c8b730184cfa27&redirect_uri=https://uk.5zixi.com/html/frame.html&response_type=code&scope=snsapi_login&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
			//var URL = "https://open.weixin.qq.com/connect/qrconnect?appid=wxc6c8b730184cfa27&redirect_uri=https://uk.5zixi.com/html/frame.html&response_type=code&scope=snsapi_login"
			URL += "&state=" + 1;
			window.location = URL;
		});

		$(".qq img").click(function() {
			cookie.clearCookie();
			var URL = "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101368634&redirect_uri=https%3a%2f%2fuk.5zixi.com%2fhtml%2fframe.html";
			URL += "&state=" + 2;
			window.location = URL;
		});
	}
});