var money=location.href.split('#')[1];
var a=money=null?'':1;
var vm=new Vue({
	el:'#app',
	data:{
		money:a
	},
	methods:{
		isok:function(that){
			if(this.money<5||this.money>1000){
				alert('请填写正确的金额！');
				 that.href='';
			}
		}
	}
});