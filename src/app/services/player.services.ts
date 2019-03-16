import { defaultSpotifyTrack , defaultSoundCloudTrack} from './../../data/supportDB';
import { soundCloudTrack } from './../model/trackResults';
import { Injectable } from "@angular/core";
import { spotifyTrack } from '../model/trackResults';
import { BehaviorSubject } from 'rxjs';


// import { defaultSpotifyTrack}


@Injectable()
export class playerService{
  private spotifyTrack:BehaviorSubject<spotifyTrack>=new BehaviorSubject(defaultSpotifyTrack);
  private soundCloudTrack:BehaviorSubject<soundCloudTrack>=new BehaviorSubject(defaultSoundCloudTrack);
  private service:BehaviorSubject<string>=new BehaviorSubject('');
  private duration:BehaviorSubject<number>=new BehaviorSubject(0);
  private newsong:BehaviorSubject<boolean>=new BehaviorSubject(false);
  private spotifyTracks:BehaviorSubject<Array<spotifyTrack>>=new BehaviorSubject([]);
  private scTracks:BehaviorSubject<Array<soundCloudTrack>>=new BehaviorSubject([]);
  private index:BehaviorSubject<number>=new BehaviorSubject(0);
  currentSpotifyTrack = this.spotifyTrack.asObservable();
  currentSCTrack = this.soundCloudTrack.asObservable();
  currentService = this.service.asObservable();
  currentDuration = this.duration.asObservable();
  newSong = this.newsong.asObservable();
  currentSpotifyTracks = this.spotifyTracks.asObservable();
  currentscTracks = this.scTracks.asObservable();
  currentIndex = this.index.asObservable();

  constructor(){}

  playSpotifyTrack(track:spotifyTrack, index:number){
    this.spotifyTrack.next(track);
    this.duration.next(track.duration_ms/1000);
    this.newsong.next(true);
    this.index.next(index);
    // this.spotifyTrack.name;
    this.service.next('spotify');
  }

  playSoundCloudTrack(SCtrack:soundCloudTrack,index:number){
    this.soundCloudTrack.next(SCtrack);
    console.log('current sctrack: ' + SCtrack.artwork_url);
    this.duration.next(SCtrack.duration/1000);
    this.newsong.next(true);
    this.service.next('soundCloud');
    this.index.next(index);
  }

  updateSong(){
    this.newsong.next(false);
  }

  updateSpotifyTracks(tracks:spotifyTrack[]){
      this.spotifyTracks.next(tracks);
  }

  updatescTracks(tracks:soundCloudTrack[]){
    this.scTracks.next(tracks);
  }

  updateIndex(newIndex:number){
    this.index.next(newIndex);
  }

}
