// import { soundcloudArtist } from './../../data/supportDB';
import { spotifyAlbum, soundCloudPlaylist } from './../model/albumResults';
import { SoundcloudServices } from './../services/soundcloud.services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { artistResult, soundcloudArtist } from '../model/artistResults';
import { SpotifyService } from '../services/spotify.services';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';
import { playerService } from '../services/player.services';
// import { spotifyAlbum } from '../model/albumResults';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.css']
})
export class ViewArtistComponent implements OnInit {

  @Input()
  spotifyArtist:artistResult;

  @Input()
  scArtist:soundcloudArtist;

  @Input()
  stream:string;

  spotifyTracks:spotifyTrack[];
  spotifyTrack:spotifyTrack;

  spotifyAlbums:spotifyAlbum[];
  spotifyAlbum:spotifyAlbum;

  scTracks:soundCloudTrack[];
  scTrack:soundCloudTrack;

  scPlaylists:soundCloudPlaylist[];
  scPlaylist:soundCloudPlaylist;

  @Output()
  onBack = new EventEmitter<boolean>();

  constructor(private spotify:SpotifyService, private sc:SoundcloudServices, private player:playerService) { }

  ngOnInit() {

    if(this.stream==='spotify'){
      this.spotify.getArtistTopTracks(this.spotifyArtist.id)
      .subscribe(res=>{
        this.spotifyTracks = res.tracks;
        // console.log(res);

      });

      this.spotify.getArtistAlbums(this.spotifyArtist.id)
      .subscribe(res =>{
        this.spotifyAlbums = res.items;
        // console.log(res);
      });
   }else{
    this.sc.getUserTracks(this.scArtist.id.toString())
    .subscribe(res =>{
      console.log(res);
      this.scTracks=res;
      // this.scTracks = res.collection;
    });

    this.sc.getUserPlaylists(this.scArtist.id.toString())
    .subscribe(res=>{
      console.log(res);
      this.scPlaylists=res;
    });
  }

  }

  goBack(){
    this.onBack.emit(false);
  }
  // this.spotifyArtist.

}
