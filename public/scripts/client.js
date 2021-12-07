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
  //Function that post the tweets
  $('.new-tweet form').on('submit',function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    if (data === 'text=') {
      return alert('You cannot post empty tweet');
    } else if (data.length > 145) {
      return alert('Your tweet is too long to submit');
    } else {
      $.ajax('/tweets/',{
        method:'POST',
        data,
      });
    }
  });
  //function that get the tweets from the url /tweets/ in json format
  const loadTweets = function() {
    $.ajax('/tweets/', {
      method:'GET',
      success: tweets => renderTweets(tweets),
    });
  };

  loadTweets();

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
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
    <section>${tweet.content.text}</section>
    <footer>
    <div>${tweet.created_at}</div>
    <span class="icons">
    <button class='delete' type="button">delete</button>
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
