const maxChar = 140;
$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    const textAreaLength = $(this).val().length;
    if(textAreaLength > 0) {
      $(".emptyMsg").hide();
    }
    let remainingChar = maxChar - textAreaLength;
    if(remainingChar > 0) {
      $(".errorMsg").hide();
    }
    $('.counter').text(remainingChar);
    if (remainingChar < 0) {
      $('.counter').text(remainingChar).css({"color": "red"});
    } else {
      $('.counter').text(remainingChar).css({"color": "black"});
    }
  });
});



