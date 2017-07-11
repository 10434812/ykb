$(function() {
	$("#wan").click(function() {
		var nam = window.localStorage.getItem("nam");
		var pas = window.localStorage.getItem("pas");
		var img = window.localStorage.getItem("img");
		var name = window.localStorage.getItem("name");
		var sex = window.localStorage.getItem("sex");
			var surl = 'https://uk.5zixi.com/app4friendv2/member_upMember.jspx?'
		surl += "member.mobile=" +
			name
		surl += "&member.password=" +
			pas
		surl += "&member.user_id=" +
			b.user_id;
		surl += "&member.nikename=" +
			name;
		surl += "&member.personallable=" +
			b.personallable;
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
			zhiye;
		surl += "&member.image_url=" +
			b.image_url
		$.ajax({
			type: "post",
			url: surl,
			async: true,
			success: function(data) {
				var data = JSON.parse(data)
				if(data.member_upMember.result == 1) {
					alert("修改资料成功");
					$(".add_sources").css("display", "none")
					$(".sources").text(jineng);
					$(".job").text(zhiye);
					$(".hobby").text(aihao);
				}
			}
		});
	});
});