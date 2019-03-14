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
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [SpotifyService, playerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
