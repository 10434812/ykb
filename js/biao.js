$(function() {
	var a = window.localStorage.getItem("a")
	var b = $.parseJSON(a);
	$("#imgdiv img").attr("src", "https://uk.5zixi.com/app4friendv2" + b.image_url);
});