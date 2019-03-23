import { soundCloudTrack } from './../model/trackResults';
// import { spotifyTrack } from './../model/trackResults';
import { Component, OnInit, Input } from '@angular/core';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';
import { playerService } from '../services/player.services';

declare var playSpotify:any;
declare var playSC:any;
declare var pauseSpotify:any;
// declare var resu
declare var pauseSC:any;

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.css']
})
export class TrackSearchComponent implements OnInit {

  @Input()
  spotifyTracks:spotifyTrack[];

  @Input()
  soundCloudTracks:soundCloudTrack[];

  @Input()
  spotifyTrack:spotifyTrack;

  @Input()
  soundCloudTrack:soundCloudTrack;

  @Input()
  index:number;

  private currentSpotifyTracks:spotifyTrack[];
  private currentscTracks:soundCloudTrack[];
  private currentStream:string;
  private prevIndex=0;

  constructor(private service: playerService) { }



  ngOnInit() {
    this.service.currentSpotifyTracks.subscribe(spotifyTracks => this.currentSpotifyTracks = spotifyTracks);
    this.service.currentscTracks.subscribe(soundCloudTracks => this.currentscTracks=soundCloudTracks);
    this.service.currentService.subscribe(stream => this.currentStream = stream);
    this.service.currentPrevIndex.subscribe(index => this.prevIndex = index);
    // this.service.currentIndex.subscribe(index => this.index = index);
    // console.log(this.spotifyTrack.album.images[0].url);
    // document.querySelector("popularyBar").getElementsByClassName.c
  }

  msToS(ms:number){
    let sec = ms/1000;
    let min = Math.floor(sec/60);
    let seconds = Math.floor(sec%60);
    if(seconds<10) return min+':0'+seconds;
    return min+':'+seconds;
  }

  playSpotifyTrack(){
    // console.log('before spotify play: ' +this.spotifyTrack);
    if(this.currentStream==='soundCloud'){
      this.currentscTracks[this.prevIndex].isPlaying=false;
      this.service.updatescTracks(this.currentscTracks);
      pauseSC();
    }  else{
      this.currentSpotifyTracks[this.prevIndex].isPlaying=false;
      // this.prevIndex=this.index;
    }
    this.service.playSpotifyTrack(this.spotifyTrack, this.index);
    playSpotify(this.spotifyTrack.uri);
    console.log(this.spotifyTrack.name);
    // this.selectedSpotifyTrack[this.]
    this.currentSpotifyTracks[this.index].isPlaying=true;
    this.service.updateSpotifyTracks(this.currentSpotifyTracks);
    // this.service.updateSelectedSpotify(this.index);
    // console.log('SELECTED?' + this.selectedSpotifyTrack[this.index].isPlaying);
    // this.spotifyTrack.isPlaying=true;
  }

  playSoundCloudTrack(){
    console.log('before soundcloud play: ' + this.currentscTracks.length);
    if(this.currentStream==='spotify'){
      this.currentSpotifyTracks[this.prevIndex].isPlaying=false;
      this.service.updateSpotifyTracks(this.currentSpotifyTracks);
      pauseSpotify();
    }else{
      this.currentscTracks[this.prevIndex].isPlaying=false;
      // this.prevIndex=this.index;
    }
    this.service.playSoundCloudTrack(this.soundCloudTrack,this.index);
    playSC('/tracks/'+this.soundCloudTrack.id.toString());
    this.currentscTracks[this.index].isPlaying=true;
    this.service.updatescTracks(this.currentscTracks);
    // this.soundCloudTrack.isPlaying=false;
  }

  updateSpotifyPlaylist(){

  }

}
