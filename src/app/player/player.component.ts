import { data } from './data';
// import { soundCloudTrack } from './../model/trackResults';
// import { spotifyTrack } from './../model/trackResults';
import { playerService } from './../services/player.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';
import { environment } from '../../environments/environment';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material';
// import {data}

// #region
declare var setUpSpotifyPlayer:any;
declare var pauseSpotify:any;
declare var resumeSpotify:any;
declare var initializeSC:any;
declare var pauseSC:any;
declare var resumeSC:any;
declare var playerPosition:any;
declare var spotifySeek:any;
declare var scSeek:any;
declare var playSpotify:any;
declare var playSC:any
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
  songDuration=1000;
  newSong=false;
  songPosition=0;
  isPaused=true;
  leftTime='';
  rightTime='';
  rightTimeTracker=0;
  newPosition:number;
  spotifyTracks:spotifyTrack[];
  scTracks:soundCloudTrack[];
  index:number;

  @ViewChild('slider')slider;

  constructor(private service: playerService) { }

  ngOnInit() {
    this.service.currentSpotifyTrack.subscribe(spotifyTrack => this.spotifyTrack = spotifyTrack);
    this.service.currentSCTrack.subscribe(soundCloudTrack => this.soundCloudTrack = soundCloudTrack);
    this.service.currentService.subscribe(stream => this.currentStream = stream);
    this.service.currentDuration.subscribe(duration => this.songDuration = duration);
    this.service.newSong.subscribe(newsong => this.newSong = newsong);
    this.service.currentSpotifyTracks.subscribe(spotifyTracks => this.spotifyTracks = spotifyTracks);
    this.service.currentscTracks.subscribe(soundCloudTrack => this.scTracks = soundCloudTrack);
    this.service.currentscTracks.subscribe(soundCloudTrack => this.scTracks = soundCloudTrack);
    this.service.currentIndex.subscribe(index => this.index=index);
    // this.service.currentIndex.subscribe()
    // setUpSpotifyPlayer();
    initializeSC(this.SCclientId);
    if(this.currentStream==='spotify'){
      this.imageURL = this.spotifyTrack.album.images[0].url;
      this.titleName = this.spotifyTrack.name;
      this.artistName = this.spotifyTrack.artists[0].name;
      // this.newSong
      // this.songDuration=1000;
      console.log("SONGDURATION"+this.spotifyTrack.name);
    }
    if(this.currentStream==='soundCloud'){
      console.log('soundcloud selected' + this.soundCloudTrack.title + this.soundCloudTrack.user.username);
      this.imageURL = this.soundCloudTrack.artwork_url;
      this.titleName = this.soundCloudTrack.title;
      this.artistName = this.soundCloudTrack.user.username;
      // this.songDuration = this.soundCloudTrack.duration/1000;
    }
    console.log("HELLO" + this.spotifyTrack.name);
    setInterval(() => {         //replaced function() by ()=>
      if(this.newSong){
        this.songPosition=0;
        this.service.updateSong();
        this.isPaused=false;
        this.leftTime='0:00';
        this.rightTime=this.msToS(Math.floor(this.songDuration));
        this.rightTimeTracker=Math.floor(this.songDuration);
        // console.log(this.rightTimeTracker);
      }
      if(this.isPaused===false) {
        this.songPosition+=.1;
        this.rightTimeTracker-=.1;
        this.leftTime=this.msToS(Math.floor(this.songPosition));
        this.rightTime=this.msToS(Math.floor(this.rightTimeTracker));
        if(Math.floor(this.songPosition)==Math.floor(this.songDuration)) this.nextSong();
      }
    }, 100);
    // console.log('soundcloud selected' + this.soundCloudTrack.title + this.soundCloudTrack.user.username);
  }

  formatLabel(value:number | null){
    if(!value){
      return '0:00';
    }
    // this.newPosition=value;
    // console.log(this.newPosition);

    let sec = value;
    let min = Math.floor(sec/60);
    let seconds = Math.floor(sec%60);
    if(seconds<10) return min+':0'+seconds;
    return min+':'+seconds;
    // return returnval;
  }

  togglePlay(){
    // this.songDuration=this.spotifyTrack.duration_ms/1000;
    // console.log
    if(this.play){
      if(this.currentStream==='spotify') pauseSpotify();
      else pauseSC();
      this.isPaused=true;
      // else
    }
    else{
      if(this.currentStream==='spotify') resumeSpotify();
      else resumeSC();
      this.isPaused=false;
    }
    this.play=!this.play;
  }

  msToS(ms:number){
    let sec = ms;
    let min = Math.floor(sec/60);
    let seconds = Math.floor(sec%60);
    if(seconds<10) return min+':0'+seconds;
    return min+':'+seconds;
  }

  changePositionDown(){
    console.log('mouseDown');
    this.isPaused=true;
    console.log(this.newPosition);
    console.log(this.spotifyTracks.length);
    console.log(this.index);
    // console.log(event.value);
    // console.log(event);

  }
  changePositionUp(){
    console.log('mouseUp');
    this.songPosition=this.newPosition;
    console.log(this.songPosition);
    console.log(this.newPosition);
    this.isPaused=false;
    this.rightTimeTracker=Math.floor(this.songDuration)-this.newPosition;
    if(this.currentStream==='spotify') spotifySeek(this.newPosition);
    else if(this.currentStream==='soundCloud') scSeek(this.newPosition);
    // this.leftTime=
  }

  nextSong(){
    this.service.updateIndex(this.index+1)
    if(this.currentStream==='spotify')
    {
      this.spotifyTracks[this.index-1].isPlaying=false;
      this.spotifyTracks[this.index].isPlaying=true;
      this.service.updateSpotifyTracks(this.spotifyTracks);
      this.service.playSpotifyTrack(this.spotifyTracks[this.index],this.index);
      playSpotify(this.spotifyTracks[this.index].uri);
    }
    else {
      this.scTracks[this.index-1].isPlaying=false;
      this.scTracks[this.index].isPlaying=true;
      this.service.updatescTracks(this.scTracks);
      this.service.playSoundCloudTrack(this.scTracks[this.index],this.index);
      playSC('/tracks/'+this.scTracks[this.index].id.toString());
    }
  }

  prevSong(){
    this.service.updateIndex(this.index-1);
    if(this.currentStream==='spotify'){
      // pause
      this.spotifyTracks[this.index+1].isPlaying=false;
      this.spotifyTracks[this.index].isPlaying=true;
      this.service.updateSpotifyTracks(this.spotifyTracks);
       this.service.playSpotifyTrack(this.spotifyTracks[this.index],this.index);
      //  if(this.currentStream==='soundCloud') pauseSC();
      //  this.service.playSpotifyTrack(this.spotifyTrack, this.index);
       playSpotify(this.spotifyTracks[this.index].uri);
    }
    else {
      this.scTracks[this.index+1].isPlaying=false;
      this.scTracks[this.index].isPlaying=true;
      this.service.updatescTracks(this.scTracks);
      this.service.playSoundCloudTrack(this.scTracks[this.index],this.index);
      playSC('/tracks/'+this.scTracks[this.index].id.toString());
    }
  }

  // playDown(){
  //   playdo
  // }




}
