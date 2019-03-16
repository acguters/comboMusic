import { SearchComponent } from './../search/search.component';
import { Component, OnInit } from '@angular/core';
import * as spotifyPlayer from '../../assets/js/spotify-player.js';

// #region
declare var setUpPlayer:any;
// #endregion


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // spotifyPlay:spotifyPlayer;
  constructor() { }

  ngOnInit() {
    // console.log("home loaded");
    // setUpPlayer();

  }

}
