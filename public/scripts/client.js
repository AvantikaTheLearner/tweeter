/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  //this handler shows the form when user wants to write a new tweet
  $(".fa-angle-double-down").on('click', function() {
    $("#new-tweet-form").show();
  });

  //this function submits an ajax request to load all the tweets from Json data
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (data) => {
        renderTweets(data);
  
      },
      error: (err) => {
        console.log(`there was an error: ${err}`);
      }
    });
  };

  loadTweets();

  //this function helps in rendering the tweets while submitting ajax request
  const renderTweets = function(tweets) {

    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);// this is used to show the most recent tweet on top
    }
  };

  //this function helps to avoid cross-site scripting attacks
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //this function creates a new tweet
  const createTweetElement = function(tweetObj) {
    const $tweetObj = $(`<article class="all-tweets">
      <header class="tweetHeader">
        <div class="imageClass">
          <img src="${tweetObj.user.avatars}" width="75" height="75">
          <p>${tweetObj.user.name}</p>
        </div>
        <div class="handleName">
          <span>${tweetObj.user.handle}</span>
        </div>
      </header>
      <div class="tweetContent">
        <p>${escape(tweetObj.content.text)}</p>
      </div>
      <footer class="tweetFooter">
        <span>${timeago.format(tweetObj.created_at)}</span>
        <div class="iconsClass">
          <span><i class="fas fa-flag"></i></span>
          <span><i class="fas fa-retweet"></i></span>
          <span><i class="fas fa-heart"></i></span>
        </div>
      </footer>
    </article>`);
  
    return $tweetObj;
  };

  //this handler is called when user clicks on submit post writing a tweet
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    const $form = $(this);
    const $tweetText = $form.find("textarea");
    const $tweetLength = $tweetText.val().trim().length;
    
    if (!$tweetLength) {
      $(".emptyMsg").slideDown("slow");
      $(".errorMsg").hide();
      return;

    } else if ($tweetLength > 140) {
      $(".errorMsg").slideDown("slow");
      $(".emptyMsg").hide();
      return;

    } else {
      const serializedData = $(this).serialize();
      $.post("/tweets", serializedData, (response) => {
        loadTweets();
        $("#tweet-text").val('');
      });
    }
  });


});