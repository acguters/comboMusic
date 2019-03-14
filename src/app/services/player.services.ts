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
  currentSpotifyTrack = this.spotifyTrack.asObservable();
  currentSCTrack = this.soundCloudTrack.asObservable();
  currentService = this.service.asObservable();

  constructor(){}

  playSpotifyTrack(track:spotifyTrack){
    this.spotifyTrack.next(track);
    // this.spotifyTrack.name;
    this.service.next('spotify');
  }

  playSoundCloudTrack(SCtrack:soundCloudTrack){
    this.soundCloudTrack.next(SCtrack);
    console.log('current sctrack: ' + SCtrack.artwork_url);
    this.service.next('soundCloud');
  }

}
