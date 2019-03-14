function initializeSC(id){
  SC.initialize({
    client_id: id.toString(),
    redirect_uri: 'http://example.com/callback'
  });
}

var SCplayer;

function playSC(endpoint){
  SC.stream(endpoint).then(function(sound){
    sound.play().then(function(){
      SCplayer=sound;
      console.log('Playback started!');
      // player.pause();
    }).catch(function(e){
      console.error('Playback rejected. Try calling play() from a user interaction.', e);
    });
  });
}

function pauseSC(){
  SCplayer.pause();
}

function resumeSC(){
  SCplayer.play();
}
