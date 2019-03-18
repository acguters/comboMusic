import { soundCloudPlaylist } from './../app/model/albumResults';
export const searchSelector: any = [
  {
    name:'Tracks',
    isSelected:true
  },
  {
    name:'Artists',
    isSelected:false
  },
  {
    name:'Albums',
    isSelected:false
  },
  {
    name:'Playlists',
    isSelected:false
  }
]

export const defaultSpotifyTrack={
  artists:[{name:'string',
    images:[{height:0,
      url:'string',
      width:0}],
    id:'string',
    genres:[''],
    popularity:0,
    type:'string',
    uri:'string',
    href:'string',
    external_urls:'string'}],
  duration_ms:0,
  external_urls:{spotify:''},
  href:'',
  id:'',
  is_local:false,
  is_playable:true,
  popularity:0,
  preview_url:'',
  name:'',
  uri:'',
  album:{images:[{height:0,
    url:'string',
    width:0}],
    name:'string',
    artists:[{name:'string',
    images:[{height:0,
      url:'string',
      width:0}],
    id:'string',
    genres:[''],
    popularity:0,
    type:'string',
    uri:'string',
    href:'string',
    external_urls:'string'}],
    release_date:'string',
    total_tracks:0,
    uri:'string',
    external_urls:{spotify:'string'},
    id:'string',
    href:'string'},
  explicit:false,
  isPlaying:false
}

export const defaultSoundCloudTrack={
  id: 0,
  title:'',
  permalink_url:'',
  uri: '',
  artwork_url:'',
  description:'',
  reposts_count:0,
  user:{username:'string',
    avatar_url:'string',
    id:0},
  tracks_uri:'',
  duration:0,
  likes_count:0,
  isPlaying:false
}
// export interface soundCloudPlaylist{
//   id:number;
//   created_at:string;
//   duration:number;
//   track_count:number;
//   streamable:boolean;
//   user:soundcloudArtist;
//   reposts_count:number;
//   tracks_uri:string;
//   artwork_url:string;
// }


// export const defaultsoundCloudPlaylist{

// }

// export interface soundcloudArtist{
//   username:string;
//   avatar_url:string;
//   id:number
// }
