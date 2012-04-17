$ ->
  hash = window.location.hash.substring 1
  unless hash == ''
    $('#url').val hash
    update_player hash
  $('button').bind 'click', (event) =>
    update_player $('#url').val()
  $('#url').bind 'keyup', (event) =>
    if event.keyCode == 13
      $('button').click()

delay = (secs, callback) ->
  window.setTimeout(callback, secs)

update_player = (playlist_url) ->
  window.location.hash = playlist_url
  $.ajax '/api/get_stream_file.api',
    type: 'POST'
    dataType: 'jsonp'
    cache: false
    data:
      playlist: playlist_url
    success: (data) ->
      container = $('#jscontainer')
      container.empty()
      if data.status == 'FAIL'
        text = $('<p />');
        text.html 'Oops. The server told me about an error:<br />"' +
          data.message + '"<br />I\'m sorry'
        text.appendTo container
      else
        centerelement = $('<div />');
        centerelement.addClass 'center'
        element = $('<div />');
        element.attr 'id', 'flashcontainer'
        element.appendTo centerelement
        centerelement.appendTo container

        #jwplayer('flashcontainer').setup
        #  'flashplayer': '/static/mediaplayer/player.swf'
        #  'file': data.urls[1]
        #  'autostart': true
        #  'controlbar': 'bottom'
        #  'width': '470'
        #  'height': '24'

        audio = $('<audio />');
        audio.attr
          'controls': 'controls'
          'autoplay': 'autoplay'
          'preload': 'none'
        urls = [ data.urls[1] + '/;', data.urls[1] ]
        for url in urls
          sound = $('<source />');
          sound.attr 'type', 'audio/mpeg'
          sound.attr 'src', url
          sound.appendTo audio
        audio.appendTo $('#flashcontainer')

        delay 15000, ->
          if $('audio')[0].currentTime < 1
            alert 'I\'m sorry but the browser seems not to be able to play that stream. ' +
              'When it is a MP3 stream they made strange things with it...'
