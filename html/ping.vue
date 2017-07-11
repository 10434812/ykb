<template>
	<div id="app">
		<div class="top" v-if='item.anonymous==0'>
				<img :src='user_img(item.image_url)'>
				<p class="nikename">{{item.nikename}}</p>
				<p class="user_msg">
					<span class="zy">{{item.specialty_info}}</span>
					<span class="jn">{{item.profession}}</span>
					<span class="ah">{{item.person_label}}</span>
				</p>
		</div>
		<div class="content">
			<p>{{item.content}}</p>
			<img :src='content_img(item.imgurls)' :class='img_direction' @click='showbigimg(item.imgurls)'>
			<div class="bao">
				<span class="bao1" @click.once='zan(item.id,index)'>赞:<span>{{item.zan_num}}</span></span>
				<span class="bao2"><a href="#" @click='comment(item,index)'>评:<span>{{item.pin_num}}</span></a></span>
				<span @click='compile(item)'>编辑|分享</span>
			</div>
		</div>
		<ul class="box">
			<li>
				<img :src='user_img(item.image_url)'>
				<p class="nikename">{{item.nikename}}</p>
				<p>{{item.content}}</p>
			</li>	
		</ul>
	</div>
</template>
<script>
	module.exports={
		data(){
			return{
				item:'zzzz'
			}
		}
	}
</script>
<style scoped>
html {
	font-size: 20px;
}

* {
	padding: 0;
	margin: 0;
}
#app{
	width: 100%;
	height:100%;
}
#app li{
	width:100%;
	height:auto;
	border-bottom:#DCDCDC 1px solid;
	padding: 1rem 0;
}
#app li .top{
	position: relative;
}
#app li .top img{
	width: 2rem;
	height:2rem;
	margin: 0.5rem;
	border-radius: 0.2rem;
}
#app li .top .nikename {
	font-size: 0.6rem;
	color: #3092F7;
	position: absolute;
	left: 3rem;
	top:0.5rem;
}

#app li .top .user_msg {
	font-size: 0.5rem;
	position: absolute;
	left: 3rem;
	top:1.6rem;
	bottom: 0.5rem;
	color: white;
}

#app li .top  .jn {
	padding: 0.05rem;
	background: #3092F7;
	border-radius: 0.1rem;
	margin-right: 0.2rem;
}

#app li .top  .zy {
	padding: 0.05rem;
	background: #9179D9;
	border-radius: 0.1rem;
	margin-right: 0.2rem;
}

#app li .top  .ah {
	padding: 0.05rem;
	background: #00CD89;
	border-radius: 0.1rem;
	margin-right: 0.2rem;
}
#app li .content p{
	height: auto;
	color: #6B6B6B;
	font-size: 0.8rem;
	margin: 0.2rem auto;
	padding: 0 1rem;
	margin-bottom: 1rem; 
	text-indent:1rem;
	word-break:break-all 
}
#app li .content img{
	display: block;
	margin: 0 auto;
	width: 9rem;
	height: 8rem;
	border: 0;
	background: 0;
	outline: none;
}
#app li .content .bao {
	width: 80%;
	height:auto;
	color: #3092F7;
	font-size: 0.6rem;
	margin: 0.7rem 0 -0.2rem 6rem;
}
#app li .content .bao a{
	color: #3092F7;		
}

#app li .content .bao1 span,
#app li .content .bao2 span{
	color: #ccc;
}

#app li .content .bao span{
	margin-left: 0.5rem;
}
</style>