// JavaScript Document
/*个人信息跳转*/
$(function() {
		$("#tx").click(function() {
			window.location = "../html/infor.html";
		});
		$("#mm li").eq(1).click(function() {
			window.location = "../html/infor.html";
		});

		$("#mm li").eq(4).click(function() {
			window.localStorage.clear();
			cookie.clearCookie();
			alert("清除成功");
			history.go(0);
		})
	})
	/*脚步跳转*/
$(function() {
		$(".footer ul li").click(function() {
			var aa = $(this).index();
			if (aa == 0) {
				window.location = "dongtai.html"
			} else if (aa == 1) {
				window.location = "fried.html"
			} else if (aa == 2) {
				window.location = "frame.html"
			}
		})
	})
	/*动态小头像点击跳转*/
$(function() {
		$(".xinxi .Xiao").click(function() {
			window.location = "infor.html";
		})
	})
	/*banner进入问问*/
$(function() {
	$("#banner").click(function() {
		window.location = "wenwen.html"
	})
})
$(function() {
	$("#dl").click(function() {
		window.location = "index.html"
	})
})