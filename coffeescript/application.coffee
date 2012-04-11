$ ->
  hash = window.location.hash.substring 1
  unless hash == ''
    update_player hash

update_player = (playlist_url) ->
  $.ajax '/api/get_stream_file.api',
    type: 'POST'
    dataType: 'jsonp'
    cache: false
    data:
      playlist: playlist_url
    jsonpCallback: 'generate_player'

generate_player = (data) ->
  console.log data
