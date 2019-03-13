import { soundCloudPlaylist } from './../model/albumResults';
import { Component, OnInit, Input } from '@angular/core';
import { spotifyPlaylist } from '../model/playlistResults';

@Component({
  selector: 'app-playlist-search',
  templateUrl: './playlist-search.component.html',
  styleUrls: ['./playlist-search.component.css']
})
export class PlaylistSearchComponent implements OnInit {

  @Input()
  spotifyPlaylist:spotifyPlaylist;

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
