var user_infor = window.localStorage.getItem("a");
user_infor = $.parseJSON(user_infor);
new Vue({
    el: '#app',
    data: {
        questions: '',
        user_page: 5,
        httpHead: 'https://uk.5zixi.com/app4friendv2',
        isok: true,
        big_url: '',
        loader: false

    },
    mounted() { //初始化
        this.getquestions();
    },
    watch: {
        user_page() {
            this.loader = true;
            this.getquestions();
        },
        questions() {
            this.loader = false;
            // console.log(this.questions);
        },
        big_url() {
            //       EXIF.getData(document.getElementById('images'), function(){
            //      console.log(EXIF.getAllTags(this));
            //      alert(EXIF.getTag(this, 'Orientation'));
            // });
        }
    },
    methods: {
        getquestions() {
            var aUrl = 'https://uk.5zixi.com/app4friendv2/portal_appBaseQuery.jspx?project=COFFEESAY&modul=listAllCoffeeSay&returnType=LIST'
            aUrl += '&userid=' + 52322//user_infor.user_id;
            aUrl += '&pageSize=' + this.user_page;
            aUrl += '&currentPage=1';
            this.$http.post(aUrl).then(response => {
                this.questions = eval('(' + response.body + ')');
                window.localStorage.setItem("ww", this.questions);
            }, error => { console.log('error') })
        },
        user_img(data) {
            if (data.indexOf('qlogo') != -1) {
                return data;
            } else {
                return 'https://uk.5zixi.com/app4friendv2' + data;
            }
        },
        zan(data, index) {
            var Url = 'https://uk.5zixi.com/app4friendv2/portal_appBaseQuery.jspx?';
            Url += 'project=COFFEESAY';
            Url += '&modul=insertCoffeeZan';
            Url += '&returnType=UPDATE';
            Url += '&userid=' + 52322;
            Url += '&coffeeid=' + data;

            this.$http.get(Url).then(res => {}, err => {});
            this.questions[index].zan_num++;
        },
        content_img(data) {
            if (data == null) {
                return '../img/txmr.png';
            } else {
                return this.httpHead + data;
            }
        },
        showbigimg(data, that) {
            this.isok = false;
            if (data == null) {
                this.big_url = '../img/txmr.png';
            } else {
                this.big_url = this.httpHead + data;
            }
        },
        add_questions() {
            this.user_page += 5;
        },
        comment(item) { //评价
            window.localStorage.setItem("ping", JSON.stringify(item));
            window.location = "ping.html";
        },
        compile(item) { //编辑
            window.localStorage.setItem("con", item.content);
            window.localStorage.setItem("img", item.imgurls);
            window.location = "bianji.html";
        },
        // 判断图片方向
        img_direction(that) {

        },
        pay(data){
            if (confirm("确定支付？")) {  
             window.location = "pay.html#"+data;
             // alert(data)  
         }  
        }
    } //methods
})
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
wx.onMenuShareTimeline({
    title: '有空帮问问',
    link: 'https://uk.5zixi.com/html/wenwen.html',
    imgUrl: 'https://uk.5zixi.com/app4friendv2/image/1496744425213.png', // 分享图标
    success: function() {
        // 用户确认分享后执行的回调函数
    },
    cancel: function() {
        // 用户取消分享后执行的回调函数
    }
});
//朋友
wx.onMenuShareAppMessage({
    title: '有空帮问问', // 分享标题
    // desc: b.nikename + '在朋友圈说句话价值' + x5 + '元,看看你的是多少呢？', // 分享描述
    link: 'https://uk.5zixi.com/html/wenwen.html', // 分享链接
    imgUrl: 'https://uk.5zixi.com/app4friendv2/image/1496744425213.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function() {
        // 用户确认分享后执行的回调函数
    },
    cancel: function() {
        // 用户取消分享后执行的回调函数
    }
});
//请求完成
