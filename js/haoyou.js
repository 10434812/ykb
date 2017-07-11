$(function() {
    var map; //地图
    var user_infor = $.parseJSON(window.localStorage.getItem("a")); //个人信息
    var friends = null;
    navigator.geolocation.getCurrentPosition(function(pos) {
        var lon = pos.coords.longitude;
        var lat = pos.coords.latitude;
        var user_rows = 15; //人数
        var user_dis = 10000; //距离
        getFriends(user_rows, user_dis, false, 12);
        $(".itop li p").click(function() { //头上点击
            friends = null;
            $(".xinxi").children("li").remove();
            $('#loding').show();
            $(".itop li p").removeClass("on");
            $(this).addClass("on");
        });
        $(".ibottom li").click(function() {
            friends = null;
            $('#loding').show();
            $(".ibottom li").removeClass("on");
            $(this).addClass("on");
        });
        $(".itop li p").eq(0).click(function() { //地图页面
            $(".ibottom li").removeClass("on");
            $('.ibottom li:eq(0)').addClass("on");
            getFriends(20, 10000);
            $(".xinxi").hide();
            $(".xl").hide();
            $("#container").show();
            $('.ibottom').show();
            $("body").css("padding-top", "2.3rem");
        });
        $(".itop li p").eq(1).click(function() { //附近的人
            key = false;
            $(".ibottom li").removeClass("on");
            $('.ibottom li:eq(0)').addClass("on");
            var rows = 6;
            var dis = 5000;
            getFriends(6, 5000, true);
            $(".xinxi").show();
            $(".xl").show();
            $("#container").hide();
            $('.ibottom').show();
            $("body").css("padding-top", "2.5rem");
            $(".ibottom li:eq(0)").click(function() {
                dis = 5000;
                $(".xinxi").children("li").remove();
                getFriends(rows, dis, true);
            });
            $(".ibottom li:eq(1)").click(function() {
                dis = 10000;
                $(".xinxi").children("li").remove();
                getFriends(rows, dis, true);
            });
            $(".ibottom li:eq(2)").click(function() {
                dis = 100000;
                $(".xinxi").children("li").remove();
                getFriends(rows, dis, true);
            });
            $(".ibottom li:eq(3)").click(function() {
                dis = 10000000;
                $(".xinxi").children("li").remove();
                getFriends(rows, dis, true);
            });
            $(".xl").click(function() {
                rows += 6;
                $("#loding").show();
                $(".xinxi").children("li").remove();
                getFriends(rows, dis, true);
            });
        });
        $(".itop li p").eq(2).click(function() { //我的好友
            $("body").css("padding-top", "1rem");
            getmyFriends();
            $('.ibottom').hide();
            $(".xl").hide();
            $("#container").hide();
        });
        //设置dis
        $(".ibottom li:eq(0)").click(function() {
            getFriends(20, 10000, false, 12);
        });
        $(".ibottom li:eq(1)").click(function() {
            getFriends(30, 100000, false, 10);
        });
        $(".ibottom li:eq(2)").click(function() {
            getFriends(40, 1000000, false, 8);
        });
        $(".ibottom li:eq(3)").click(function() {
            getFriends(60, 10000000, false, 6);
        });
        //获取附近的人
        function getFriends(user_rows, user_dis, setpeoples, mapBeginning) {
            var url = "/app4friendv2/portal_appBaseQuery.jspx?project=FRIEND&modul=selFJ&returnType=PAGELIST&PAGELIST";
            url += '&lat=' + lat;
            url += '&lon=' + lon;
            url += '&user_id=' + user_infor.user_id;
            url += '&dis=' + user_dis;
            url += '&page=1';
            url += '&rows=' + user_rows;
            $.ajax({
                type: "GET",
                url: url,
                success: function(data) {
                    // console.log(url);
                    $('#loding').hide();
                    friends = window.eval('(' + data + ')');
                    if (setpeoples) {
                        setpeopleNearby(friends);
                    } else {
                        setmap(mapBeginning);
                    }
                }
            });
        } //getFriends
        function getmyFriends() {
            $.ajax({
                type: "POST",
                url: "/app4friendv2/friend_getMyFriend.jspx?",
                data: {
                    "myself.user_id": user_infor.user_id
                },
                async: true,
                success: function(data) {
                    $('#loding').hide();
                    myfriends = window.eval('(' + data + ')');
                    setpeopleNearby(myfriends, true);
                },
                error: function() {}
            });
        }

        function setpeopleNearby(data, setMyFriends) {
            if (setMyFriends) { //设置好友
                data.forEach(function(item, index) {
                    var exclude = item[0];
                    var t = 1;
                    if (exclude.friend_status !== 1) {
                        t = 2;
                    }
                    item = item[t];
                    var str = '<li class="user_li"><img class="Xiao" src=' + setimg(item) + '><p class="Gt">' + sethy(item) + '</p><p class="Nc">' + setname(item) + '</p><p class="Ah"><span class="jn">' + setjn(item) + '</span ><span class="zy">' + setzy(item) + '</span ><span class="ah">' + setah(item) + '</span ></p><span class = "Jl" >' + setdis(exclude, true) + '</span></li >';
                    $(".xinxi").append(str);
                    if ($('.xinxi li:eq(' + index + ') .Jl').text() == '接受') {
                        $('.xinxi li:eq(' + index + ') .Jl').addClass('on');
                    }
                });
                $(".Jl").click(function(event) { //同意被添加
                    event.stopPropagation();
                    var t = $(this).parent().index();
                    var userid = user_infor.user_id;
                    var friedid = data[t][0];
                    consentAdd(userid, friedid, t);

                }); //添加好友完
            } else { //设置附近的人
                data.rows.forEach(function(item, index) {
                    $(".xinxi").append('<li><img class="Xiao" src=' + setimg(item) + '><p class="Gt">' + sethy(item) + '</p><span class="You"></span><p class="Nc">' + setname(item) + '</p><p class="Ah"><span class="jn">' + setjn(item) + '</span ><span class="zy">' + setzy(item) + '</span ><span class="ah">' + setah(item) + '</span ></p><span class = "Jl" >' + setdis(item) + '</span><span class = "ykb" >' + setykb(item) + '</span></li >');
                });
                //点击进入个人信息
                $(".xinxi li").click(function() {
                    var t = $(this).index();
                    var str = JSON.stringify(data.rows[t]);
                    window.localStorage.setItem("hyxinxi", str);
                    window.location = "infor.html";
                });
                //进入个人信息保存完成
                //添加好友
                $(".You").click(function(event) {
                    event.stopPropagation();
                    var t = $(this).parent().index();
                    var userid = user_infor.user_id;
                    var friedid = data.rows[t].user_id;
                    addfriend(userid, friedid);
                }); //添加好友完
            }
        }

        function setmap(mapBeginning) { //设置地图
            var ggPoint = new BMap.Point(lon, lat);
            var marker2;
            //地图初始化
            map = new BMap.Map("container");
            map.centerAndZoom(ggPoint, mapBeginning);
            var geolocationControl = new BMap.GeolocationControl(); //左下角图标定位
            map.addControl(geolocationControl);
            var convertor = new BMap.Convertor(); // 创建个人图标
            var pointArr = [];
            pointArr.push(ggPoint); //加坐标
            convertor.translate(pointArr, 1, 5, translateCallback);
            friendsimage(friends);
        } //setmap
    }); //navigator
    //设置一切
    function translateCallback(data) { //个人位置转换
        if (data.status === 0) {
            var myIcon = new BMap.Icon(setimg(user_infor), new BMap.Size(70, 70), { //创建图标
                anchor: new BMap.Size(35, 70),
                imageOffset: new BMap.Size(20, 20),
                imageSize: new BMap.Size(60, 60)
            });
            var marker = new BMap.Marker(data.points[0], {
                icon: myIcon
            }); // 创建标注
            var myIcon1 = new BMap.Icon('https://uk.5zixi.com/ykkf/img/xiaohongdian.png', new BMap.Size(15,15), { //创建图标
                anchor: new BMap.Size(-23,53),
                // imageOffset: new BMap.Size(20, 20),
                // imageSize: new BMap.Size(60, 60)
            });
            var marker1 = new BMap.Marker(data.points[0], {
                icon: myIcon1
            }); // 创建标注
            var label = new BMap.Label(setname(user_infor), {
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
            map.addOverlay(marker); // 将标注添加到地图
            // map.addOverlay(marker1);
            map.setCenter(data.points[0]);
        }
    } //个人转换结束
    //friendsimage
    function friendsimage(friends) {
        var poarr = [];
        friends.rows.forEach(function(item, index) {
            var po = new BMap.Point(item.lon, item.lat);
            poarr.push(po);
            if (item.distance / 1000 < 2 || item.image_url === null || item.image_url === "" || item.image_url == "(null)") {
                return false;
            }
            var bs = 40; //用户头像宽高
            if (item.distance / 1000 > 10) {
                bs = 40;
            }
            opts = { //主框架
                width: 300,
                height: 150,
                title: "<h6 style='color:#3092F7'>" + setname(item) + "</h6>",
                fontSize: 12,
                enableMessage: true
            };
            var myIcon = new BMap.Icon(setimg(item), new BMap.Size(70, 70), { //地图图标
                anchor: new BMap.Size(35, 0),
                imageOffset: new BMap.Size(20, 20),
                imageSize: new BMap.Size(bs, bs)
            });
            var marker2 = new BMap.Marker(poarr[index], {
                icon: myIcon
            });
            var myIcon1 = new BMap.Icon('https://uk.5zixi.com/ykkf/img/xiaohongdian.png', new BMap.Size(15,15), { //创建图标
                anchor: new BMap.Size(-12,-17),
                // imageOffset: new BMap.Size(20, 20),
                // imageSize: new BMap.Size(60, 60)
            });
            var marker1 = new BMap.Marker(poarr[index], {
                icon: myIcon1
            }); // 创建标注
            var label = new BMap.Label(setname(item), { //地图名字
                offset: new BMap.Size(25, 61)
            });
            label.setStyle({ //名字样式
                // width: 40,
                color: "white",
                fontSize: "12",
                backgroundColor: "#3a94e0",
                border: 0,
                textAlign: "center",
                borderRadius: "4px",
                padding: "1px 2px"
            });
            marker2.setLabel(label);
            map.addOverlay(marker2);
            // map.addOverlay(marker1);//小红点
            map.setCenter(poarr[index]);
            var con = '<div style="position: relative;">';
            con += '<p style="font-size:14px;color:white;">';
            con += '<img style="display:inline-block;width: 70px;height:70px;border-radius:5px" src=' + setimg(item) + '>';
            con += '<span style="display:inline-block;position: absolute;left: 85px;top:0px;font-size: 16px;font-weight: bold;color:#ccc">个人信息</span>';
            con += '</p>';
            con += '<p style="position: absolute;left: 80px;top:35px;color:#fff";width:100%;>';
            con += '<span style="display:inline-block;background: #3092F7;margin:1.5px;padding: 0 1px;border-radius: 5px;width:68px;font-size: 12px;text-align:center">' + setjn(item) + '</span>';
            con += '<span style="display:inline-block;background: #9179D9;margin:.1.5px;padding: 0 1px;border-radius: 5px;width:68px;font-size: 12px;text-align:center">' + setzy(item) + '</span>';
            con += '<span style="display:inline-block;background: #00CD89;margin:1.5px;padding: 0 1px;border-radius: 5px;width:65px;font-size: 12px;text-align:center">' + setah(item) + '</span>';

            con += '</p>';
            con += '<p style="background:rgb(255,195,0);margin-top:12px;border-radius: 5px;width:30%;height:25px;text-align: center;color: #fff;line-height:25px;font-size: 16px;" onclick="addf(' + item.user_id + ')">添加好友';
            con += '</p>';
            con += '</div>';
            addf = function(userid) {
                addfriend(user_infor.user_id, userid);
            };
            content = (con);
            addClickhade(content, marker2, opts);
        }); //friends.rows
        function addClickhade(content, marker, opts) {
            marker.addEventListener('click', function(e) {
                openInfo(content, e, opts);
            });
        }

        function openInfo(content, e, opts) {
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        } //添加点击
    }
    //friendsimg结束
    function setimg(obj) {
        if (obj.image_url === null || obj.image_url === "" || obj.image_url == "(null)") {
            return "../img/txmr.png";
        } else if ((obj.image_url).indexOf('/image/') !== -1) {
            return "/app4friendv2" + obj.image_url;
        } else if ((obj.image_url).indexOf('sinaimg') !== -1) {
            return 'https:' + obj.image_url.replace(/http/g, "");
        } else {
            return obj.image_url.replace(/http/g, "https");
        }
    }

    function setname(obj) {
        if ((obj.nikename) == "nikename" || (obj.nikename) == "(null)" || (obj.nikename) === null || (obj.nikename) === "") {
            return "有空帮用户";
        } else {
            return obj.nikename.substring(0, 8);
        }
    }

    function setdis(obj, di) {
        if (di) {
            if (obj.friend_id == obj.user_id) {
                return "接受";
            } else if (obj.friend_status === 0) {
                return '待确定';
            } else {
                return "以添加";
            }
        } else {
            var num = obj.distance / 1000;
            var dis = Math.round(num);
            if (dis < 3000) {
                return dis + "km";
            } else {
                return '外星';
            }
        }
    }

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

    function sethy(obj) {
        return obj.distant + "位共同好友";
    }

    function setykb(obj) {
        if (isNaN(obj.personallable) || obj.personallable === null) {
            return '';
        } else {
            return '有空币' + obj.personallable;
        }
    }
    //添加好友函数
    function addfriend(userid, friedid) {
        $.ajax({
            type: "POST",
            url: "/app4friendv2/friend_addFriend.jspx?",
            data: {
                'myself.user_id': userid,
                'friendMember.user_id': friedid
            },
            async: true,
            success: function(data) {
                if ($.parseJSON(data).friend_addFriend == 1) {
                    alert("好友请求以发送");
                } else {
                    alert("等待对方确定");

                }
            },
            error: function() {

            }
        });
    }
    //同意被添加 

    function consentAdd(userid, friedid, index) {
        var url = 'https://uk.5zixi.com/app4friendv2/friend_agreeFriend.jspx?myself.user_id=' + userid + '&friendMember.user_id=' + friedid + '&friend.friend_status=1';
        $.ajax({
            type: "POST",
            url: url,
            async: true,
            success: function(data) {
                if ($.parseJSON(data).friend_agreeFriend.result == 1) {
                    $('.xinxi li:eq(' + index + ') .Jl').removeClass('on').text('已添加');
                }
            },
            error: function() {

            }
        });
    }
    $.getScript('../js/wxShare.js',function(){
        wxShare(user_infor.nikename+'正在使用地图找人功能，你也来试试！！！',setimg(user_infor));
    })
});
