//core
import * as THREE from 'three';

//Logic
import { SoundCache } from './SoundCache.js';

const SoundManager = {
    listener: null,
    music: null,
    audioLoader: null,
    
    audioAnalyzer: null,

    tracklist: null,
    currentlyPlayingID: null,
    isLoading: true,
    
    reactSetIsPlaying: null,
    reactTitleElement: null,

    lastVolume: null,
    defaultVolume: 0.5,

    Initialize(setIsPlaying){  
        if(!this.listener){
            this.listener = new THREE.AudioListener();
        }

        if(!this.music){
            this.music = new THREE.Audio(this.listener);
            this.music.setVolume(this.defaultVolume);
        }

        if(!this.audioLoader){
            this.audioLoader = new THREE.AudioLoader();
        }

        if(!this.audioAnalyzer){
            this.audioAnalyzer = new THREE.AudioAnalyser(this.music);
        }

        this.tracklist = SoundCache;

        this.reactSetIsPlaying = setIsPlaying;
        console.log(this.reactSetIsPlaying);
        this.reactTitleElement = document.getElementById('trackTitle');

        this.isLoading = false;
    },

    PlayTrack(trackID){
        console.log(this.tracklist[trackID].track);
        
        this.music.stop();
        this.currentlyPlayingID = trackID;
        this.reactTitleElement.innerHTML = this.tracklist[trackID].trackName;

        this.audioLoader.load(this.tracklist[trackID].track, (buffer) => {
            this.isLoading = false;
            this.reactSetIsPlaying(true);

            this.music.onEnded(() => {
                this.Skip();
            })
            this.music.setBuffer(buffer);
            this.Play();
        });
    },

    Skip(){
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

    Play(){
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
    
    Stop(){
        if (this.isLoading) {
            console.log('Currently Loading --- Cancelling Action')
            return;
        }

        this.music.stop();
        this.currentlyPlayingID = null;
        this.reactTitleElement.innerHTML = '';
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
        console.log(this.tracklist[0].track);
    },
    
}

export { SoundManager };