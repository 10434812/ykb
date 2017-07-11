/*帐号注册*/
$(function() {
	var num;
	var user_nam;
	var user_pas;
	var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	$(".b5").click(function() {
		if(!myreg.test($(".b1").val())) {
			$(".b1").val("");
			$(".b1").attr("placeholder", "手机号无效");
			$(".b1").focus();
			return false;
		}
		$(this).val("正在发送")
			//获取随机数。	
		num = Math.floor(Math.random() * 8999 + 1000);
		$.ajax({
			type: "get",
			url: "/app4friendv2/member_SendMsg.jspx",
			data: {
				'mobile': $(".b1").val(),
				'smsMsg': '欢迎使用有空帮，验证码：' + num
			},
			async: true,
			success: function(data) {},
			error: function(a, b, c) {
				alert(a + b + c)
			}
		});
	});
	$(".Qd").click(function() {
		var pass = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
		if(!myreg.test($(".b1").val())) {
			$(".b1").val("");
			$(".b1").attr("placeholder", "手机号无效");
			$(".b1").focus();
			return false;
		} else if(!pass.test($(".b3").val())) {
			$(".b3").val("");
			$(".b3").attr("placeholder", "密码无效");
			$(".b3").focus();
			return false;
		} else if($(".b4").val() !== $(".b3").val()) {
			$(".b4").val("");
			$(".b4").attr("placeholder", "密码不一致")
			return false;
		} else if(parseInt($(".b2").val()) != num) {
			alert("验证码不正确");
			return false;
		};
		user_nam = $(".b1").val();
		user_pas = $(".b4").val();
		$.ajax({
			type: "POST",
			url: "/app4friendv2/member_changePwd.jspx?",
			data: {
				'mobile': user_nam,
				'password': user_pas
			},
			async: true,
			success: function(data) {
				alert('修改密码成功,请登录');
				window.location = "index.html"

			},
			error: function(xhr, errorText, errorType) {
				alert('提交验证系统发送异常')
			},
		});
	}); //注册完
});