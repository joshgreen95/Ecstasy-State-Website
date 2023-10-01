//core
import * as THREE from 'three';

//Music
import track1 from '../Qure - Gaia (Original Mix).wav';
import track2 from '../Qure - Python (Original Mix).wav';
import track3 from '../Qure - Uranus (Original Mix).wav';

const SoundManager = {
    listener: null,
    music: null,
    audioLoader: null,
    
    audioAnalyzer: null,

    tracklist: [ track1, track2, track3 ],
    currentlyPlayingID: null,
    isLoading: true,
    
    reactSetIsPlaying: null,

    lastVolume: null,
    defaultVolume: 0.5,

    Initialize(){  
        this.listener = new THREE.AudioListener();
        
        this.music = new THREE.Audio(this.listener);
        this.music.setVolume(this.defaultVolume);

        this.audioLoader = new THREE.AudioLoader();
        this.audioAnalyzer = new THREE.AudioAnalyser(this.music);

        this.currentTrackName = this.tracklist[this.currentlyPlayingID ? this.currentlyPlayingID : 0];

        this.isLoading = false;
        console.log(`IsLoading: ${this.isLoading}`);
    },

    PlayTrack(trackID){
        this.music.stop();
        this.currentlyPlayingID = trackID;
        
        this.audioLoader.load(this.tracklist[trackID], (buffer) => {
            this.isLoading = false;
            this.reactSetIsPlaying(true);
            
            this.music.setBuffer(buffer);
            this.Play();
        });
    },

    Skip(setIsPlaying){
        if (!this.reactSetIsPlaying) {
            this.reactSetIsPlaying = setIsPlaying;
        }
        
        if (this.isLoading) {
            console.log('Currently Loading --- Cancelling Action')
            return;
        }

        this.isLoading = true;
        const nextSongID = this.currentlyPlayingID + 1;

        if (this.currentlyPlayingID === null || nextSongID >= this.tracklist.length){
            this.PlayTrack(0);
            
        } 
        else {
            this.PlayTrack(nextSongID);
        }
    },

    Play(setIsPlaying){
        if(!this.reactSetIsPlaying){
            this.reactSetIsPlaying = setIsPlaying;
        }

        if (this.isLoading) { 
            console.log('Currently Loading --- Cancelling Action')
            return; 
        }

        if(this.currentlyPlayingID === null){
            console.log('no track loaded');
            this.isLoading = true;
            this.PlayTrack(0);
        } else {
            console.log('Skipping load track');
            this.music.play();
            this.reactSetIsPlaying(true);
            this.isLoading = false;
        }
    },

    Pause(){
        this.music.pause();
        this.reactSetIsPlaying(false);
    },
    
    Stop(setIsPlaying){
        if (!this.reactSetIsPlaying) {
            this.reactSetIsPlaying = setIsPlaying;
        }
        
        this.music.stop();
        this.currentlyPlayingID = null;
        this.reactSetIsPlaying(false);
    },

    Mute(){ 
        this.lastVolume = this.music.getVolume();

        if(this.lastVolume === 0){
            this.lastVolume = this.defaultVolume;
        } 
        
        this.music.setVolume(0);
        
        console.log(`LastVolume : ${this.lastVolume}, Current Volume: ${this.music.getVolume()}`);
    },

    UnMute(){
        this.music.setVolume(this.lastVolume);

        console.log(`LastVolume : ${this.lastVolume}, Current Volume: ${this.music.getVolume()}`);
    },

    GetAudioFrequency(){
        return this.audioAnalyzer.getAverageFrequency();
    },

    SetVolume(volume){
        console.log(volume);
        this.music.setVolume(volume);
    },

    Back(){
        console.log(this.music);
    }
    
}

export { SoundManager };