/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.



$(document).ready(function() {



function createTweetElement(tweets) {

  const usernameElement = tweets.user.name
  const handleElement = tweets.user.handle
  const contentElement = tweets.content.text
  const profilePicElement = tweets.user.avatars.small
  const timeElement = tweets.created_at


  let $tweet = $("<article>").addClass("tweet-container");
  let $header = $("<header>")
  let $addProfilePic = $('<img/>').addClass('profile-pic').attr("src", profilePicElement);
  let $addUsername = $("<h2>").addClass("username").text(usernameElement);
  let $addHandle = $("<p>").addClass("tweeter-handle").text(handleElement);
  let $addContentContainer = $("<div>").addClass("tweet-body")
  let $tweetTextContainer = $("<p>").text(contentElement);
  let $footer = $("<footer>");
  let $addTime = $("<time>").text(handleElement);
  let $icons = $("<div>").addClass("icons");
  let $iconFlag = $("<i>").addClass("fas fa-flag")
  let $iconRetweet = $("<i>").addClass("fas fa-retweet")
  let $iconHeart = $("<i>").addClass("fas fa-heart")



    let $result = $("<article>")
    .addClass("tweet-container")
    .append($tweet,
            $header,
            $addProfilePic,
            $addUsername,
            $addHandle,
            $addContentContainer,
            $tweetTextContainer,
            $footer,
            $addTime,
            $icons,
            $iconFlag,
            $iconRetweet,
            $iconHeart)
    return $result
  }

  function renderTweets(tweets) {
    tweets.forEach(function(tweets){
      $("#new-tweet-container").prepend(createTweetElement(tweets));
    })
  }



    $(".new-tweet form input[type='submit']").click(function(event) {
      event.preventDefault()
      console.log($("form textarea").val().length)
      if ($("form textarea").val().length > 140) {
        return alert("stop")
        }
      else if ($("form textarea").val() === "" || $("form textarea").val() === null) {
          return alert("stoppppp")
        }
      else {$.ajax({
        type: "POST",
        url: $(".new-tweet form").attr("action"),
        data: $(".new-tweet form").serialize(),
        success: function(data)
        {
          loadTweets()
        }
      })};
      return false;
    });





    function loadTweets () {
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "/tweets",
        success: function (data)
        {
          renderTweets(data);
        }
      });
    }
    loadTweets();



})





