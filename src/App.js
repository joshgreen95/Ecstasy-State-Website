import './App.css';

//React
import React from 'react';

//Components
import ThreeScene from './Three/ThreeScene.js';
import MediaPlayer from './React/Components/MediaPlayer.jsx'

function App() {
  return (
    <>
    
      <div className = 'contentBackground'>
        <MediaPlayer />
      </div>

      <>
        <ThreeScene />
      </>
    </>
  );
}

export default App;
