import { Component, OnInit, Input } from '@angular/core';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';

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
  constructor() { }


  ngOnInit() {
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
}
