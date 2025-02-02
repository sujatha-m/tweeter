/* eslint-disable camelcase */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
$(document).ready(function() {

  //function to make html text safe
  const escape = function(str) {
    let section = document.createElement("section");
    section.appendChild(document.createTextNode(str));
    return section.innerHTML;
  };

  $('.error-message').hide();

  //Function that post the tweets
  $('.new-tweet form').on('submit',function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    if (data === 'text=') {
      $('#error-text').empty();
      $('#error-text').append('<p>Enter a valid message</p>');
      $('.error-message').fadeIn();
      return;
    } else if (data.length > 145) {
      $('#error-text').empty();
      $('#error-text').append('<p>Your tweet is too long to submit limit 140 chars</p>');
      $('.error-message').fadeIn();
    } else {
      $.ajax('/tweets',{
        method:'POST',
        data,
        success: function() {
          loadTweets();
          $('#tweet-text').val('');
          $('.counter').text('140');
        }
      });
    }
  });
  //function that get the tweets from the url /tweets/ in json format
  const loadTweets = function() {
    $.ajax('/tweets', {
      method:'GET',
      dataType:'JSON',
      success: tweets => renderTweets(tweets),
    });
  };

  loadTweets();

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };
  /* Your code for creating the tweet element */
  const createTweetElement = function(tweet) {
    let $tweet = `<article class='tweet'>
      <header>
        <div class='tweet-icon'>
          <div class='icon-img'><img src=${tweet.user.avatars}></div>
          <div class='icon-text'>${tweet.user.name}</div>
        </div>
      <span class="user">@Username</span>
     </header>
    <section>${escape(tweet.content.text)}</section>
    <footer>
    <div>${timeago.format(tweet.created_at)}</div>
    <span class="icons">
      <i class="fas fa-flag"></i>
      <i id="delete" class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>
  </footer>
  </article>
  `;
    return $tweet;
  };
});
