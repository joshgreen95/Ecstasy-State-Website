import './App.css';

//React
import React from 'react';

//Components
import ThreeScene from './Three/ThreeScene.js';
import MediaPlayerContainer from './React/Components/MediaPlayerContainer.jsx';
import ContentContainer from './React/Components/ContentContainer.jsx';

function App() {
  return (
    <>
      <div className = 'contentBackground'>
        <ContentContainer />
        
        <MediaPlayerContainer  />
      </div>

      <>
        <ThreeScene />
      </>
    </>
  );
}

export default App;
