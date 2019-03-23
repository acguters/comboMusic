import { spotifyTrack, soundCloudTrack } from './../model/trackResults';
import { SoundcloudServices } from './../services/soundcloud.services';
import { SpotifyService } from './../services/spotify.services';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { playerService } from '../services/player.services';
import { spotifyPlaylist } from '../model/playlistResults';
import { soundCloudPlaylist } from '../model/albumResults';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.css']
})
export class ViewPlaylistComponent implements OnInit {

  @Input()
  spotifyPlaylist:spotifyPlaylist;

  @Input()
  scPlaylist:soundCloudPlaylist;

  @Input()
  stream:string;

  @Output()
  onBack = new EventEmitter<boolean>();

  spotifyTracks:spotifyTrack[];
  scTracks:soundCloudTrack[];

  constructor(private spotify:SpotifyService, private sc:SoundcloudServices, private player:playerService) { }

  ngOnInit() {
    if(this.stream==='spotify'){
      this.spotify.getPlaylistTracks(this.spotifyPlaylist.id)
      .subscribe(res=>{
        this.spotifyTracks=[];
        for(let item of res.items){
          this.spotifyTracks.push(item.track);
        }
        console.log(res);
      });
    } else {
      this.sc.getPlaylistTracks(this.scPlaylist.id.toString())
      .subscribe(res => {
        this.scTracks = res.tracks;
      });
    }
  }

  goBack(){
    this.onBack.emit(false);
}

}
