import { artistResult, soundcloudArtist } from './artistResults';
import { spotifyImage } from './support';

export interface spotifyAlbum{
  images:spotifyImage[];
  name:string;
  artists:artistResult[];
  release_date:string;
  total_tracks:number;
  uri:string;
  external_urls:{spotify:string};
  id:string;
  href:string
}

export interface soundCloudPlaylist{
  id:number;
  created_at:string;
  duration:number;
  track_count:number;
  streamable:boolean;
  user:soundcloudArtist;
  reposts_count:number;
  tracks_uri:string;
  artwork_url:string;
  title:string;
}
