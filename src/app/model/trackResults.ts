import { artistResult, soundcloudArtist } from './artistResults';
import { spotifyImage } from './support';
import { spotifyAlbum } from './albumResults';

export interface spotifyTrack{
  artists:artistResult[],
  duration_ms:number,
  external_urls:{spotify:string}
  href:string,
  id:string,
  is_local:false,
  is_playable:true,
  popularity:number,
  preview_url:string,
  name:string,
  uri:string,
  album:spotifyAlbum,
  explicit:boolean,
}

export interface soundCloudTrack{
  id: number;
  title:string;
  permalink_url:string;
  uri: string;
  artwork_url:string;
  description:string;
  reposts_count:number;
  user:soundcloudArtist;
  tracks_uri:string;
  duration:number;
  likes_count:number
}
