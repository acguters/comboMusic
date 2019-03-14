export interface artistResult{
  name:string;
  images:artistImage[];
  id:string;
  genres:string[];
  popularity:number;
  type:string;
  uri:string;
  href:string;
  external_urls:string;
}

export interface artistImage{
  height:number;
  url:string;
  width:number;
}

export interface soundcloudArtist{
  username:string;
  avatar_url:string;
  id:number
}
