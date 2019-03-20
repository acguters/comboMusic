import { soundCloudPlaylist } from './../model/albumResults';
import { SoundcloudServices } from './../services/soundcloud.services';
import { SpotifyService } from './../services/spotify.services';
import { Component, OnInit } from '@angular/core';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';
import { playerService } from '../services/player.services';
// import { soundCloudPlaylist } from '../model/albumResults';

@Component({
  selector: 'app-your-songs',
  templateUrl: './your-songs.component.html',
  styleUrls: ['./your-songs.component.css']
})
export class YourSongsComponent implements OnInit {

  spotifyTracks: spotifyTrack[];
  soundCloudTracks: soundCloudTrack[];
  soundCloudPlaylists: soundCloudPlaylist[];
  offset=0;
  playlistSelected=false;
  scOffset:string;
  scid:string;


  constructor(private spotifyService:SpotifyService, private soundcloudServices:SoundcloudServices, private player:playerService) { }

  ngOnInit() {
    this.spotifyTracks = [];
    this.spotifyService.getAuth()
      .subscribe(response => this.spotifyService.getLibrary(response.access_token,this.offset)
      .subscribe(
       library => {
         library.items.forEach(item => {
           this.spotifyTracks.push(item.track);
         });
         this.player.updateSpotifyTracks(this.spotifyTracks);
        //  this.spotifyTracks = library.items;
        // console.log('before spotify component', JSON.stringify(library.items[0].track, undefined, 2));
        }));
    this.soundcloudServices.getUserPlaylists(localStorage.getItem('scUserId'))
    .subscribe(res => {
      this.soundCloudPlaylists=res;
      // console.log(this.soundCloudPlaylists.length);
      // console.log('before sc component', JSON.stringify(res, undefined, 2));
    });
  }

  openPlaylist(id:string){
    this.scid=id;
    this.playlistSelected=true;
    this.soundcloudServices.getPlaylistTracks(id)
    .subscribe(res=>{
      this.soundCloudTracks = res.tracks;
      this.scOffset=res.next_href;
      this.player.updatescTracks(this.soundCloudTracks);
      console.log('before sc component', JSON.stringify(res, undefined, 2));
    });
  }

  moreSpotifySongs(){
    console.log('loading more songs');
    this.offset+=20;
    this.spotifyService.getAuth()
      .subscribe(response => this.spotifyService.getLibrary(response.access_token,this.offset)
      .subscribe(
       library => {
         library.items.forEach(item => {
           this.spotifyTracks.push(item.track);
         });
         this.player.updateSpotifyTracks(this.spotifyTracks);
        //  this.spotifyTracks = library.items;
        // console.log('before spotify component', JSON.stringify(library.items[0].track, undefined, 2));
        }));
  }

  morescSongs(){
    // this.scOffset += 20;
    this.soundcloudServices.getMorePlaylistTracks(this.scid, this.scOffset)
    .subscribe(res=>{
      this.soundCloudTracks.push.apply(this.soundCloudTracks,res.tracks);
      this.player.updatescTracks(this.soundCloudTracks);
      this.scOffset=res.user_href;
      // console.log('before sc component', JSON.stringify(res.tracks, undefined, 2));
    });
  }

  // morescSongs(){
  //   this.soundcloudServices.getUserPlaylists(localStorage.getItem('scUserId'),this.scOffset)
  //   .subscribe(res => {
  //     this.soundCloudPlaylists=res;
  //     // console.log(this.soundCloudPlaylists.length);
  //     // console.log('before sc component', JSON.stringify(res, undefined, 2));
  //   });
  // }

}
