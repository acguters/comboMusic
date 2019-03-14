// import { soundCloudTrack } from './../model/trackResults';
// import { spotifyTrack } from './../model/trackResults';
import { playerService } from './../services/player.services';
import { Component, OnInit } from '@angular/core';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';
import { environment } from '../../environments/environment';

// #region
declare var setUpSpotifyPlayer:any;
declare var pauseSpotify:any;
declare var resumeSpotify:any;
declare var initializeSC:any;
declare var pauseSC:any;
declare var resumeSC:any;
// #endregion


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  spotifyTrack:spotifyTrack;
  soundCloudTrack:soundCloudTrack;
  currentStream:string;
  play=true;
  imageURL:string;
  titleName:string;
  artistName:string;
  private SCclientId:string=environment.soundcloudId;

  constructor(private service: playerService) { }

  ngOnInit() {
    this.service.currentSpotifyTrack.subscribe(spotifyTrack => this.spotifyTrack = spotifyTrack);
    this.service.currentSCTrack.subscribe(soundCloudTrack => this.soundCloudTrack = soundCloudTrack);
    this.service.currentService.subscribe(stream => this.currentStream = stream);
    setUpSpotifyPlayer();
    initializeSC(this.SCclientId);
    if(this.currentStream==='spotify'){
      this.imageURL = this.spotifyTrack.album.images[0].url;
      this.titleName = this.spotifyTrack.name;
      this.artistName = this.spotifyTrack.artists[0].name;
    }
    if(this.currentStream==='soundCloud'){
      console.log('soundcloud selected' + this.soundCloudTrack.title + this.soundCloudTrack.user.username);
      this.imageURL = this.soundCloudTrack.artwork_url;
      this.titleName = this.soundCloudTrack.title;
      this.artistName = this.soundCloudTrack.user.username;
    }
    console.log("HELLO" + this.spotifyTrack.name);
    // console.log('soundcloud selected' + this.soundCloudTrack.title + this.soundCloudTrack.user.username);
  }

  togglePlay(){
    if(this.play){
      if(this.currentStream==='spotify') pauseSpotify();
      else pauseSC();
      // else
    }
    else{
      if(this.currentStream==='spotify') resumeSpotify();
      else resumeSC();
    }
    this.play=!this.play;
  }

}
