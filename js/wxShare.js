function wxShare(Title, Image) {
    $.getScript("https://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {

        var url = 'https://uk.5zixi.com/app4friendv2/wechat_getTicket.jspx?url=';
        url += encodeURIComponent(location.href.split('#')[0]);
        $.ajax({
            url: url,
            type: "get",
            async: true,
            dataType: "json",
            success: function(data) {
                wx.config({
                    debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
        wx.onMenuShareTimeline({
            title: Title,
            link: window.location.href,
            imgUrl: Image, // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
        //朋友
        wx.onMenuShareAppMessage({
            title: Title, // 分享标题
            // desc: b.nikename + '在朋友圈说句话价值' + x5 + '元,看看你的是多少呢？', // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: Image, // 分享图标
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



    });
}
