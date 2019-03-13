import { soundCloudPlaylist } from './../model/albumResults';
import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  date(date:string)
  {
    let x = date.split(" ");
    let d = x[0];
    return d.substring(0,4)+'-'+d.substring(5,7)+'-'+d.substring(8);
  }
}
