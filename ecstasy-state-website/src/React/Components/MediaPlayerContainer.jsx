import React from 'react';
import { useState } from 'react';
import MediaPlayer from './MediaPlayer.jsx';

export default function MediaPlayerContainer() {
    const [isShowing, setIsShowing] = useState(false);
  
    return (
    <div className={'mediaPlayerContainer'}>
        {
            isShowing? 
                <>
                    <MediaPlayer /> 
                </>
            :
            <>
                  <button onClick={() => {
                            setIsShowing(true);
                  }}>Show Media Player</button>
                  
                  <div className='mediaPlayerPlaceholder'></div>
            </>
        }
    </div>
  )
}
