// Get the hash of the url

var deviceId;
var acc_token;
var player;

function setUpSpotifyPlayer(){
  // localStorage.setItem('spotifyToken',token);
  const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
  window.location.hash = '';

  // Set token
  var _token;
  // if(localStorage.getItem('spotifyToken') === 'undefined')
  //   localStorage.setItem('spotifyToken', hash.access_token);
  // if(localStorage.getItem('spotifyToken')!=='undefined')
  // {
  //   console.log('localStorage : ' + localStorage.getItem('spotifyToken'));
  //   _token=localStorage.getItem('spotifyToken');
  //   console.log('_TOKEN ; ' + _token);
  // } else {
    _token = hash.access_token;
  // }

  const authEndpoint = 'https://accounts.spotify.com/authorize';

  // Replace with your app's client ID, redirect URI and desired scopes
  const clientId = 'd900fe3c74af46f49f4bdc6dc0644c55';
  const redirectUri = 'http://localhost:4200/callback';
  const scopes = [
    'streaming',
    'user-read-birthdate',
    'user-read-private',
    'user-modify-playback-state'
  ];

  // If there is no token, redirect to Spotify authorization
  if (!_token) {
    // alert(localStorage.getItem('spotifyToken'));
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  }

  // Set up the Web Playback SDK

  window.onSpotifyPlayerAPIReady = () => {
    // _token = localStorage.geItem('spotifyToken');
    console.log('token:' + _token);
    console.log('REFRESH TOKEN?' + JSON.stringify(hash));
    // localStorage.setItem('spotifyToken',_token);
    console.log('TOKENTOKEN' + localStorage.getItem('spotifyToken'));
    player = new Spotify.Player({
      name: 'Web Playback SDK Template',
      getOAuthToken: cb => { cb(_token); }
    });

    // Error handling
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));

    // Playback status updates
    player.on('player_state_changed', state => {
      console.log(state)
      $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
      $('#current-track-name').text(state.track_window.current_track.name);
    });

    // Ready
    player.on('ready', data => {
      console.log('Ready with Device ID', data.device_id);
      deviceId=data.device_id;
      acc_token=_token;
      // Play a track using our new device ID
      // play(deviceId,_token);
    });

    // Connect to the player!
    player.connect();
  }
}

// Play a specified track on the Web Playback SDK's device ID
function playSpotify(uri) {
  console.log('playing');
  // console.log('token:' + _token);
  console.log('uri'+uri);
  $.ajax({
   url: "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me/player/play?device_id=" + deviceId,
   type: "PUT",
   data: '{"uris": ["'+uri+'"]}',
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + acc_token );},
   success: function(data) {
     console.log(data)
   }
  });


}
function pauseSpotify(){
  player.pause();
}

function resumeSpotify(){
  player.resume();
}

