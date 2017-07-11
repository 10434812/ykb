$(function() {
	var user_infor = $.parseJSON(window.localStorage.getItem("a")); //个人信息
	if(user_infor!==null){window.location = "https://uk.5zixi.com/html/wenwen.html";}
	var url = window.location.search;
	if (url.length > 1) {
		var loc = url.match(/=(\S*)&/)[1];
		var tUrl = "https://uk.5zixi.com/app4friendv2/wechat_backUrl.jspx?";
		tUrl += "code=" + loc;
		tUrl += "&grant_type=authorization_code";
		tUrl += "&state=USERID"+0;
		$.ajax({
			type: "get",
			url: tUrl,
			async: true,
			success: function(data) {
				window.localStorage.setItem("a", data);
				Sh();
			},
			error: function(data) {
				// alert(data);
			}
		});
	} else {
		Sh();
	}

	function Sh() {
		window.location = "#shang";
		var num = {
			renshu: [0.5, 1, 5, 8, 20, 25],
			hangye: [20, 20, 20, 12, 8, 15, 8, 8, 8, 8],
			time: [2, 20, 40, 50],
			aihao: [8, 5, 10, 20, 8, 3, 5, 3, 10, 10, 8],
			jn: [8, 8, 15, 15, 20, 15]
		};

		var x = 0,
			x1 = 0,
			x2 = 0,
			x3 = 0,
			x4 = 0,
			xx = 0,
			xxx = 0,
			x5 = 0;

		var profession, skill, hobby;
		$(".renshu li").click(function() {

			if ($(this).children("span").hasClass("on")) {
				$(this).children("span").removeClass("on");
			} else {
				var z = $(this).index();
				$(".renshu li span ").removeClass("on");
				$(this).children('span').addClass("on");
				x = num.renshu[z];

			}
		});
		$(".job li").click(function() {
			if ($(this).children("span").hasClass("on")) {
				$(this).children("span").removeClass("on");
			} else {
				var z = $(this).index();
				$(".job li span").removeClass("on");
				$(this).children('span').addClass("on");
				x1 = num.hangye[z];
				profession = $(".job li").eq(z).text();
			}
		});
		$(".nian li").click(function() {
			if ($(this).children("span").hasClass("on")) {
				$(this).children("span").removeClass("on");
			} else {
				var z = $(this).index();
				$(".nian li span").removeClass("on");
				$(this).children('span').addClass("on");
				x2 = num.time[z];
			}
		});

		$(".aihao li").click(function() {
			if ($(this).children("span").hasClass("on")) {
				$(this).children("span").removeClass("on");
			} else {
				var a = $(".aihao li .on").length;
				if (a >= 5) {
					alert("最多可选5项！");
				} else {
					var z = $(this).index();
					$(this).children('span').addClass("on");
					xx = num.aihao[z];
					hobby = $(".aihao li").eq(z).text();
				}
			}
		});
		$(".jn li").click(function() {
			if ($(this).children("span").hasClass("on")) {
				$(this).children("span").removeClass("on");
			} else {
				var a = $(".jn li .on").length;
				if (a >= 3) {
					alert("最多可选3项！");
				} else {
					var z = $(this).index();
					//$(".jn li").removeClass("on");
					$(this).children('span').addClass("on");
					xxx = num.jn[z];
					skill = $(".jn li").eq(z).text();
				}
			}
		});
		$("#button").click(function(){
			if (x == 0) {
				alert("请填写朋友圈人数信息");
				return false;
			} else if (x1 == 0) {
				alert("请填写行业信息");
			} else if (x2 == 0) {
				alert("请填写工作年限");
			} else if (xx == 0) {
				alert("请填写您的爱好息");
			} else if (xxx == 0) {
				alert("请填写您的特长技能");
			} else {
				var aihaoon = $(".aihao li").children(".on").length;
				var jinengon = $(".jn li").children(".on").length;
				x3 = xx + aihaoon - 1;
				x4 = xxx + jinengon - 1;
				var str = '<p class="red1">计算中,请稍后...</p>';
				$(this).addClass("none");
				x5 = x * (x1 + x2) * x3 * x4 /50/5;
				x5 = parseInt(x5);
				$("#jz").append(str);
				setTimeout(function() {
					var str1 = '<p class="red">' + x5 + '<span></span><a href="https://itunes.apple.com/cn/app/you-kong-bang-ren-sheng-zi/id872440340?mt=8&ksajfafajfj;adjja;sdjf;">有空币</i></a>';
					$(".red1").text("我在朋友圈说句话的价值是:");
					$("#jz").append(str1);
					$("title").html("我在朋友圈说句话价值" + x5 + "元");
					$("#ios").removeClass("none");
					window.location = "#zhidao";
					var str2 = "<p id='kk'>一人民币等于100有空币</p>";
					$("#jz").append(str2);
					var personalData = {
						profession: profession,
						skill: skill,
						hobby: hobby,
						cost: x5
					};
					move(personalData.profession, personalData.skill, personalData.hobby, 1, 1, personalData.cost);

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
								var data = JSON.parse(data)
								if (data.member_upMember.result == 1) {
									if (state == 1) {
										//alert("微信资料成功");
									}
								}
							}
						});
					}
					personalData = JSON.stringify(personalData);
					window.localStorage.setItem("personalData", personalData);
				}, 1000);
				setTimeout(function() {
					$("#moban").css({
						"display": "block"
					});
				}, 2000);
				$("#moban").click(function() {
					$("#moban").css({
						"display": "none"
					});
					setTimeout(function() {
						var ua = navigator.userAgent.toLowerCase();
						if (ua.match(/MicroMessenger/i) == "micromessenger") {
							window.location = "wenwen.html";
						} else {
							window.location = "index.html";
						}
					}, 2000);
				});
				//开始

				//请求获取用户信息
				var url = 'https://uk.5zixi.com/app4friendv2/wechat_getTicket.jspx?url=';
				url += encodeURIComponent(location.href.split('#')[0]);
				$.ajax({
					url: url,
					type: "get",
					async: true,
					dataType: "json",
					success: function(data) {
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: 'wxf07a2aadb806a199', // 必填，公众号的唯一标识
							timestamp: data.timestamp, // 必填，生成签名的时间戳
							nonceStr: data.nonceStr, // 必填，生成签名的随机串
							signature: data.signature, // 必填，签名，见附录1
							jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
						}); //微信
					},
					error: function(data) {
						// alert("error");
					}
				});
				wx.ready(function() {
					// 是否完成验证
				});
				wx.error(function(res) {
					alert('签名验证失败');
				});
				wx.checkJsApi({
					jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function(res) {

					}
				});
				//朋友圈
				var a = window.localStorage.getItem("a");
				if (a == null) {
					return false;
				} else {
					var b = $.parseJSON(a)
					wx.onMenuShareTimeline({
						title: "我在朋友圈说句话价值" + x5 + "元", // 分享标题
						link: 'https://uk.5zixi.com/html/jiazhi.html', // 分享链接
						imgUrl: b.image_url, // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					//朋友
					wx.onMenuShareAppMessage({
						title: "我在朋友圈说句话价值" + x5 + "元", // 分享标题
						desc: b.nikename + '在朋友圈说句话价值' + x5 + '元,看看你的是多少呢？', // 分享描述
						link: 'https://uk.5zixi.com/html/jiazhi.html', // 分享链接
						imgUrl: b.image_url, // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					//请求完成
					//结束
				} //else		
			}
		}); //
		$(".gg").click(function() {
			window.location = "https://uk.5zixi.com/html/wenwen.html";
		});
	} //Sh结束;

});