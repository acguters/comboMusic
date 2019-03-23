import { soundCloudPlaylist, spotifyAlbum } from './../model/albumResults';
import { spotifyTrack, soundCloudTrack } from './../model/trackResults';
import { searchSelector } from './../../data/supportDB';
import { artistResult, soundcloudArtist } from '../model/artistResults';
import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../services/spotify.services';
import { FormControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SoundcloudServices } from '../services/soundcloud.services';
import { searchSelectors } from '../model/support';
import { spotifyPlaylist } from '../model/playlistResults';
import { playerService } from '../services/player.services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService, SoundcloudServices]
})
export class SearchComponent implements OnInit {
  searchStr: string;
  query: FormControl = new FormControl();
  // proxyurl = "https://cors-anywhere.herokuapp.com/";
  artistResults: artistResult[];
  soundCloudArtists: soundcloudArtist[];
  stream: string;
  selectors: searchSelectors[];
  currentSelected: string;
  spotifyTracks: spotifyTrack[];
  soundCloudTracks: soundCloudTrack[];
  spotifyAlbums: spotifyAlbum[];
  soundCloudPlaylists: soundCloudPlaylist[];
  soundCloudAlbums: spotifyPlaylist[];
  spotifyPlaylists: spotifyPlaylist[];
  offset = 0;
  scOffset: string;
  spotifyArtistSelected=false;
  selectedSpotifyArtist:artistResult;
  scArtistSelected=false;
  selectedSCArtist:soundcloudArtist;
  spotifyAlbumSelected=false;
  selectedSpotifyAlbum:spotifyAlbum;
  scAlbumSelected=false;
  selectedscAlbum:soundCloudPlaylist;
  spotifyPlaylistSelected=false;
  selectedSpotifyPlaylist:spotifyPlaylist;
  scPlaylistSelected=false;
  selectedscPlaylist:soundCloudPlaylist;

  // soundCloudArtists:artist

  constructor(private _spotifyService: SpotifyService, private _soundCloudService: SoundcloudServices, private player: playerService) {

   }

  ngOnInit() {
    this.setUpInitial();
    this.selectors = searchSelector;
    this.currentSelected = this.selectors[0].name;
    this.query.valueChanges
      .pipe(debounceTime(400))
      .subscribe(query => this._spotifyService.getAuth()
        .subscribe(res => this._spotifyService.searchMusic(query, this.currentSelected.toLowerCase(), res.access_token, 0).subscribe(
          res => {
            if (res.tracks) {
              this.offset = 0;
              this.spotifyTracks = res.tracks.items;
              for (let track of this.spotifyTracks){
                track.isPlaying = false;
              }
              console.log('check' + this.spotifyTracks[0].isPlaying);
              this.player.updateSpotifyTracks(this.spotifyTracks);
              this.player.currentSpotifyTracks.subscribe(spotifyTrack => this.spotifyTracks = spotifyTrack);
              // console.log('spotify'+res.tracks.items);
              // console.log('before spotify component', JSON.stringify(res.tracks.items[0], undefined, 2));
            } else if (res.artists) {
              this.artistResults = res.artists.items;
              // console.log('spotify'+res.artists.items);
              // console.log('before spotify component',JSON.stringify(res.artists.items[0],undefined,2));
            } else if (res.albums) {
              this.spotifyAlbums = res.albums.items;
              // console.log('spotify'+res.albums.items);
              // console.log('before spotify component', JSON.stringify(res.albums.items[0], undefined, 2));
            } else if (res.playlists) {
              this.spotifyPlaylists = res.playlists.items;
              // console.log('spotify' + res.playlists.items);
              // console.log('before spotify component', JSON.stringify(res.playlists.items[0], undefined, 2));
            }
        // this.soundCloudArtists = res.collection;
            this.stream = 'spotify';
            // this.artistResults = res.artists.items;
          })
        ));

    this.query.valueChanges
    .pipe(debounceTime(400))
    .subscribe(query => this._soundCloudService.searchMusic(query, this.currentSelected.toLowerCase()).subscribe(
      res => {
        console.log('soundcloud' + res.collection[0]);
        console.log('before soundcloud component', JSON.stringify(res.collection[0], undefined, 2));
        switch (this.currentSelected.toLowerCase()) {
          case 'tracks':
            this.soundCloudTracks = res.collection;
            this.player.updatescTracks(this.soundCloudTracks);
            this.scOffset = res.next_href;
            break;
          case 'artists':
            this.soundCloudArtists = res.collection;
            break;
          case 'albums':
            this.soundCloudAlbums = res.collection;
            break;
          case 'playlists':
            this.soundCloudPlaylists = res.collection;
            break;
        }
        // this.soundCloudArtists = res.collection;
        this.stream = 'soundcloud';
      }));
  }

