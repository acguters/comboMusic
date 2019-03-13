import { Component, OnInit, Input } from '@angular/core';
import { artistResult, soundcloudArtist } from '../model/artistResults';

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

  constructor() { }

  ngOnInit() {
    // console.log('FEPFOWIEJFPWOEIFJWPOFIWJE');
  }

}
