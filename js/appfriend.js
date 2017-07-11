 $(function() {
     //navigator.geolocation.getCurrentPosition(function(pos) {
     // var lon = pos.coords.longitude;
     // var lat = pos.coords.latitude;
     var url = window.location.search;
     var user_id = url.match(/\?[1-9][0-9]{3,}/)[0].replace('?', '');
     var user_img = url.split(/&/)[1];
     var user_name = decodeURI(url.split(/&/)[2]);
     var lon = url.split(/&/)[3]; //114.234234232;
     var lat = url.split(/&/)[4]; //39.234234235;
     var user_rows = 20;
     var user_dis = 10000;
     var mapBeginning = 13;
     mov(user_rows, user_dis, mapBeginning);
     $(".ibottom li:eq(0)").click(function() {
         Itime = 2;
         $(".xinxi").children("li").remove();
         user_dis = 5000;
         user_rows = 40;
         mapBeginning = 13;
         mov(user_rows, user_dis, mapBeginning);

     });
     $(".ibottom li:eq(1)").click(function() {
         Itime = 2;
         $(".xinxi").children("li").remove();
         user_dis = 10000;
         user_rows = 40;
         mapBeginning = 11;
         mov(user_rows, user_dis, mapBeginning);
     });
     $(".ibottom li:eq(2)").click(function() {
         Itime = 2;
         $(".xinxi").children("li").remove();
         user_dis = 100000;
         user_rows = 60;
         mapBeginning = 9;
         mov(user_rows, user_dis, mapBeginning);
     });
     $(".ibottom li:eq(3)").click(function() {
         Itime = 2;
         $(".xinxi").children("li").remove();
         user_dis = 1000000000000;
         user_rows = 100;
         mapBeginning = 7;
         mov(user_rows, user_dis, mapBeginning);
     });

     $(".ibottom li").click(function() {
         $('#loding').show();
         $(".ibottom li").removeClass("on");
         $(this).addClass("on");
     });


     function mov(row, dis, mapBeginning) {
         var url = "https://uk.5zixi.com/app4friendv2/portal_appBaseQuery.jspx?&project=FRIEND&modul=selFJ&returnType=PAGELIST";
         url += "&lat=" + lat;
         url += "&lon=" + lon;
         url += "&user_id=" + user_id;
         url += "&dis=" + dis;
         url += "&page=1";
         url += "&rows=" + row;
         $.ajax({
             type: "GET",
             url: url,
             success: function(data) {
                 window.localStorage.setItem("hy", data);
                 $('#loding').hide();
                 $('#container').show();
                 window.setTimeout(function() {

                     setmap(mapBeginning);
                 }, 1);

             },
             error: function() {

             }
         }); //ajax
     } ///mov

     //最后回掉
     var setmap = function(mapBeginning) {
         var opts;
         var ggPoint = new BMap.Point(lon, lat);
         var hy = window.localStorage.getItem('hy');
         hy = $.parseJSON(hy);
         var poarr = [];
         hy.rows.forEach(function(item) {
             var po = new BMap.Point(item.lon, item.lat);
             poarr.push(po);
         });
         //地图初始化
         var bm = new BMap.Map("container");
         bm.centerAndZoom(ggPoint, mapBeginning);
         var marker;
         var content;
         var geolocationControl = new BMap.GeolocationControl();
         bm.addControl(geolocationControl);
         //循环添加
         hy.rows.forEach(function(item, index) {
             if (item.distance / 1000 < 2 || item.image_url === null || item.image_url === "" || item.image_url === "(null)") {
                 return false;
             }
             var bs = 40;
             if (item.distance / 1000 > 10) {
                 bs = 40;
             }
             //主框架
             opts = { //主框架
                 width: 240,
                 height: 110,
                 title: "<h6 style='color:#3092F7'>" + name(item) + "</h6>",
                 fontSize: 12,
                 enableMessage: true,
                 border: 0
             };
             var myIcon = new BMap.Icon(img(item), new BMap.Size(70, 70), {
                 anchor: new BMap.Size(35, 0),
                 imageOffset: new BMap.Size(20, 20),
                 imageSize: new BMap.Size(bs, bs)
             });
             marker = new BMap.Marker(poarr[index], {
                 icon: myIcon
             });
             //添加好友
             var con = '<div style="position: relative;">';
             con += '<p style="font-size:14px;color:white;">';
             con += '<img style="display:inline-block;width:55px;height:55px;border-radius:4px" src=' + img() + '>';
             con += '<span style="display:inline-block;position: absolute;left:70px;top:0px;font-size: 13px;font-weight: bold;color:#ccc">个人信息</span>';
             con += '</p>';
             con += '<p style="position: absolute;left: 65px;top:32px;color:#fff";width:100%;>';
             con += '<span style="display:inline-block;background: #3092F7;margin:2px;padding: 0 1px;border-radius: 4px;width:52px;font-size: 10px;text-align:center">' + jn() + '</span>';
             con += '<span style="display:inline-block;background: #9179D9;margin:2px;padding: 0 1px;border-radius: 4px;width:52px;font-size: 10px;text-align:center">' + zy() + '</span>';
             con += '<span style="display:inline-block;background: #00CD89;margin:2px;padding: 0 1px;border-radius: 4px;width:52px;font-size: 10px;text-align:center">' + ah() + '</span>';
             con += '</p>';
             con += '<p style="background:rgb(255,195,0);margin-top:7px;border-radius: 5px;width:30%;height:18px;text-align: center;color: #fff;line-height:18px;font-size: 14px;" onclick="addf(' + item.user_id + ')">添加好友';
             con += '</p>';
             con += '</div>';
             addf = function(userid) {
                 // var myid = window.localStorage.getItem("a");
                 // myid = $.parseJSON(myid);
                 addfriend(user_id, userid);
             };

             //img
             function img() {
                 if (item.image_url === null || item.image_url === "" || item.image_url === "(null)") {
                     return "../img/txmr.png";
                 } else if ((item.image_url).indexOf('/image/') !== -1) {
                     return "/app4friendv2" + item.image_url;
                 } else if ((item.image_url).indexOf('sinaimg') !== -1) {
                     return 'https:' + item.image_url.replace(/http/g, "");
                 } else {
                     return item.image_url.replace(/http/g, "https");
                 }
             }
             //name
             function name() {
                 if ((item.nikename) === "nikename" || (item.nikename) === "(null)" || (item.nikename) === null || (item.nikename) === "") {
                     return "有空帮用户";
                 } else {
                     return item.nikename.substring(0, 8);
                 }
             }

             function jn() {
                 if (item.specialty_info === null || item.specialty_info === "") {
                     return "&nbsp;<T></T>A&nbsp;";
                 } else {
                     return "&nbsp;" + item.specialty_info.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                 }
             }

             function zy() {
                 if (item.profession === null || item.profession === "") {
                     return "&nbsp;犯懒&nbsp;";
                 } else {
                     return "&nbsp;" + item.profession.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                 }
             }

             function ah() {
                 if (item.person_label === null || item.person_label === "") {
                     return "&nbsp;未填&nbsp; ";
                 } else {
                     return "&nbsp;" + item.person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                 }
             }
             //添加好友结束
             content = (con); //框架传入的内容
             bm.addOverlay(marker); // 将标注添加到地图
             addClickhade(content, marker, opts); //点击回掉
             var Width = "40";
             var Of = 20;
             if (name(item).length > 3) {
                 Width = "60";
                 Of = 10;
             }
             var label = new BMap.Label(name(item), {
                 offset: new BMap.Size(25, 61)
             });
             label.setStyle({
                 width: Width,
                 color: "white",
                 fontSize: "12px",
                 backgroundColor: "#3a94e0",
                 border: 0,
                 textAlign: "center",
                 borderRadius: "0.2rem",
                 padding: "0.05rem"
             });
             marker.setLabel(label);
             bm.setCenter(poarr[index]);
             marker.addEventListener("onclick", move);

         });

         //外边的函数
         function addClickhade(content, marker, opts) {
             marker.addEventListener('click', function(e) {
                 openInfo(content, e, opts);
             });
         }

         function openInfo(content, e, opts) {
             var p = e.target;
             var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
             var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
             bm.openInfoWindow(infoWindow, point); //开启信息窗口
         } //添加点击
         var my = null;
         translateCallback = function(data) {
             if (data.status === 0) {
                 // var user = window.localStorage.getItem('a');
                 // user = $.parseJSON(user);
                 var myIcon = new BMap.Icon(user_img, new BMap.Size(70, 70), {
                     anchor: new BMap.Size(35, 70),
                     imageOffset: new BMap.Size(20, 20),
                     imageSize: new BMap.Size(60, 60)
                 });
                 var marker2 = new BMap.Marker(data.points[0], {
                     icon: myIcon
                 }); // 创建标注
                 var label = new BMap.Label(user_name, {
                     offset: new BMap.Size(30, 71)
                 });
                 label.setStyle({
                     width: "40",
                     color: "white",
                     fontSize: "12",
                     backgroundColor: "#3a94e0",
                     border: 0,
                     textAlign: "center",
                     borderRadius: "0.5rem",
                     padding: "1px",
                     paddingTop: "0px",
                     paddingBottom: "0px"
                 });
                 marker2.setLabel(label);
                 bm.addOverlay(marker2); // 将标注添加到地图
                 bm.setCenter(data.points[0]);
                 my = data.points[0];
                 //我的位置
             }
         };
         //触发事件
         //好友
         function addfriend(myid, youid) {
             $.ajax({
                 type: "POST",
                 url: "/app4friendv2/friend_addFriend.jspx?",
                 data: {
                     'myself.user_id': myid,
                     'friendMember.user_id': youid
                 },
                 async: true,
                 success: function(data) {
                     $('#alert').show();
                     $('#alert').click(function() {
                         $(this).hide();
                     });
                     // if ($.parseJSON(data).friend_addFriend == 1) {

                     // } else {
                     //    //alert("等待对方确定");

                     // }
                 },
                 error: function() {

                 }
             });
         }

         function move(e) {
             var cl = e.domEvent.srcElement;
             var p = e.target;
             // var mylat = new BMap.Point(my.lng, my.lat);
             // var hylat = new BMap.Point(p.NA.lng, p.NA.lat);
             // alert('从我的位置到到好友位置的距离是：' + (bm.getDistance(mylat, hylat)).toFixed(2) + ' 米。');
         }
         setTimeout(function() {
             var convertor = new BMap.Convertor();
             var gg = [];
             gg.push(ggPoint);
             convertor.translate(gg, 1, 5, translateCallback);
         }, 1);

         // function img(user) {
         //    if (user.image_url == null || user.image_url == "" || user.image_url == "(null)") {
         //       return "../img/logo-29.png";
         //    } else if ((user.image_url).indexOf('/image/') !== -1) {
         //       return "https://uk.5zixi.com/app4friendv2" + user.image_url;
         //    } else if ((user.image_url).indexOf('sinaimg') !== -1) {
         //       return user.image_url;
         //    } else {
         //       return user.image_url.replace(/http/g, "https");
         //    }
         // }

         function name(user) {
             if (user.profession === null || user.profession === "") {
                 return user.nikename;
             } else {
                 return user.profession.substring(0, 5).replace(/ /g, "");
             }
         }
     }; //地图完毕；
     //}); //获取定位
 });
