import { playerService } from './../services/player.services';
import { PlayerComponent } from './../player/player.component';
import { TrackSearchComponent } from './../track-search/track-search.component';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DemoMaterialModule} from '../../material-module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {HttpModule} from '@angular/http';
import { SpotifyService } from '../services/spotify.services';
import { SearchResultComponent } from '../search-result/search-result.component';
import { AlbumSearchComponent } from '../album-search/album-search.component';
import { PlaylistSearchComponent } from '../playlist-search/playlist-search.component';
import { YourSongsComponent } from '../your-songs/your-songs.component';
import { SoundcloudServices } from '../services/soundcloud.services';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ViewArtistComponent } from '../view-artist/view-artist.component';
import { ViewAlbumComponent } from '../view-album/view-album.component';
import { ViewPlaylistComponent } from '../view-playlist/view-playlist.component';
// import {playerService}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SearchComponent,
    HomeComponent,
    SearchResultComponent,
    TrackSearchComponent,
    AlbumSearchComponent,
    PlaylistSearchComponent,
    PlayerComponent,
    YourSongsComponent,
    ViewArtistComponent,
    ViewAlbumComponent,
    ViewPlaylistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpModule,
    InfiniteScrollModule
  ],
  providers: [SpotifyService, playerService, SoundcloudServices, {provide: "SpotifyConfig" , useValue: {
    clientId: 'd900fe3c74af46f49f4bdc6dc0644c55',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private user-top-read user-read-recently-played',
        // If you already have an authToken
    authToken: localStorage.getItem('angular2-spotify-token')
}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
