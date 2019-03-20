import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { artistResult, soundcloudArtist } from '../model/artistResults';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input()
  artistRes:artistResult;

  @Input()
  soundcloudArtist:soundcloudArtist;

  @Output()
  selectedSpotifyArtist = new EventEmitter<artistResult>();

  @Output()
  selectedscArtist = new EventEmitter<soundcloudArtist>();

  constructor() { }

  ngOnInit() {
    // console.log('FEPFOWIEJFPWOEIFJWPOFIWJE');
  }

  selectSpotifyArtist(){
    console.log(this.artistRes.name);
    this.selectedSpotifyArtist.emit(this.artistRes);
  }

  selectscArtist(){
    this.selectedscArtist.emit(this.soundcloudArtist);
  }

}
