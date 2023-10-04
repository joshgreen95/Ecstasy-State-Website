//React
import React from 'react';
import { useEffect, useState } from 'react';

//SoundManager
import { SoundManager } from '../../Music/Logic/SoundManager';

//Components
export default function MediaPlayer(){
    const [ isMuted, setMuted] = useState(false);
    const [ isPlaying, setIsPlaying] = useState(false);
    const [ volumeSlider, setVolumeSlider] = useState(0.5);

    useEffect(() => {
        SoundManager.Initialize(setIsPlaying);
    }, )

    return(
        <div className='mediaPlayer'>
            <h1 id='trackTitle'></h1>
            
            <button onClick={() => {
                SoundManager.Back();
            }}>Back</button>

            {(isPlaying ?  
                    <button onClick={() => {
                    SoundManager.Pause();
                    }}>Pause</button>
                :             
                    <button onClick={() => {
                    SoundManager.Play();
                    }}>Play</button>
            )}

            <button onClick={() => {
                SoundManager.Stop();
            }}>Stop</button>


            <button onClick={() => {
                SoundManager.Skip();
            }}>Skip</button>


            <div className='volumeControls'> 
                <div className='sliderContainer'>
                    
                    <input type='range' min={0} max={1} step={0.05} value={volumeSlider}
                        className='slider' id='volumeSlider' 
                        onChange={(event) =>{
                        let volume = event.target.value;
                        
                        if(volume == 0){
                            console.log('Muted');
                            setMuted(true);
                        } else {
                            setMuted(false);
                        }

                        setVolumeSlider(volume);
                        SoundManager.SetVolume(volume);
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
