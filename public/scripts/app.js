/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

//Stack overflow function for time count:
function timeDiff(time1, time2) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  let diff = time1 - time2;

  if (diff < msPerMinute) {
    return Math.round(diff / 1000) + " seconds ago";
  } else if (diff < msPerHour) {
    return Math.round(diff / msPerMinute) + " minutes ago";
  } else if (diff < msPerDay) {
    return Math.round(diff / msPerHour) + " hours ago";
  } else if (diff < msPerMonth) {
    return Math.round(diff / msPerDay) + " days ago";
  } else if (diff < msPerYear) {
    return Math.round(diff / msPerMonth) + " months ago";
  } else {
    return Math.round(diff / msPerYear) + " years ago";
  }
}

$(document).ready(function() {
  function createTweetElement(tweets) {
    const usernameElement = tweets.user.name;
    const handleElement = tweets.user.handle;
    const contentElement = tweets.content.text;
    const profilePicElement = tweets.user.avatars.small;
    const timeElement = timeDiff(Date.now(), tweets.created_at);

    //creates the HTML for any new tweet that is created
    let $tweet = $("<article>").addClass("tweet-container");
    let $header = $("<header>");
    let $addProfilePic = $("<img/>")
      .addClass("profile-pic")
      .attr("src", profilePicElement);
    let $addUsername = $("<h2>")
      .addClass("username")
      .text(usernameElement);
    let $addHandle = $("<p>")
      .addClass("tweeter-handle")
      .text(handleElement);
    let $addContentContainer = $("<div>").addClass("tweet-body");
    let $tweetTextContainer = $("<p>").text(contentElement);

    let $addTime = $("<time>").text(timeElement);
    let $iconFlag = $("<i>").addClass("fas fa-flag");
    let $iconRetweet = $("<i>").addClass("fas fa-retweet");
    let $iconHeart = $("<i>").addClass("fas fa-heart");
    let $footer = $("<footer>")
      .addClass("tweet-footer")
      .append($iconHeart, $iconFlag, $iconRetweet);

    //appends the HTML tags for any new tweet that is created
    let $result = $("<article>")
      .addClass("tweet-container")
      .append(
        $tweet,
        $header,
        $addProfilePic,
        $addUsername,
        $addHandle,
        $addContentContainer,
        $tweetTextContainer,
        $footer,
        $addTime
      );
    return $result;
  }

  //
  function renderTweets(tweets) {
    tweets.forEach(function(tweets) {
      $("#new-tweet-container").prepend(createTweetElement(tweets));
    });
  }

  //posts the tweet on the page. Is only rendered if the tweet is not empty and is less than 140 characters
  $(".new-tweet form input[type='submit']").click(function(event) {
    event.preventDefault();
    console.log($("form textarea").val().length);
    if ($("form textarea").val().length > 140) {
      $(".isa_error_long").css("visibility", "visible");
      $(".isa_error_empty").css("visibility", "hidden");
    } else if (
      $("form textarea").val() === "" ||
      $("form textarea").val() === null
    ) {
      $(".isa_error_empty").css("visibility", "visible");
      $(".isa_error_long").css("visibility", "hidden");
    } else {
      $(".isa_error_empty").css("visibility", "hidden");
      $(".isa_error_long").css("visibility", "hidden");
      $.ajax({
        type: "POST",
        url: $(".new-tweet form").attr("action"),
        data: $(".new-tweet form").serialize(),
        success: function(data) {
          loadTweets();
          $("form textarea").val("");
        }
      });
    }
    return false;
  });

  //get request that loads the tweets to be displayed on the page
  function loadTweets() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/tweets",
      success: function(data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();
});
