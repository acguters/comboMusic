import { spotifyImage } from './support';
import { spotifyUser } from './spotifyUser';

export interface spotifyPlaylist{
  collaborative:boolean;
  external_urls:{spotify:string};
  id:string;
  images:spotifyImage[];
  name:string;
  owner:spotifyUser;
  public:boolean;
  snapshot_id:string;
  tracks:{href:string;total:number};
  uri:string;
}