  toggleSelected(index: number) {
    for (let i = 0; i < this.selectors.length; i++) {
      if (this.selectors[i].isSelected) { this.selectors[i].isSelected = !this.selectors[i].isSelected; }
    }
    this.selectors[index].isSelected = !this.selectors[index].isSelected;
    this.currentSelected = this.selectors[index].name;
  }

  setUpInitial() {
    const q = ['ariana', 'leave', 'purpose', 'R&B'];
    const c = ['artists', 'tracks', 'albums', 'playlists'];
    for (let i = 0; i < q.length; i++) {
      this._spotifyService.getAuth()
        .subscribe(response =>
          this._spotifyService.searchMusic(q[i], c[i], response.access_token, 0).subscribe(
          res => {
            if (res.tracks) {
              this.spotifyTracks = res.tracks.items;
              for (let track of this.spotifyTracks){
                track.isPlaying = false;
              }
              console.log('check' + this.spotifyTracks[0].isPlaying);
              this.player.updateSpotifyTracks(this.spotifyTracks);
              this.player.currentSpotifyTracks.subscribe(spotifyTrack => this.spotifyTracks = spotifyTrack);
              // console.log('doublecheck'+ this.spotifyTracks[0].isPlaying);
              // this.player.
              // console.log('spotify'+res.tracks.items);
              // console.log('before spotify component', JSON.stringify(res.tracks.items[0], undefined, 2));
            } else if (res.artists) {
              this.artistResults = res.artists.items;
              // console.log('spotify'+res.artists.items);
              // console.log('before spotify component',JSON.stringify(res.artists.items[0],undefined,2));
            } else if (res.albums) {
              this.spotifyAlbums = res.albums.items;
              // console.log('spotify'+res.albums.items);
              // console.log('before spotify component', JSON.stringify(res.albums.items[0], undefined, 2));
            } else if (res.playlists) {
              this.spotifyPlaylists = res.playlists.items;
              // console.log('spotify' + res.playlists.items);
              // console.log('before spotify component', JSON.stringify(res.playlists.items[0], undefined, 2));
            }
        // this.soundCloudArtists = res.collection;
            this.stream = 'spotify';
            // this.artistResults = res.artists.items;
          })
        );

      this._soundCloudService.searchMusic(q[i], c[i]).subscribe(
          res => {
            // console.log('soundcloud' + res.collection[0]);

            switch (c[i]) {
              case 'tracks':
                this.soundCloudTracks = res.collection;
                this.player.updatescTracks(this.soundCloudTracks);
                // console.log('before soundcloud component', JSON.stringify(res.collection[0], undefined, 2));
                this.scOffset = res.next_href;
                break;
              case 'artists':
                this.soundCloudArtists = res.collection;
                break;
              case 'albums':
                this.soundCloudAlbums = res.collection;
                // console.log('before soundcloud component', JSON.stringify(res.collection, undefined, 2));
                break;
              case 'playlists':
                this.soundCloudPlaylists = res.collection;
                break;
            }
            // this.soundCloudArtists = res.collection;
            this.stream = 'soundcloud';
        });
    }
  }

