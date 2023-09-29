//React
import React from 'react';
import { useEffect, useState } from 'react';

//SoundManager
import { SoundManager } from '../../Music/Logic/SoundManager';

//Components
export default function MediaPlayer(){
    const [ trackName , updateTrackName ] = useState(); 
    const [ isMuted, setMuted] = useState(false);
    const [ isPlaying, setIsPlaying] = useState(false);
    const [ volumeSlider, setVolumeSlider] = useState(0.5);

    useEffect(() => {
            updateTrackName(SoundManager.currentTrackName);
    }, 0);

    return(
        <div className='mediaPlayer'>
            <h1>{trackName}</h1>
            
            {(isPlaying ?  
                    <button onClick={() => {
                        SoundManager.Stop();
                        setIsPlaying(false);
                    }}>Stop</button>
                :             
                    <button onClick={() => {
                        SoundManager.Play();
                        setIsPlaying(true);
                    }}>Play</button>
            )}


            <div className='volumeControls'> 
                <div className='sliderContainer'>
                    
                    <input type='range' min={0} max={1} defaultValue={0.5} step={0.05} value={volumeSlider}
                        className='slider' id='volumeSlider' 
                        onChange={(event) =>{
                        let value = event.target.value;
                        
                        if(value == 0){
                            console.log('Muted');
                            setMuted(true);
                        }

                        SoundManager.SetVolume(value);
                    }} />

            {(isMuted ? 
                    <button className='mute' id='unMute' onClick={() => {
                        SoundManager.UnMute();
                        setMuted(false);
                        
                        if(SoundManager.lastVolume === 0){
                            setVolumeSlider(SoundManager.defaultVolume);
                        } else {
                            setVolumeSlider(SoundManager.lastVolume);
                        }

                        setVolumeSlider(SoundManager.lastVolume)
                        }}> unMute </button>  
                :
                        <button className='mute' id='mute' onClick={() => {
                            SoundManager.Mute();
                            setMuted(true);
                            setVolumeSlider(0);
                        }}> Mute</button>
            )}

                </div>
            </div>

        </div>
    )
};
