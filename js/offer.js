// $(function() {
// 	$('#fabu').click(function() {
// 		var a = window.localStorage.getItem("a");
// 		var b = $.parseJSON(a);
// 		if (a === "null" || a === null) {
// 			alert("账号未登陆，点击登陆");
// 			window.location = "index.html";
// 			return false;
// 		} else {
// 			var user_id = b.user_id;
// 			var userimg = null;
// 			if ($('#nr').val() === "") {
// 				alert("请填写发布内容");
// 				return false;
// 			} else if ($('#file').val() === "") {
// 				alert("请选择发布图片");
// 				return false;
// 			} else {
// 				var formData = new FormData();
// 				// console.log($('#file')[0]);
// 				// console.log($('#file')[0].files[0]);
// 				formData.append('image_url', $('#file')[0].files[0]);
// 				$.ajax({
// 					url: '/app4friendv2/act_addAct_image.jspx?',
// 					type: 'POST',
// 					cache: false,
// 					data: formData,
// 					dataType: "json",
// 					processData: false,
// 					contentType: false,
// 					sendAsBinary: true
// 				}).done(function(res) {

// 					var img = res.image_url;
// 					//alert(img)
// 					if (img.length === 0) {
// 						img = "";
// 						mov(img);
// 					} else {
// 						mov(img);
// 					}
// 				}).fail(function(res) {
// 					alert("网络连接出错，请稍后再试");
// 				});

// 			}

// 			function mov(userimg) {
// 				var sUrl = '/app4friendv2/portal_appBaseQuery.jspx?';
// 				sUrl += 'project=COFFEESAY&modul=insertCoffeeSay&title=';
// 				sUrl += '&userid=' + user_id;
// 				sUrl += '&content=' + $('#nr').val();
// 				sUrl += '&imgurls=' + userimg;
// 				sUrl += '&anonymous=0&visible=1';
// 				sUrl += '&lat=' + b.lat;
// 				sUrl += '&lon=' + b.lon;
// 				sUrl += '&returnType=UPDATE';
// 				$.ajax({
// 					url: sUrl,
// 					cache: false,
// 					type: 'get',
// 					success: function(data) {
// 						alert("发布成功");
// 						window.location = "wenwen.html";
// 					},
// 					error: function(data) {
// 						alert('error2');
// 					}
// 				});
// 			}
// 		}
// 	});
// });
var vm = new Vue({
    el: '#app',
    data: {
        url: 'pay.html',
        content: '',
        canOk: false
    },
    methoes: {

    },
    filters: {
        isok: function() {
            if (this.content !== 'null') {
                return 'pay.html'
            } else {
                return null
            }
        }
    }
});
