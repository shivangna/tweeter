$(document).ready(function(){
  $(".new-tweet").hide();
  $(".compose").click(function(){
    $(".new-tweet").slideToggle();
    $("form textarea").focus();
  });
});