  moreSpotifySongs(){
      console.log('loading more songs');
      this.offset += 20;
      this._spotifyService.getAuth()
        .subscribe(response =>
          this._spotifyService.searchMusic(this.query.value, this.currentSelected.toLowerCase(), response.access_token, this.offset).subscribe(
          res => {
            if (res.tracks) {
              this.spotifyTracks.push.apply(this.spotifyTracks, res.tracks.items);
              console.log('tracklist' + this.spotifyTracks.length);
              for (let i = this.spotifyTracks.length - 1; i > this.spotifyTracks.length - 20; i--){
                this.spotifyTracks[i].isPlaying = false;
              }
              console.log('check' + this.spotifyTracks[0].isPlaying);
              this.player.updateSpotifyTracks(this.spotifyTracks);
              this.player.currentSpotifyTracks.subscribe(spotifyTrack => this.spotifyTracks = spotifyTrack);
              // console.log('doublecheck'+ this.spotifyTracks[0].isPlaying);
              // this.player.
              // console.log('spotify'+res.tracks.items);
              console.log('before spotify component', JSON.stringify(res.tracks.items[0], undefined, 2));
            }
            this.stream = 'spotify';
          })
        );
  }

  morescSongs(){
    // this.scOffset += 20;
    this._soundCloudService.getMoreSCTracks(this.scOffset)
    .subscribe(res =>{
      switch (this.currentSelected.toLowerCase()) {
        case 'tracks':
          this.soundCloudTracks.push.apply(this.soundCloudTracks, res.collection);
          for (let i = this.soundCloudTracks.length - 1; i > this.spotifyTracks.length - 20; i--){
            this.soundCloudTracks[i].isPlaying = false;
          }
          this.player.updatescTracks(this.soundCloudTracks);
          this.scOffset = res.next_href;
          break;
        case 'artists':
          this.soundCloudArtists = res.collection;
          break;
        case 'albums':
          this.soundCloudAlbums = res.collection;
          break;
        case 'playlists':
          this.soundCloudPlaylists = res.collection;
          break;
      }
      // this.soundCloudArtists = res.collection;
      this.stream = 'soundcloud';
    });
  }

  setSpotifyArtist($event){
    this.selectedSpotifyArtist=$event;
    console.log(this.selectedSpotifyArtist.name);
    this.spotifyArtistSelected=true;
  }

  artistReturned($event){
    this.spotifyArtistSelected=$event;
  }

  setscArtist($event){
    this.selectedSCArtist = $event;
    console.log(this.selectedSCArtist.username);
    this.scArtistSelected=true;
  }

  scArtistReturned($event){
    this.scArtistSelected=$event;
  }

  setSpotifyAlbum($event){
    this.selectedSpotifyAlbum=$event;
    // console.log(this.selectedSpotifyArtist.name);
    this.spotifyAlbumSelected=true;
  }

  setscAlbum($event){
    this.selectedscAlbum = $event;
    // console.log(this.selectedSCArtist.username);
    this.scAlbumSelected=true;
  }

  spotifyAlbumReturned($event){
    this.spotifyAlbumSelected=$event;
  }

  scAlbumReturned($event){
    this.scAlbumSelected=$event;
  }

  setSpotifyPlaylist($event){
    this.selectedSpotifyPlaylist=$event;
    // console.log(this.selectedSpotifyArtist.name);
    this.spotifyPlaylistSelected=true;
  }

  setscPlaylist($event){
    this.selectedscPlaylist = $event;
    // console.log(this.selectedSCArtist.username);
    this.scPlaylistSelected=true;
  }

  spotifyPlaylistReturned($event){
    this.spotifyPlaylistSelected=$event;
  }

  scPlaylistReturned($event){
    this.scPlaylistSelected=$event;
  }

}
