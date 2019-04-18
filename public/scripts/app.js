/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];




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
    $("#new-tweet-container").append(createTweetElement(tweets));
  })
}

renderTweets(data);


      $(".new-tweet form input[type='submit']").click(function(event) {
        event.preventDefault();
        $.ajax({
          type: "POST",
          url: $(".new-tweet form").attr("action"),
          data: $(".new-tweet form").serialize(),
          success: function(data)
          {
          alert(data);
        }
         });
    return false;
  });

})





