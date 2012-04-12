(function() {
  var delay, update_player;

  $(function() {
    var hash,
      _this = this;
    hash = window.location.hash.substring(1);
    if (hash !== '') {
      $('#url').val(hash);
      update_player(hash);
    }
    $('button').bind('click', function(event) {
      return update_player($('#url').val());
    });
    return $('#url').bind('keyup', function(event) {
      if (event.keyCode === 13) return $('button').click();
    });
  });

  delay = function(secs, callback) {
    return window.setTimeout(callback, secs);
  };

  update_player = function(playlist_url) {
    window.location.hash = playlist_url;
    return $.ajax('/api/get_stream_file.api', {
      type: 'POST',
      dataType: 'jsonp',
      cache: false,
      data: {
        playlist: playlist_url
      },
      success: function(data) {
        var audio, centerelement, container, element, sound, text, url, urls, _i, _len;
        container = $('#jscontainer');
        container.empty();
        if (data.status === 'FAIL') {
          text = $('<p />');
          text.html('Oops. The server told me about an error:<br />"' + data.message + '"<br />I\'m sorry');
          return text.appendTo(container);
        } else {
          centerelement = $('<div />');
          centerelement.addClass('center');
          element = $('<div />');
          element.attr('id', 'flashcontainer');
          element.appendTo(centerelement);
          centerelement.appendTo(container);
          audio = $('<audio />');
          audio.attr({
            'controls': 'controls',
            'autoplay': 'autoplay',
            'preload': 'none'
          });
          urls = [data.urls[1] + '/;', data.urls[1]];
          for (_i = 0, _len = urls.length; _i < _len; _i++) {
            url = urls[_i];
            sound = $('<source />');
            sound.attr('type', 'audio/mpeg');
            sound.attr('src', url);
            sound.appendTo(audio);
          }
          audio.appendTo($('#flashcontainer'));
          return delay(5000, function() {
            if ($('audio')[0].currentTime < 1) {
              return alert('I\'m sorry but the browser seems not to be able to play that stream. ' + 'When it is a MP3 stream they made strange things with it...');
            }
          });
        }
      }
    });
  };

}).call(this);
