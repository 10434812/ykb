/*infor*/
$(function() {
	var hyxinxi = window.localStorage.getItem("hyxinxi");
	if (hyxinxi !== null) {
		hyxinxi = window.eval('(' + hyxinxi + ')');
		//console.log(hyxinxi);
		$(".user_pic img").attr("src", img());
		$(".user_id").html(hyxinxi.nikename);
		$(".infobottom p span").html("有空,就有一切可能!");
		$(".cont_center .sources").html(setjn(hyxinxi));
		$(".cont_center .job").html(setzy(hyxinxi));
		$(".cont_center .hobby").html(setah(hyxinxi));
		$(".userid>b").text(hyxinxi.user_id);
		$(".userage>b").text(hyxinxi.age);
		$(".useradd>b").text(hyxinxi.city);
		// //地图开始
		var ggPoint = new BMap.Point(hyxinxi.lon, hyxinxi.lat);
		//地图初始化
		var bm = new BMap.Map("container");
		bm.centerAndZoom(ggPoint, 13);
		var convertor = new BMap.Convertor();
		var pointArr = [];
		pointArr.push(ggPoint); //加坐标
		convertor.translate(pointArr, 1, 5, translateCallback);

		function translateCallback(data) { //个人位置转换
			if (data.status === 0) {
				var myIcon = new BMap.Icon(img(), new BMap.Size(70, 70), { //创建图标
					anchor: new BMap.Size(35, 70),
					imageOffset: new BMap.Size(20, 20),
					imageSize: new BMap.Size(60, 60)
				});
				var marker = new BMap.Marker(data.points[0], {
					icon: myIcon
				}); // 创建标注
				var label = new BMap.Label(hyxinxi.nikename, {
					offset: new BMap.Size(30, 71)
				});
				label.setStyle({
					width: "50px",
					color: "white",
					fontSize: "12px",
					backgroundColor: "#3a94e0",
					border: 0,
					textAlign: "center",
					borderRadius: "4px",
					padding: "1px",
					paddingTop: "0px",
					paddingBottom: "0px"
				});
				marker.setLabel(label);
				bm.addOverlay(marker); // 将标注添加到地图
				bm.setCenter(data.points[0]);
			}
		} //个人转换结束

		function img() {
			if (hyxinxi.image_url === null || hyxinxi.image_url === "") {
				return "../img/txmr.png";
			} else if (hyxinxi.image_url.indexOf('qlogo') !== -1) {
				return hyxinxi.image_url;
			} else {
				return "/app4friendv2" + hyxinxi.image_url;
			}
		}
		window.localStorage.removeItem('hyxinxi');
	} else {
		var a = window.localStorage.getItem("a");
		var b = $.parseJSON(a);
		moveData();

		function moveData() {
			var jineng = b.profession;
			var zhiye = b.specialty_info;
			var aihao = b.person_label;
			var gender = b.gender;
			$(".user_pic img").attr("src", img());
			$(".user_id").html(b.nikename);
			$(".infobottom p span").html("有空,就有一切可能!");
			var personalData = window.localStorage.getItem("personalData");
			if (personalData !== null) {
				personalData = $.parseJSON(personalData);
				$(".sources").text(personalData.profession);
				$(".job").text(personalData.skill);
				$(".hobby").text(personalData.hobby);
			} else {
				$(".cont_center .sources").html((setzy(b) + ""));
				$(".cont_center .job").html((setjn(b) + ""));
				$(".cont_center .hobby").html((setah(b) + ""));//.replace(/,/g, "").substring(0, 7)
			}; //if
			$(".userid>b").text(b.user_id);
			$(".userage>b").text(b.age);
			$(".useradd>b").text(b.city);

			function img() {
				if (b.image_url == null || b.image_url == "") {
					return "../img/txmr.png"
				} else if (b.image_url.indexOf('qlogo') !== -1) {
					return b.image_url;
				} else {
					return "/app4friendv2" + b.image_url;
				}
			};
			if (b.gender == 1) {
				$(".boy").addClass("checked");
			} else {
				$(".boy").removeClass("checked");
				$(".girl").addClass("checked");
			};
			$(".cont_right").click(function() {
				$(this).parent(".content").next(".add_sources").css("display", "block");
			});
			$(".cancel_btn").click(function() {
				$(".add_sources").css("display", "none")
			})
			$(".queding").click(function() {
				var clas = ["sources", "job", "hobby"];
				var name = $(this).parent().parent().parent().prev().children(".cont_center").children().attr("class");
				var val = $(this).parent().prev().children().val();
				if (name == clas[0]) {
					jineng = val;
				} else if (name == clas[1]) {
					zhiye = val;
				} else if (name == clas[2]) {
					aihao = val;
				};
				move(jineng, zhiye, aihao, gender);
			});
		}; //moveData
		//修改资料；
		function move(jineng, zhiye, aihao, gender, state, cost) {
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
							return null;
						} else {
							alert("修改资料成功");
						};
						$(".add_sources").css("display", "none")
						if (personalData == null) {
							$(".sources").text(jineng);
							$(".job").text(zhiye);
							$(".hobby").text(aihao);
						};
					}
				}
			});
		};
	}; //else
	//move
 function setjn(obj) {
      if (obj.specialty_info === null || obj.specialty_info === "") {
         return "&nbsp;TA&nbsp;";
      } else {
         return "&nbsp;" + obj.specialty_info.replace(/,/g, "").substring(0, 5) + "&nbsp;";
      }
   }

   function setzy(obj) {
      if (obj.profession === null || obj.profession === "") {
         return "&nbsp;犯懒&nbsp;";
      } else {
         return "&nbsp;" + obj.profession.replace(/,/g, "").substring(0, 5) + "&nbsp;";
      }
   }

   function setah(obj) {
      if (obj.person_label === null || obj.person_label === "") {
         return "&nbsp;未填&nbsp; ";
      } else {
         return "&nbsp;" + obj.person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
      }
   }
});