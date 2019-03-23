// import { soundcloudArtist } from './../../data/supportDB';
import { soundCloudPlaylist } from './../model/albumResults';
import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { spotifyAlbum } from '../model/albumResults';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})
export class AlbumSearchComponent implements OnInit {

  @Input()
  spotifyAlbum:spotifyAlbum;

  @Input()
  soundCloudPlaylist:soundCloudPlaylist;

  @Output()
  selectedSpotifyAlbum = new EventEmitter<spotifyAlbum>();

  @Output()
  selectedscAlbum = new EventEmitter<soundCloudPlaylist>();

  constructor() { }

  ngOnInit() {
  }

  date(date:string)
  {
    let x = date.split(" ");
    let d = x[0];
    return d.substring(0,4)+'-'+d.substring(5,7)+'-'+d.substring(8);
  }

  selectSpotifyAlbum(){
    this.selectedSpotifyAlbum.emit(this.spotifyAlbum);
  }

  selectscAlbum(){
    this.selectedscAlbum.emit(this.soundCloudPlaylist);
  }
}
