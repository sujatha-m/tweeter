/* eslint-disable camelcase */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac'
    },
    content: {
      text:
        'If I have seen further it is by standing on the shoulders of giants'
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd'
    },
    content: {
      text: 'Je pense , donc je suis'
    },
    created_at: 1461113959088
  }
];

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
$(document).ready(function() {
  $('.new-tweet form').on('submit',function(event) {
    event.preventDefault();
    $.ajax('/tweets/',{
      method:'POST',
      data:$(this).serialize(),
    });
  });

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
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>
  </footer>
  </article>
  `;
    return $tweet;
  };

  renderTweets(data);
});
