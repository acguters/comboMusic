import { spotifyAlbum } from './../model/albumResults';
import { SoundcloudServices } from './../services/soundcloud.services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { artistResult } from '../model/artistResults';
import { SpotifyService } from '../services/spotify.services';
import { spotifyTrack } from '../model/trackResults';
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

  spotifyTracks:spotifyTrack[];
  spotifyTrack:spotifyTrack;

  spotifyAlbums:spotifyAlbum[];
  spotifyAlbum:spotifyAlbum;

  @Output()
  onBack = new EventEmitter<boolean>();

  constructor(private spotify:SpotifyService, private sc:SoundcloudServices, private player:playerService) { }

  ngOnInit() {
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
  }

  goBack(){
    this.onBack.emit(false);
  }
  // this.spotifyArtist.

}
