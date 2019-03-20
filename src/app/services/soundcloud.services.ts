import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams, RequestMethod, Response, Request} from '@angular/http';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPaginatedData, IRequestArgs, IRequestOptions } from './soundcloudInterfaces';
// import { request } from 'http';
@Injectable()
export class SoundcloudServices{
  private baseUrl= 'https://api.soundcloud.com';
  private searchUrl:string;
  private clientId:string=environment.soundcloudId;
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  private PAGINATION_PARAMS = `limit=${20}&linked_partitioning=1`;
  constructor(private _http:Http){

  }

  searchMusic(str:string, type:string){
      if(type==='albums') type = 'playlists';
      else if(type==='artists') type='users';
      return this.request({
        paginate:true,
        query:'q='+str,
        url:this.baseUrl+'/'+type
      })
  }

  request(options: IRequestOptions): Observable<any> {
    const req: Request = new Request(this.requestArgs(options));
    return this._http.request(req)
      .pipe(map((res: Response) => res.json()));
  }

  requestArgs(options: IRequestOptions): IRequestArgs {
    const { method, paginate, query, url } = options;
    let search: string[] = [];

    search.push('client_id='+this.clientId);
    if (paginate) search.push(this.PAGINATION_PARAMS);
    if (query) search.push(query);

    return {
      method: method || RequestMethod.Get,
      search: search.join('&'),
      url
    };
  }

  getUserPlaylists(userid:string){
    var url=this.baseUrl+'/users/'+userid+'/playlists?client_id='+this.clientId+'&limit=20';
    return this._http.get(url).pipe(map(res=>res.json()));
  }

  getPlaylistTracks(playlistId:string){
    var url = this.baseUrl+'/playlists/'+playlistId+'?client_id='+this.clientId+'&linked_partitioning=1';
    return this._http.request(url).pipe(map(res=>res.json()));
  }

  getMorePlaylistTracks(playlistId:string,path:string){
    var url = path+'&limit=30&linked_partitioning=1';
    return this._http.get(url).pipe(map(res=>res.json()));
  }

  getMoreSCTracks(path:string){
    var url = path+'&limit=30&linked_partitioning=1'
    return this._http.get(url).pipe(map(res=>res.json()));
  }

}
