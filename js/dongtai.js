/*fired*/
$(function() {
	var a = window.localStorage.getItem("a");
	var b = $.parseJSON(a);
	$("#banner #user_pic").attr("src", img());
	function img() {
		if(b.image_url == null || b.image_url == "") {
			return "../img/txmr.png"
		} else if(b.image_url.indexOf('qlogo') !== -1) {
			return b.image_url;
		} else {
			return "/app4friendv2" + b.image_url;
		}
	};
	var user_id = b.user_id;
	var user_page = 2;
	aaa(user_id, user_page);
	$(".xl").click(function() {
		$("#Nr>ul").children("li").remove();
		user_page += 2;
		aaa(user_id, user_page);
	})

	function aaa(user_id, user_page) {
		$.ajax({
			type: "post",
			url: "/app4friendv2/act_getyourAct.jspx?act.subject=&&currentPage=1&&",
			data: {
				'pageSize': user_page,
				'act.user_id': user_id
			},
			async: true,
			success: function(data) {
				//alert(data)
				window.localStorage.setItem("dt", data);
				aa();
				$("#Nr>ul li").click(function() {
					var index = $(this).index();
					window.localStorage.setItem("i", index);
					window.location = "xiangqing.html";
				})
			},
			error: function() {

			}
		});
	};

	function aa() {
		var a = window.localStorage.getItem("dt")
		var b = jQuery.parseJSON(a);
			//微信分享
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
					 // alert('签名验证完成')
				});
				wx.error(function(res) {
					// alert('签名验证失败');
				});
				wx.checkJsApi({
					jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function(res) {

					}
				});
				//朋友圈
					var imgs="https://uk.5zixi.com/app4friendv2" + (b[0][0].image_url).substring(0, 24)
					wx.onMenuShareTimeline({
						title:b[0][0].subject,
						link: 'https://uk.5zixi.com/html/dongtai.html',
						imgUrl:imgs , // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					//朋友
					wx.onMenuShareAppMessage({
						title:b[0][0].subject,  // 分享标题
						// desc: b.nikename + '在朋友圈说句话价值' + x5 + '元,看看你的是多少呢？', // 分享描述
						link: 'https://uk.5zixi.com/html/dongtai.html', // 分享链接
						imgUrl:imgs , // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					//微信分享请求完成
		for(var i = 0; i < b.length; i++) {
			function img() {
				if(b[i][1].image_url == null) {
					
					return "../img/txmr.png"
				} else if((b[i][1].image_url).indexOf('/image/') !== -1) {
					return "/app4friendv2" + b[i][1].image_url;
				} else {
					return b[i][1].image_url.replace(/http/g, "https");
				}
			};

			function imgs() {
				if((b[i][0].image_url).indexOf('/image/') == -1) {
					return "../img/txmr.png"
				} else if((b[i][0].image_url).indexOf(",/image/") != -1) {
					return "/app4friendv2" + (b[i][0].image_url).substring(0, 24)
				} else {
					return "/app4friendv2" + (b[i][0].image_url.replace(/http/g, "https"));
				}
			};

			function name() {
				if((b[i][1].nikename) == "nikename" || (b[i][1].nikename) == "(null)" || (b[i][1].nikename) == null) {
					return "有空帮用户"
				} else {
					return b[i][1].nikename;
				};
			};

			function dis() {
				if(b[i][1].distant == 0) {
					return 1 + "Mm";
				} else {
					return Math.round(b[i][1].distant / 1000) + "km";
				}
			}

			function jn() {
				if(b[i][1].specialty_info == null) {
					return "&nbsp;TA&nbsp;"
				} else {
					return "&nbsp;" + (b[i][1].specialty_info).replace(/,/g, "").substring(0, 5) + "&nbsp;";
				}
			};


			function lb() {
				if(b[i][0].lable == "") {
					return "<br>";
				} else {
					return b[i][0].lable;
				}
			};

			function fy() {

			}

			function zy() {
				if(b[i][1].profession == null) {
					return "&nbsp;犯懒&nbsp;"
				} else {
					return "&nbsp;" + b[i][1].profession.replace(/,/g, "").substring(0, 5) + "&nbsp;";
				}
			};

			function ah() {
				if(b[i][1].person_label == null) {
					return "&nbsp;未填&nbsp; "
				} else {
					return "&nbsp;" + b[i][1].person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
				}
			};

			function mf() {
				if(b[i][0].payamount != 0) {
					return "收费";
				} else {
					return "免费";
				}
			}
			var str = '<li class="qwe">' + '<div class="li">' +
				'<div class="user_left">' +
				'<ul class="left">' +
				'<li class="user_pic"><img src=' + img() + ' /></li>' +
				'<li class="Zb a1"><img src="../img/jilu-2.png" /></li>' +
				'<li class="Zb a2"><img src="../img/yk_pic11.png" /></li>' +
				'<li class="Zb a3"><img src="../img/yk_pic13.png" /></li>' +
				'<li class="Zb a4"><img src="../img/yk_pic14.png" /></li>' +
				'<li class="Zb a5"><img src="../img/yk_pic15.png" /></li></ul></div>' +
				'<div class="user_right">' +
				'<p class="user_name">' + name() + '<span>' + dis() + '</span></p>' +
				'<p class="user_oce"><span class="jn">' + jn() + '</span><span class="zy">' + zy() + '</span><span class="ah">' + ah() + '</span></p>' +
				'<div class="zhanwei"></div>' +
				'<p class="user_content">' + b[i][0].subject + '</p>' +
				'<p class="user_head">' + lb() + '</p>' +
				'<div class="bao">' +
				'<ul class="user_banner">' +
				'<li><img src=' + imgs() + '></li>' +
				'</ul>' +
				'</div>' +
				'<p class="Dd">地点：' + b[i][0].address.substring(0, 13) + '</p>' +
				'<div class="Sj">开始时间：' + (b[i][0].act_date).substring(0, 10) + '<span class="yellow">' + (b[i][0].act_date).substring(11, 16) + '</span>' +
				'<p class="Sc">预计时长：' + b[i][1].last_time.day + '个月</p>' +
				'</div>' +
				'<p class="Fy">费用：' + b[i][0].payamount + '元<span id="AA">' + mf() + '</span></p>' +
				'<p class="Rs">限制人数' + b[i][0].scale + '人</p>' +
				'</div>' +
				'</div></li>';
			$("#Nr>ul").append(str);
		};
	};
})