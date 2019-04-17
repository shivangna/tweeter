
$(document).ready(function() {
    console.log('validated!');
      $('.new-tweet textarea').on('input', function() {
        console.log($(this));
        let tweetlength = $(this).val().length;
        $('.counter',$(this).parent()).text( 140 - tweetlength);
        if (tweetlength > 140) {
          $('.counter').css('color', 'red')
        } else {
          $('.counter').css('color', 'black')
        }
      })
    });


