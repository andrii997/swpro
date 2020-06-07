$(document).ready(function () {
    $(".popup-with-form").magnificPopup({
        type: "inline",
        preloader: !1,
        focus: "#name",
        callbacks: {
            beforeOpen: function () {
                $(window).width() < 700 ? (this.st.focus = !1) : (this.st.focus = "#name");
            },
        },
    }),
        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({ disableOn: 700, type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: !1, fixedContentPos: !1 }),
        $(".header-menu").click(function (o) {
            o.preventDefault(), $("#menu").toggleClass("show"), $(this).toggleClass("active"), $("#header").toggleClass("fixed");
        }),
        $(".menu").click(function (ev) {
            if($(ev.target).closest('form').length == 0) $(".header-menu").click();
        }),
        $(".sf1").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !1, fade: !0, asNavFor: ".sn1", dots: !1 }),
        $(".sn1").slick({ slidesToShow: 5, slidesToScroll: 1, asNavFor: ".sf1", centerMode: !1, focusOnSelect: !0, vertical: !0, infinite: !0, draggable: !0, dots: !1, prevArrow: $(".prev"), nextArrow: $(".next") }),
        $(".sf2").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !1, fade: !0, asNavFor: ".sn2", dots: !1 }),
        $(".sn2").slick({ slidesToShow: 5, slidesToScroll: 1, asNavFor: ".sf2", centerMode: !1, focusOnSelect: !0, vertical: !0, infinite: !0, draggable: !0, dots: !1, prevArrow: $(".prev2"), nextArrow: $(".next2")});

        $('.langs').on('mouseenter', function(){
            $('.langs').addClass('active');
        });

        $('.langs').on('mouseleave', function(){
            $('.langs').removeClass('active');
        });
}),
    $(window).scroll(function () {
        $(this).scrollTop() >= 600 ? $(".goup").fadeIn() : $(".goup").fadeOut();
    }),
    $(".goup").click(function () {
        $("body,html").animate({ scrollTop: 0 }, 500);
    });

$("#sendform1, #sendform2, #sendform3").click(function(ev){
ev.preventDefault();
var cur_form_id = $(ev.currentTarget).attr('id').slice(-1);
  var phone = $("#phone"+cur_form_id).val();
  var name = $("#name"+cur_form_id).val();
  var message = $("#message"+cur_form_id).val();
  var error = false;
  if(!name){
    $("#name"+cur_form_id).focus();
	return false;
    error = true;
  }
  if(!phone){
    $("#phone"+cur_form_id).focus();
	return false;
    error = true;
  }
  if(!message){
    $("#message"+cur_form_id).focus();
	return false;
    error = true;
  }
  if(!error){
    jQuery.ajax({
      url: "send.php",
      data: "name="+name+"&phone="+phone+"&comment="+message,
      type: "POST",
      success: function(resp){
		  resp = $.parseJSON(resp);
        if(resp.success){
		$("#name"+cur_form_id).val("");
        $("#phone"+cur_form_id).val("");
        $("#message"+cur_form_id).val("");
		}
        
          alert(resp.error ? resp.error : resp.success);
        
		
      },
      error: function(resp) {
       
          alert(resp);
        
      }
    });
  }

});
$("#sendform4").click(function(ev){
ev.preventDefault();
var cur_form_id = $(ev.currentTarget).attr('id').slice(-1);
  var phone = $("#phone"+cur_form_id).val();
  var name = $("#name"+cur_form_id).val();
	var city = $("#city"+cur_form_id).val();
  var message = $("#message"+cur_form_id).val();
  var error = false;
  if(!name){
    $("#name"+cur_form_id).focus();
	return false;
    error = true;
  }
  if(!phone){
    $("#phone"+cur_form_id).focus();
	return false;
    error = true;
  }
  if(!city){
    $("#city"+cur_form_id).focus();
	return false;
    error = true;
  }
  if(!message){
    $("#message"+cur_form_id).focus();
	return false;
    error = true;
  }
  if(!error){
    jQuery.ajax({
      url: "send.php",
      data: "name="+name+"&phone="+phone+"&city="+city+"&comment="+message+"&tname="+window.last_tname+"&tprice="+window.last_tprice,
      type: "POST",
      success: function(resp){
		  resp = $.parseJSON(resp);
        if(resp.success){
		$("#name"+cur_form_id).val("");
        $("#phone"+cur_form_id).val("");
		$("#city"+cur_form_id).val("");
        $("#message"+cur_form_id).val("");
		}
        
          alert(resp.error ? resp.error : resp.success);
        
		
      },
      error: function(resp) {
       
          alert(resp);
        
      }
    });
  }

});

function topaysum(tname, sum){
	window.last_tname = tname;
	window.last_tprice = sum;
	$('#topaysum').attr('data-sum', sum).html(sum+' грн');
}