(function() {
  var generate_player, update_player;

  $(function() {
    var hash;
    hash = window.location.hash.substring(1);
    if (hash !== '') return update_player(hash);
  });

  update_player = function(playlist_url) {
    return $.ajax('/api/get_stream_file.api', {
      type: 'POST',
      dataType: 'jsonp',
      cache: false,
      data: {
        playlist: playlist_url
      },
      jsonpCallback: 'generate_player'
    });
  };

  generate_player = function(data) {
    return console.log(data);
  };

}).call(this);
