$(function() {
    var user_rows = 15;
    var user_dis = 10000;
    var Itime = 1;
    var Open = true;
    var mapBeginning = 13;
    mov(user_rows, user_dis);

    function mov(row, dis, mapBeginning) {
        var c = window.localStorage.getItem("a");
        var d = $.parseJSON(c);
        if (c == "null" || c === null) {
            alert("账号未登陆，点击登陆");
            window.location = "index.html";
            return false;
        } else {
            navigator.geolocation.getCurrentPosition(function(pos) {
                var lot = pos.coords.longitude;
                var lat = pos.coords.latitude;
                var user_id = d.user_id;
                $.ajax({
                    type: "GET",
                    url: "/app4friendv2/portal_appBaseQuery.jspx?",
                    data: {
                        'project': 'FRIEND',
                        'modul': 'selFJ',
                        'returnType': 'PAGELIST',
                        'lat': lat,
                        'lon': lot,
                        'user_id': user_id,
                        'dis': dis,
                        'page': 1,
                        'rows': row
                    },
                    timeout: 5000,
                    async: true,
                    success: function(data) {
                        $('#loding').hide();
                        window.localStorage.setItem("hy", data);
                        if (Open === true) { //地图里边
                            set_user();
                        } else {
                            setmap(mapBeginning);
                        }
                        if (Itime == 1) {
                            $(".itop li p").eq(0).click(); //进入地图
                            $(".xinxi").children("li").remove();
                        }
                    },
                    error: function() {}
                });
            });
        }
    }

    function set_user() {
        var a = window.localStorage.getItem("hy");
        var b = jQuery.parseJSON(a);
        for (var i = 0; i < b.rows.length; i++) {
            function img() {
                if (b.rows[i].image_url === null || b.rows[i].image_url === "" || b.rows[i].image_url == "(null)") {
                    return "../img/txmr.png";
                } else if ((b.rows[i].image_url).indexOf('/image/') !== -1) {
                    return "/app4friendv2" + b.rows[i].image_url;
                } else if ((b.rows[i].image_url).indexOf('sinaimg.cn') !== -1) {
                    return b.rows[i].image_url.replace(/http/g, "https");
                } else {
                    return b.rows[i].image_url.replace(/http/g, "https");
                }
            }

            function name() {
                if ((b.rows[i].nikename) == "nikename" || (b.rows[i].nikename) == "(null)" || (b.rows[i].nikename) == null) {
                    return "有空帮用户"
                } else {
                    return b.rows[i].nikename.substring(0, 8);
                }
            }

            function dis() {
                var num = b.rows[i].distance / 1000;
                var dis = Math.round(num);
                if (dis < 3000) {
                    return dis + "km";
                } else {
                    return '外星';
                }
            }

            function jn() {
                if (b.rows[i].specialty_info === null) {
                    return "&nbsp;TA&nbsp;";
                } else {
                    return "&nbsp;" + b.rows[i].specialty_info.replace(/,/g, "").substring(0, 5) + "&nbsp;";
                }
            }

            function zy() {
                if (b.rows[i].profession == null) {
                    return "&nbsp;犯懒&nbsp;"
                } else {
                    return "&nbsp;" + b.rows[i].profession.replace(/,/g, "").substring(0, 5) + "&nbsp;";
                }
            }

            function ah() {
                if (b.rows[i].person_label == null) {
                    return "&nbsp;未填&nbsp; "
                } else {
                    return "&nbsp;" + b.rows[i].person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                }
            };

            function hy() {
                return b.rows[i].friendnum + "位共同好友"
            }

            function ykb() {
                if (isNaN(b.rows[i].personallable) || b.rows[i].personallable == null) {
                    return '';
                } else {
                    return '有空币' + b.rows[i].personallable;
                }
            }
            $(".xinxi").append('<li><img class="Xiao" src=' + img() + '><p class="Gt">' + hy() + '</p><span class="You"></span><p class="Nc">' + name() + '</p><p class="Ah"><span class="jn">' + jn() + '</span ><span class="zy">' + zy() + '</span ><span class="ah">' + ah() + '</span ></p><span class = "Jl" >' + dis() + '</span><span class = "ykb" >' + ykb() + '</span></li >')
            $("#loding").addClass('none');
            // if (Itime == 1) {
            //    $(".itop li p").eq(0).click(); //进入地图
            //    $(".xinxi").children("li").remove();
            // }
        }
        //点击好友
        $(".xinxi li").click(function() {
            var t = $(this).index();
            window.location = "infor.html";
            window.localStorage.setItem("hyxinxi", t);
        });
        //添加好友
        $(".You").click(function(event) {
            event.stopPropagation();
            var t = $(this).parent().index();
            var ai = window.localStorage.getItem("a");
            var bi = $.parseJSON(ai);
            var userid = bi.user_id;
            var friedid = b.rows[t].user_id;
            $.ajax({
                type: "POST",
                url: "/app4friendv2/friend_addFriend.jspx?",
                data: {
                    'myself.user_id': userid,
                    'friendMember.user_id': friedid

                },
                async: true,
                success: function(data) {
                    if (jQuery.parseJSON(data).friend_addFriend == 1) {
                        alert("好友请求以发送");
                    } else {
                        alert("等待对方确定")

                    }
                },
                error: function() {

                }
            });

        });

    }
    $(".itop li p").click(function() {
        $('#loding').show();
        $("#loding").removeClass('none');
        $(".itop li p").removeClass("on");
        $(this).addClass("on");
    });
    $(".itop li p").eq(0).click(function() {
        Open = false;
        Itime = 2;
        $(".xinxi").children("li").remove();
        $(".xl").addClass("none");
        $("#container").removeClass("none");
        setTimeout(function() {
            $(".ibottom li:eq(0)").click();
        }, 1); //进入地图
        //地图
        //距离控制
        $(".ibottom li").click(function() {
            $('#loding').show();
        });

        $(".ibottom li:eq(0)").click(function() {
            Itime = 2;
            $(".xinxi").children("li").remove();
            user_dis = 10000;
            user_rows = 40;
            mapBeginning = 13;
            mov(user_rows, user_dis, mapBeginning);

        });
        $(".ibottom li:eq(1)").click(function() {
            Itime = 2;
            $(".xinxi").children("li").remove();
            user_dis = 100000;
            user_rows = 40;
            mapBeginning = 11;
            mov(user_rows, user_dis, mapBeginning);
        });
        $(".ibottom li:eq(2)").click(function() {
            Itime = 2;
            $(".xinxi").children("li").remove();
            user_dis = 1000000;
            user_rows = 60;
            mapBeginning = 9;
            mov(user_rows, user_dis, mapBeginning);
        });
        $(".ibottom li:eq(3)").click(function() {
            Itime = 2;
            $(".xinxi").children("li").remove();
            user_dis = 100000000;
            user_rows = 100;
            mapBeginning = 7;
            mov(user_rows, user_dis, mapBeginning);
        });
    });
    //回掉函数
    $(".itop li p").eq(1).click(function() {
        Itime = 2;
        Open = true;
        $("body").css("padding-top", "3rem");
        $(".xinxi").children("li").remove();
        mov(user_rows, user_dis);
        $("#container").addClass("none");
        $(".xl").removeClass("none");
        $(".xl").addClass("black");
        $(".ibottom").show();
        $(".xl").show();
    });
    //好友
    $(".itop li p").eq(2).click(function() {
        $('#container').hide();
        $('#loding').hide();
        Itime = 2;
        $("body").css("padding-top", "1rem");
        $(".xinxi").children("li").remove();
        haoyou();
        $(".xl").hide();
        $(".ibottom").hide();

    });
    $(".xl").click(function() {
        $("#loding").removeClass('none');
        $(".xinxi").children("li").remove();
        user_rows += 5;
        mov(user_rows, user_dis);
    });
    $(".ibottom li").click(function() {
        localStorage.removeItem('hy');
        $(".ibottom li").removeClass("on");
        $(this).addClass("on");
    });
    //获取好友列表
    function haoyou() {
        localStorage.removeItem('hy');
        var a = window.localStorage.getItem("a");
        var b = $.parseJSON(a);
        if (a == "null" || a == null) {
            alert("账号未登陆，点击登陆");
            window.location = "index.html";
            return false;
        } else {
            var user_id = b.user_id;
            $.ajax({
                type: "POST",
                url: "/app4friendv2/friend_getMyFriend.jspx?",
                data: {
                    "myself.user_id": user_id
                },
                async: true,
                success: function(data) {
                    window.localStorage.setItem("user_hy", data);
                    set_hy();
                },
                error: function() {}
            });
            //};
        }
    }
    //设置好友
    function set_hy() {
        var a = window.localStorage.getItem("user_hy");
        var b = jQuery.parseJSON(a);
        for (var i = 0; i < b.length; i++) {
            var t = 1;
            if (b[i][0].friend_status == 0) {
                t = 2;
            } else {
                t = 1;
            }

            function img() {
                if (b[i][t].image_url == null || b[i][t].image_url == "" || b[i][t].image_url == "(null)") {
                    return "../img/txmr.png";
                } else if ((b[i][t].image_url).indexOf('/image/') !== -1) {
                    return "/app4friendv2" + b[i][t].image_url;
                } else if ((b[i][t].image_url).indexOf('sinaimg') !== -1) {
                    return 'https:' + b[i][t].image_url.replace(/http/g, "");
                } else {
                    return b[i][t].image_url.replace(/http/g, "https");
                }
            }

            function name() {
                if ((b[i][t].nikename) == "nikename" || (b[i][t].nikename) == "(null)" || (b[i][t].nikename) == null || (b[i][t].nikename) == "") {
                    return "有空帮用户";
                } else {
                    return b[i][t].nikename.substring(0, 8);
                }
            }

            function dis() {
                if (b[i][0].friend_status == 0) {
                    return "待确认";
                } else {
                    return "以添加";
                }
            }

            function jn() {
                if (b[i][t].specialty_info == null || b[i][t].specialty_info == "") {
                    return "&nbsp;TA&nbsp;"
                } else {
                    return "&nbsp;" + b[i][t].specialty_info.replace(/,/g, "").substring(0, 5) + "&nbsp;";
                }
            }

            function zy() {
                if (b[i][t].profession == null || b[i][t].profession == "") {
                    return "&nbsp;犯懒&nbsp;"
                } else {
                    return "&nbsp;" + b[i][t].profession.replace(/,/g, "").substring(0, 5) + "&nbsp;";
                }
            }

            function ah() {
                if (b[i][t].person_label == null || b[i][t].person_label == "") {
                    return "&nbsp;未填&nbsp; "
                } else {
                    return "&nbsp;" + b[i][t].person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                }
            };

            function hy() {
                return b[i][t].distant + "位共同好友";
            }
            $(".xinxi").append('<li><img class="Xiao" src=' + img() + '><p class="Gt">' + hy() + '</p><p class="Nc">' + name() + '</p><p class="Ah"><span class="jn">' + jn() + '</span ><span class="zy">' + zy() + '</span ><span class="ah">' + ah() + '</span ></p><span class = "Jl" >' + dis() + '</span><span class = "okadd" ></span></li >');
        }
    }
    //最后回掉
    function setmap(mapBeginning) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            var opts;
            var lon = pos.coords.longitude;
            var lat = pos.coords.latitude;
            var ggPoint = new BMap.Point(lon, lat);
            //console.log(ggPoint);
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
                if (item.distance / 1000 < 2 || item.image_url == null || item.image_url == "" || item.image_url == "(null)") {
                    return false;
                }
                var bs = 40;
                if (item.distance / 1000 > 10) {
                    bs = 40;
                }
                //主框架
                opts = { //主框架
                    width: 280,
                    height: 150,
                    title: "<h6 style='color:#3092F7'>" + name(item) + "</h6>",
                    fontSize: 12,
                    enableMessage: true
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
                con += '<img style="display:inline-block;width: 70px;height:70px;border-radius:5px" src=' + img() + '>';
                con += '<span style="display:inline-block;position: absolute;left: 85px;top:0px;font-size: 16px;font-weight: bold;color:#ccc">个人信息</span>';
                con += '</p>';
                con += '<p style="position: absolute;left: 80px;top:35px;color:#fff";width:100%;>';
                con += '<span style="display:inline-block;background: #3092F7;margin:2px;padding: 0 1px;border-radius: 5px;width:58px;font-size: 12px;text-align:center">' + jn() + '</span>';
                con += '<span style="display:inline-block;background: #9179D9;margin:2px;padding: 0 1px;border-radius: 5px;width:58px;font-size: 12px;text-align:center">' + zy() + '</span>';
                con += '<span style="display:inline-block;background: #00CD89;margin:2px;padding: 0 1px;border-radius: 5px;width:58px;font-size: 12px;text-align:center">' + ah() + '</span>';
                con += '</p>';
                con += '<p style="background:rgb(255,195,0);margin-top:12px;border-radius: 5px;width:30%;height:25px;text-align: center;color: #fff;line-height:25px;font-size: 16px;" onclick="addf(' + item.user_id + ')">添加好友';
                con += '</p>';
                con += '</div>';
                addf = function(userid) {
                    var myid = window.localStorage.getItem("a");
                    myid = $.parseJSON(myid);
                    addfriend(myid.user_id, userid);
                };
                //img
                function img() {
                    if (item.image_url == null || item.image_url == "" || item.image_url == "(null)") {
                        return "../img/txmr.png"
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
                    if ((item.nikename) == "nikename" || (item.nikename) == "(null)" || (item.nikename) == null || (item.nikename) == "") {
                        return "有空帮用户";
                    } else {
                        return item.nikename.substring(0, 8);
                    }
                }

                function jn() {
                    if (item.specialty_info == null || item.specialty_info == "") {
                        return "&nbsp;<T></T>A&nbsp;"
                    } else {
                        return "&nbsp;" + item.specialty_info.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                    }
                };

                function zy() {
                    if (item.profession == null || item.profession == "") {
                        return "&nbsp;犯懒&nbsp;"
                    } else {
                        return "&nbsp;" + item.profession.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                    }
                }

                function ah() {
                    if (item.person_label == null || item.person_label == "") {
                        return "&nbsp;未填&nbsp; "
                    } else {
                        return "&nbsp;" + item.person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
                    }
                };
                //添加好友结束
                content = (con); //框架传入的内容
                bm.addOverlay(marker); // 将标注添加到地图
                addClickhade(content, marker, opts); //点击回掉
                var Width = "40px";
                var Of = 20;
                if (name(item).length > 3) {
                    Width = "60px";
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
                    borderRadius: "4px",
                    padding: "1px"
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
                if (data.status == 0) {
                    var user = window.localStorage.getItem('a');
                    user = $.parseJSON(user);
                    var myIcon = new BMap.Icon(img(user), new BMap.Size(70, 70), {
                        anchor: new BMap.Size(35, 70),
                        imageOffset: new BMap.Size(20, 20),
                        imageSize: new BMap.Size(60, 60)
                    });
                    var marker2 = new BMap.Marker(data.points[0], {
                        icon: myIcon
                    }); // 创建标注
                    var label = new BMap.Label(name(user), {
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
                        if ($.parseJSON(data).friend_addFriend == 1) {
                            alert("好友请求以发送");
                        } else {
                            alert("等待对方确定")

                        }
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

            function img(user) {
                if (user.image_url == null || user.image_url == "" || user.image_url == "(null)") {
                    return "../img/logo-29.png";
                } else if ((user.image_url).indexOf('/image/') !== -1) {
                    return "https://uk.5zixi.com/app4friendv2" + user.image_url;
                } else if ((user.image_url).indexOf('sinaimg') !== -1) {
                    return user.image_url;
                } else {
                    return user.image_url.replace(/http/g, "https");
                }
            }

            function name(user) {
                if (user.profession == null || user.profession == "") {
                    return user.nikename;
                } else {
                    return user.profession.substring(0, 5).replace(/ /g, "");
                }
            }
        });
    }
    //地图完毕；
});
