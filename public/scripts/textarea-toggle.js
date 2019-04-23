

//shows and hides the new tweet area when the compose button in the nav bar is clicked


$(document).ready(function(){
  $(".new-tweet").hide();
  $(".compose").click(function(){
    $(".new-tweet").slideToggle();
    $("form textarea").focus();
  });
});



