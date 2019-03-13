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
  // soundCloudArtists:artist

  constructor(private _spotifyService: SpotifyService, private _soundCloudService: SoundcloudServices) {

   }

  ngOnInit() {
    this.setUpInitial();
    this.selectors = searchSelector;
    this.currentSelected = this.selectors[0].name;
    this.query.valueChanges
      .pipe(debounceTime(400))
      .subscribe(query => this._spotifyService.getAuth()
        .subscribe(res => this._spotifyService.searchMusic(query, this.currentSelected.toLowerCase(), res.access_token).subscribe(
          res => {
            if (res.tracks) {
              this.spotifyTracks = res.tracks.items;
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
      if (this.selectors[i].isSelected) { this.selectors[i].isSelected=!this.selectors[i].isSelected; }
    }
    this.selectors[index].isSelected = !this.selectors[index].isSelected;
    this.currentSelected = this.selectors[index].name;
  }

  setUpInitial() {
    const q = ['ariana', 'leave', 'purpose', 'R&B'];
    const c = ['artists', 'tracks', 'albums', 'playlists'];
    for (let i = 0; i < q.length; i++) {
      this._spotifyService.getAuth()
        .subscribe(res => this._spotifyService.searchMusic(q[i], c[i], res.access_token).subscribe(
          res => {
            if (res.tracks) {
              this.spotifyTracks = res.tracks.items;
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
              this.spotifyPlaylists=res.playlists.items;
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
            console.log('soundcloud' + res.collection[0]);
            console.log('before soundcloud component', JSON.stringify(res.collection[0], undefined, 2));
            switch (c[i]) {
              case 'tracks':
                this.soundCloudTracks = res.collection;
                break;
              case 'artists':
                this.soundCloudArtists = res.collection;
                break;
              case 'albums':
                this.soundCloudAlbums = res.collection;
                break;
              case 'playlists':
                this.soundCloudPlaylists=res.collection;
                break;
            }
            // this.soundCloudArtists = res.collection;
            this.stream = 'soundcloud';
        });
    }
  }
}
