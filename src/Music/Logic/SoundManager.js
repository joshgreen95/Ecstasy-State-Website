//core
import * as THREE from 'three';

//Music
import track1 from '../Transfixion.mp3';
import track2 from '../Anemoia.mp3';
import track3 from '../Portamento.mp3';

const SoundManager = {
    listener: null,
    music: null,
    audioLoader: null,
    
    audioAnalyzer: null,

    tracklist: [ track1, track2, track3 ],
    currentlyPlayingID: null,
    thiscurrentTrackName: null,

    lastVolume: null,
    defaultVolume: 0.5,

    Initialize(){  
        this.listener = new THREE.AudioListener();
        
        this.music = new THREE.Audio(this.listener);
        this.music.setVolume(this.defaultVolume);

        this.audioLoader = new THREE.AudioLoader();
        this.audioAnalyzer = new THREE.AudioAnalyser(this.music);
        this.currentTrackName = this.tracklist[this.currentlyPlayingID ? this.currentlyPlayingID : 0];
    },

    PlayTrack(trackID){
        this.music.stop();

        this.audioLoader.load(this.tracklist[trackID], (buffer) => {
            this.music.setBuffer(buffer);
        });

        this.currentlyPlayingID = trackID;
        this.currentTrackName = this.tracklist[this.currentlyPlayingID].toString();
        
        this.Play();
    },

    Skip(){
        console.log(`Current Track ID: ${this.tracklist[this.currentlyPlayingID]}`);
        
        if(this.currentlyPlayingID === null || this.currentlyPlayingID >= this.tracklist.length - 1){
            this.PlayTrack(0);
        } 
        else {
            this.PlayTrack(this.currentlyPlayingID + 1);
        }
    },

    Play(){
        this.music.play();
    },

    Pause(){
        this.music.pause();
    },
    
    Stop(){
        this.music.stop();
        this.currentlyPlayingID = null;
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
        //this.music.setVolume(volume);
    },
    
}

export { SoundManager };