import { soundCloudPlaylist } from './../model/albumResults';
import { SoundcloudServices } from './../services/soundcloud.services';
import { SpotifyService } from './../services/spotify.services';
import { Component, OnInit } from '@angular/core';
import { spotifyTrack, soundCloudTrack } from '../model/trackResults';
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
  playlistSelected=false;


  constructor(private spotifyService:SpotifyService, private soundcloudServices:SoundcloudServices) { }

  ngOnInit() {
    this.spotifyTracks = [];
    this.spotifyService.getAuth()
      .subscribe(response => this.spotifyService.getLibrary(response.access_token)
      .subscribe(
       library => {
         library.items.forEach(item => {
           this.spotifyTracks.push(item.track);
         });
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
    this.playlistSelected=true;
    this.soundcloudServices.getPlaylistTracks(id)
    .subscribe(res=>{
      this.soundCloudTracks = res.tracks;
      // console.log('before sc component', JSON.stringify(res.tracks, undefined, 2));
    });
  }
  
}
