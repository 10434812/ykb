$(function() {
    $(".usersex b").on("click", function() {
        $(this).addClass("checked");
        $(this).siblings("b").removeClass("checked");
    })
    $(".xyb").click(function() {
        function sex() {
            if ($(".usersex b").eq(0).className == "checked") {
                return 1;
            } else {
                return 2;
            }
        };
        if ($(".nc input").val() == "") {
            $(".nc input").attr("placeholder", "请填写昵称");
            return false;
        } else {
            sex();
        }
        var formData = new FormData();
        formData.append('image_url', $('#q')[0].files[0]);
        $.ajax({
            url: '/app4friendv2/act_addAct_image.jspx?',
            type: 'POST',
            cache: false,
            data: formData,
            dataType: "json",
            processData: false,
            contentType: false
        }).done(function(res) {
            var img = res.image_url;
            window.localStorage.setItem("name", $(".nc input").val());
            window.localStorage.setItem("sex", sex());
            window.localStorage.setItem("img", img);
            window.location = "jn.html"
        }).fail(function(res) {});
    }); //头像完

});
