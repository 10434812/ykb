$(function() {
    var a = window.localStorage.getItem("dt")
    var b = jQuery.parseJSON(a);
    var i = window.localStorage.getItem("i") - 1;

    function img() {
        if (b[i][1].image_url == null) {
            return "../img/txmr.png"
        } else if ((b[i][1].image_url).indexOf('/image/') !== -1) {
            return "/app4friendv2" + b[i][1].image_url;
        } else {
            return b[i][1].image_url.replace(/http/g, "https");
        }
    };

    function imgs() {
        if ((b[i][0].image_url).indexOf('/image/') == -1) {
            return "../img/txmr.png"
        } else if ((b[i][0].image_url).indexOf(",/image/") != -1) {
            return "/app4friendv2" + (b[i][0].image_url).substring(0, 24)
        } else {
            return "/app4friendv2" + (b[i][0].image_url)
        }
    };


    function name() {
        if ((b[i][1].nikename) == "nikename" || (b[i][1].nikename) == "(null)" || (b[i][1].nikename) == null) {
            return "有空帮用户"
        } else {
            return b[i][1].nikename;
        };
    };

    function dis() {
        if (b[i][1].distant == 0) {
            return 1 + "Mm";
        } else {
            return Math.round(b[i][1].distant / 1000) + "km";
            wx
        }
    }

    function jn() {
        if (b[i][1].specialty_info == null) {
            return "&nbsp;TA&nbsp;"
        } else {
            return "&nbsp;" + (b[i][1].specialty_info).replace(/,/g, "").substring(0, 5) + "&nbsp;";
        }
    };

    function lb() {
        if (b[i][0].lable == "") {
            return "<br>";
        } else {
            return b[i][0].lable;
        }
    };

    function zy() {
        if (b[i][1].profession == null) {
            return "&nbsp;犯懒&nbsp;"
        } else {
            return "&nbsp;" + b[i][1].profession.replace(/,/g, "").substring(0, 5) + "&nbsp;";
        }
    };

    function ah() {
        if (b[i][1].person_label == null) {
            return "&nbsp;未填&nbsp; "
        } else {
            return "&nbsp;" + b[i][1].person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
        }
    };

    function mf() {
        if (b[i][0].payamount != 0) {
            return "收费";
        } else {
            return "免费";
        }
    }
    var str = '<li class="qwe">' + '<div class="li">' +
        '<div class="user_left">' +
        '<ul class="left">' +
        '<li class="user_pic"><img src=' + img() + ' /></li>' +
        //'<li class="Zb a1"><img src="../img/jilu-2.png" /></li>' +
        '<li class="Zb a2"><img src="../img/yk_pic11.png" /></li>' +
        '<li class="Zb a3"><img src="../img/yk_pic13.png" /></li>' +
        '<li class="Zb a4"><img src="../img/yk_pic14.png" /></li>' +
        '</li></ul></div>' +
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
        '<p class="Sc">预计时长：6个月</p>' +
        '</div>' +
        '<p class="Fy">费用：' + b[i][0].payamount + '元<span id="AA">' + mf() + '</span></p>' +
        //'<p class="Rs">限制人数' + b[i][0].scale + '人</p>' +
        '</div>' +
        '</div></li>';
    $("#Nr>ul").append(str);
    //参与
    $.ajax({
        type: "POST",
        url: "/app4friendv2/orderform_getMyOrderformByActId.jspx?",
        data: {
            'orderform.act_id': b[i][0].act_id
        },
        async: true,
        success: function(data) {
            //alert(data)
            window.localStorage.setItem("cyr", data)

        },
        error: function() {

        }
    });
    var cy111 = '<div class="canyu">' +
        '<p class="nihao"><img src="../img/yk_pic15.png" />参与人</p>' +
        '<div class="Jg">' +
        '<p class="j1"><span>限制' + b[i][0].scale + '人</span><span>报名' + b[i][0].par_num + '人</span><span>同意参加' + b[i][0].schid + '人</span></p>' +
        '<p class="j2"><img src="../img/ACtyhg.png"></p>' +
        '<p class="j3">留言</p>' +
        '</div>' +
        '</div>';
    $("#wrap").append(cy111);
    var datav = window.localStorage.getItem("cyr")
    var cy = jQuery.parseJSON(datav);
    for (t = 0; t < cy.length; t++) {
        function cyimg() {
            if (cy[t][3].image_url == null) {
                return "../img/txmr.png"
            } else if ((cy[t][3].image_url).indexOf('/image/') !== -1) {
                return "/app4friendv2" + cy[t][3].image_url;
            } else {
                return cy[t][3].image_url;
            }
        };

        function cyname() {
            if ((cy[t][3].nikename) == "nikename" || (cy[t][3].nikename) == "(null)" || (cy[t][3].nikename) == null) {
                return "有空帮用户"
            } else {
                return cy[t][3].nikename;
            };
        };

        function cyjn() {
            if (cy[t][3].specialty_info == null) {
                return "&nbsp;TA&nbsp;"
            } else {
                return "&nbsp;" + (cy[t][3].specialty_info).replace(/,/g, "").substring(0, 5) + "&nbsp;";
            }
        };

        function cyzy() {
            if (cy[t][3].profession == null) {
                return "&nbsp;犯懒&nbsp;"
            } else {
                return "&nbsp;" + cy[t][3].profession.replace(/,/g, "").substring(0, 5) + "&nbsp;";
            }
        };

        function cyah() {
            if (cy[t][3].person_label == null) {
                return "&nbsp;未填&nbsp; "
            } else {
                return "&nbsp;" + cy[t][3].person_label.replace(/,/g, "").substring(0, 4) + "&nbsp;";
            }
        };

        var cyr = '<div class="cc">' +
            '<img class="user_img" src=' + cyimg() + '>' +
            '<p class="user_name">' + cyname() + '</p>' +
            '<p class="user_oce"><span class="zy">' + cyjn() + '</span><span class="jn">' + cyzy() + '</span><span class="ah">' + cyah() + '</span></p>' +
            '</div>'
        $(".nihao").after(cyr);
    }
    var bt = '<div class="Ty">' +
        '<input type="button" value="同意参与"  style="z-index: 99999;"/>' +
        '</div>';
    $("#wrap").append(bt);

    $(".Ty").click(function() {
        var us = window.localStorage.getItem("a");
        var er = jQuery.parseJSON(us);
        var a = window.localStorage.getItem("dt")
        var b = jQuery.parseJSON(a);
        var i = window.localStorage.getItem("i") - 1;
        $.ajax({
            type: "POST",
            url: "/app4friendv2/orderform_addOrderform.jspx?",
            data: {
                'orderform.act_user_id': b[i][0].user_id,
                'orderform.fq_user_id': er.user_id,
                'orderform.act_id': b[i][0].act_id,
                'id': er.user_id,
                'orderform.orderform_status': '2'
            },
            async: true,
            success: function(data) {
                alert("参与成功")
                history.go(0);

            },
            error: function() {

            }
        });

    })
    $.getScript("../js/wxShare.js", function() {
            wxShare(b[i][0].subject,'https://uk.5zixi.com'+imgs());
        });

})
