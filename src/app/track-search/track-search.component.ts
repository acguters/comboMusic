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
  spotifyTrack:spotifyTrack;

  @Input()
  soundCloudTrack:soundCloudTrack;

  private selectedSpotifyTrack:spotifyTrack;
  private selectedSCTrack:soundCloudTrack;
  private currentStream:string;

  constructor(private service: playerService) { }



  ngOnInit() {
    this.service.currentSpotifyTrack.subscribe(spotifyTrack => this.selectedSpotifyTrack = spotifyTrack);
    this.service.currentSCTrack.subscribe(soundCloudTrack => this.selectedSCTrack=soundCloudTrack);
    this.service.currentService.subscribe(stream => this.currentStream = stream);
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
    console.log('before spotify play: ' +this.currentStream);
    if(this.currentStream==='soundCloud') pauseSC();
    this.service.playSpotifyTrack(this.spotifyTrack);
    playSpotify(this.spotifyTrack.uri);
    console.log(this.spotifyTrack.name);
  }

  playSoundCloudTrack(){
    console.log('before soundcloud play: ' + this.currentStream);
    if(this.currentStream==='spotify') pauseSpotify();
    this.service.playSoundCloudTrack(this.soundCloudTrack);
    playSC('/tracks/'+this.soundCloudTrack.id.toString());
  }

}
