//React
import React from 'react';
import { useEffect, useState } from 'react';

//SoundManager
import { SoundManager } from '../../Music/Logic/SoundManager';

//Components
export default function MediaPlayer(){
    const [ trackName , updateTrackName ] = useState(); 
    const [ isMuted, setMuted] = useState(false);

    useEffect(() => {
        updateTrackName(SoundManager.currentTrackName);
    });

    return(
        <div className='mediaPlayer'>
            <h1>{trackName}</h1>
            
            <button onClick={() => {
                SoundManager.Play();
            }}>Play</button>

            {(isMuted ? 
                        <button className='mute' id='unMute' onClick={() => {
                            SoundManager.UnMute();
                            setMuted(false);
                        }}> unMute </button>  
                    :
                        <button className='mute' id='mute' onClick={() => {
                            SoundManager.Mute();
                            setMuted(true);
                        }}> Mute</button>
            )}
        </div>
    )
};
