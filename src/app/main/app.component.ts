import { HttpClientModule } from '@angular/common/http';
import { leftMenuItem, leftMenuSubItem } from './../model/menuItem';
import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { leftItems } from 'src/data/leftMenuDB';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
// import {HTTP_PROVIDERS} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mode = new FormControl('side');
  selectedItem:leftMenuItem;
  selectedSubItem:leftMenuSubItem;
  subSelected=false;
  private client_id=environment.clientId;
  private scopes = 'user-read-private user-read-email user-library-read';
  private redirect_uri = 'https://localhost:4200/callback';

  // https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&
  //redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09
  constructor(private _http:Http){

  }
  ngOnInit() {
    this.selectedItem = leftItems[0];
    localStorage.setItem('scUserId','170784573');
    // console.log(this.selectedItem);
    // this._http.get('https://accounts.spotify.com/authorize?response_type=code&client_id='+this.client_id+
    // '&scope=' + encodeURIComponent(this.scopes)+'&redirect_uri='+encodeURIComponent(this.redirect_uri)).pipe(map(res => console.log('UHHHH'+res.json())));
  }

  onItemSelected(item:leftMenuItem){
    this.selectedItem=item;
    this.subSelected=false;
    // console.log("SELEcted");
    console.log(this.selectedItem);
  }

  onSubItemSelected(subItem:leftMenuSubItem){
    this.selectedSubItem = subItem;
    this.subSelected=true;
    console.log(this.selectedSubItem);
  }
}
