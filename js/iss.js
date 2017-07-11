
$(function() {
	function date2str(x, y) {
		var z = {
			M: x.getMonth() + 1,
			d: x.getDate(),
			h: x.getHours(),
			m: x.getMinutes(),
			s: x.getSeconds()
		};
		y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
			return((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
		});
		return y.replace(/(y+)/g, function(v) {
			return x.getFullYear().toString().slice(-v.length)
		});
	}
	$('.dateval').val(date2str(new Date(), "yyyy-MM-dd "));
	$('.timeval').val(date2str(new Date(), "hh:mm"));
	//地图
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos) {
			var lot = pos.coords.longitude;
			var lat = pos.coords.latitude;
			var point = new BMap.Point(lot, lat); // 创建点坐标 
			translateCallback = function(data) {
				if(data.status === 0) {
					var marker = new BMap.Marker(data.points[0]);
					/*map.addOverlay(marker);
					var label = new BMap.Label("您当前的位置", {
						offset: new BMap.Size(20, -10)
					})
					marker.setLabel(label);
					map.setCenter(data.points[0]);
					*/
					var Apoint = new BMap.Point(data.points[0].lng, data.points[0].lat);
					var geocoder = new BMap.Geocoder();
					//获取位置
					geocoder.getLocation(Apoint, function(rs) {
						//获取地理组件
						var addComp = rs.addressComponents;
						//获取省份
						var province = addComp.province;
						//获取城市
						var city = addComp.city;
						//获取区县
						var district = addComp.district;
						//获取街道
						var street = addComp.street;
						//获取街道号
						var streetNumber = addComp.streetNumber;
						//province(省份)
						var dizhi = city + district + street + streetNumber; //将获取到的信息输出到页面
						$('input[name=address]').val(dizhi);
						$("input[name=address]").attr("placeholder","");
					});
				}
			}

			setTimeout(function() {
				var convertor = new BMap.Convertor();
				var pointArr = [];
				pointArr.push(point);
				convertor.translate(pointArr, 1, 5, translateCallback)
			}, 1)
		}, function(err) {
			// 错误的回调  
			// https://developer.mozilla.org/cn/docs/Web/API/PositionError 错误参数  
		}, {
			enableHighAccuracy: true, // 是否获取高精度结果  
			timeout: 5000, //超时,毫秒  
			maximumAge: 0 //可以接受多少毫秒的缓存位置  
				// 详细说明 https://developer.mozilla.org/cn/docs/Web/API/PositionOptions  
		});
	} else {

		alert('抱歉！您的浏览器无法使用地位功能');
	}
	$('.submit_btn').click(function() {
		$('input[name=startTime]').val()
		var a = window.localStorage.getItem("a");
		var b = $.parseJSON(a);
		if(a == "null" || a == null) {
			alert("账号未登陆，点击登陆");
			window.location = "index.html";
			return false;
		} else {
			var formData = new FormData();
			formData.append('image_url', $('#button1')[0].files[0]);
			$.ajax({
				url: '/app4friendv2/act_addAct_image.jspx?',
				type: 'POST',
				cache: false,
				data: formData,
				dataType: "json",
				processData: false,
				contentType: false,
				sendAsBinary: true
			}).done(function(res) {
				var img = res.image_url;
				//alert(img)
				if(img.length == 0) {
					img = "";
					mov(img);
				} else {
					mov(img);
				}
			}).fail(function(res) {
				// alert("error1");
			});
		}

		function mov(img) {
			navigator.geolocation.getCurrentPosition(function(pos) {
      			var lon = pos.coords.longitude;
      			var lat = pos.coords.latitude;
      			var sUrl = '/app4friendv2/act_addAct.jspx?';
			sUrl += 'act.user_id=' + b.user_id;
			sUrl += '&act.subject=' + $('input[name=title]').val();
			sUrl += '&act.image_url=' + img;
			sUrl += '&act.info=' + $("#nr").val();
			sUrl += '&act.key=1';
			sUrl += '&act.address=' + $('input[name=address]').val();
			sUrl += '&act.lon=' +lon;
			sUrl += '&act.lat=' +lat;
			sUrl += '&act.act_date=' + $('input[name=startDate]').val() + '' + $('input[name=startTime]').val().replace(/am|pm/g, "")+ ':00';
			sUrl += '&act.join_date=' + $('input[name=startDate]').val() + '' + $("#end").val().replace(/am|pm/g, "")+ ':00';
			sUrl += '&act.lable=' + $("#nr").val();
			sUrl += '&act.paytype=0';
			sUrl += '&act.payamount=1';
			sUrl += '&act.scale=' + $('input[name=userNum]').val();
			sUrl += '&act.cre_date=' + $('input[name=startDate]').val() + '' + $('input[name=startTime]').val() + ':00';
			sUrl += '&act.end_date=' + $('input[name=startDate]').val();
			sUrl += '&act.expenses=1';
			sUrl += '&act.permissions=1';
			$.ajax({
				url: sUrl,
				cache: false,
				type: 'get',
				success: function(data) {
					alert("发布成功");
					window.location = "dongtai.html";
				},
				error: function(data) {
					alert('请填写完成全部内容后重试！')
				}
			});
  			});
			//%@act_addAct.jspx?act.user_id=用户的ID&act.subject=活动的主题&act.image_url=活动图片&act.info=活动详情&act.key=匿名活着实名&act.address=地点&act.lon=经度&act.lat=纬度&act.act_date=开始日期和时间&act.join_date=结束时间和日期&act.lable=活动详情&act.paytype=0&act.payamount=金额&act.scale=人数&act.cre_date=开始日期和时间&act.end_date=结束日期&act.expenses=123&act.permissions=(1/4)
		}
	});
})