import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SpotifyConfig {
  clientId: string,
  redirectUri: string,
  scope: string,
  authToken?: string,
  apiBase: string,
}

export interface SpotifyOptions {
  limit?: number,
  offset?: number,
  market?: string,
  album_type?: string,
  country?: string,
  type?: string,
  q?: string,
  timestamp?: string,
  locale?: string,
  public?: boolean,
  name?: string,
  time_range?: string,
  after?: string,
  before?: string,
}
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
    // console.log("HEELO????????");

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    // console.log("aposef????????");

    return this._http.post(this.proxyurl + 'https://accounts.spotify.com/api/token', body, { headers: headers })
      .pipe(map(res => res.json()));

  }

  searchMusic(str:string, type:string,authToken:string,offset:number){
    console.log(type);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    switch(type)
    {
      case 'artists':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset='+offset+'&limit=20&type=artist&market=US';
        break;
      case 'tracks':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset='+offset+'&limit=20&type=track&market=US';
        break;
      case 'albums':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset='+offset+'&limit=20&type=album&market=US';
        // console.log("inalbum");
        break;
      case 'playlists':
        this.searchUrl = this.baseUrl+'search?query='+str+'&offset='+offset+'&limit=20&type=playlist&market=US';
    }
    console.log(this.searchUrl);
    return this._http.get(this.searchUrl,{headers:headers}).pipe(map(res =>res.json()));
  }

  getLibrary(authToken:string,offset:number){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('spotifyToken'));
    console.log("spotifyservicestoken:" + localStorage.getItem('spotifyToken'));
    let libraryUrl = this.baseUrl +'me/tracks?offset='+offset+'&limit=20';
    return this._http.get(libraryUrl,{headers:headers}).pipe(map(res=>res.json()));
  }

  getArtistTopTracks(id:string){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('spotifyToken'));
    console.log("spotifyservicestoken:" + localStorage.getItem('spotifyToken'));
    let topUrl = this.baseUrl +'artists/'+id+'/top-tracks?country=US';
    return this._http.get(topUrl,{headers:headers}).pipe(map(res=>res.json()));
  }

  getArtistAlbums(id:string){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('spotifyToken'));
    console.log("spotifyservicestoken:" + localStorage.getItem('spotifyToken'));
    let topUrl = this.baseUrl +'artists/'+id+'/albums?country=US&limit=50';
    return this._http.get(topUrl,{headers:headers}).pipe(map(res=>res.json()));
  }


}
