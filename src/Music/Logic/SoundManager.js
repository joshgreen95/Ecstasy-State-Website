//core
import * as THREE from 'three';

//Music
import track1 from '../Transfixion.mp3';
import track2 from '../Anemoia.mp3';
import track3 from '../Portamento.mp3';

class SoundManager{
    constructor(scene){
        this.scene = scene;
        this.listener = new THREE.AudioListener();
        this.music = new THREE.PositionalAudio(this.listener);
        this.audioLoader = new THREE.AudioLoader();

        this.audioAnalyzer = new THREE.AudioAnalyser(this.music);
        
        this.tracklist = [ track1, track2, track3 ];
        this.currentlyPlaying = null;
    }

    PlayTrack(trackID){
        this.music.stop();

        this.audioLoader.load(this.tracklist[trackID], (buffer) => {
            this.music.setBuffer(buffer);
        });

        this.currentlyPlaying = trackID;
        this.Play();
    }

    Skip(){
        console.log(`Current Track ID: ${this.tracklist[this.currentlyPlaying]}`);
        
        if(this.currentlyPlaying === null || this.currentlyPlaying >= this.tracklist.length){
            this.PlayTrack(0);
        } 
        else {
            this.PlayTrack(this.currentlyPlaying + 1);
        }
    }

    Play(){
        this.music.play();
    }

    Pause(){
        this.music.pause();
    }
    
    Stop(){
        this.music.stop();
        this.currentlyPlaying = null;
    }

    GetAudioFrequency(){
        return this.audioAnalyzer.getAverageFrequency();
    }

}

export { SoundManager };