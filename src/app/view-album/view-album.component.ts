// import { spotifyTrack } from './../model/trackResults';
import { SpotifyService } from './../services/spotify.services';
import { spotifyAlbum, soundCloudPlaylist } from './../model/albumResults';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SoundcloudServices } from '../services/soundcloud.services';
import { playerService } from '../services/player.services';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';

@Component({
  selector: 'app-view-album',
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.css']
})
export class ViewAlbumComponent implements OnInit {

  @Input()
  spotifyAlbum:spotifyAlbum;

  @Input()
  scPlaylist:soundCloudPlaylist;

  @Input()
  stream:string;

  spotifyTracks:spotifyTrack[];
  scTracks:soundCloudTrack[];


  @Output()
  onBack = new EventEmitter<boolean>();

  constructor(private spotify:SpotifyService, private sc:SoundcloudServices, private player:playerService) { }

  ngOnInit() {
    if(this.stream==='spotify'){
      this.spotify.getAlbumTracks(this.spotifyAlbum.id)
      .subscribe(res=>{
        this.spotifyTracks=res.items;
        for(let track of this.spotifyTracks){
          track.album=this.spotifyAlbum;
        }
        // this.spotifyTracks = res
        // console.log('before spotify component', JSON.stringify(res.items[0], undefined, 2));
      });
    } else {
      this.sc.getPlaylistTracks(this.scPlaylist.id.toString())
      .subscribe(res => {
        this.scTracks = res.tracks;
        // console.log('length'+res.length);
        // console.log('before sc component', JSON.stringify(res, undefined, 2));
      });
    }
  }

  goBack(){
      this.onBack.emit(false);
  }

}
