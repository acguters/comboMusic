import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SpotifyService{
  private baseUrl= 'https://api.spotify.com/v1/';
  private searchUrl:string;
  private clientId:string=environment.clientId;
  private clientSecret:string=environment.clientSecret;
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  constructor(private _http:Http){

  }

  getAuth = () => {

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this._http.post(this.proxyurl + 'https://accounts.spotify.com/api/token', body, { headers: headers })
      .pipe(map(res => res.json()));

  }

  searchMusic(str:string, type:string,authToken:string){
    console.log(type);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    switch(type)
    {
      case 'artists':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset=0&limit=20&type=artist&market=US';
        break;
      case 'tracks':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset=0&limit=20&type=track&market=US';
        break;
      case 'albums':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset=0&limit=20&type=album&market=US';
        // console.log("inalbum");
        break;
      case 'playlists':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset=0&limit=20&type=playlist&market=US';
    }
    console.log(this.searchUrl);
    return this._http.get(this.searchUrl,{headers:headers}).pipe(map(res =>res.json()));
  }


}
