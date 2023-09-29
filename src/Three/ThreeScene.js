//Core
import React from 'react';
import * as THREE from 'three';
//React
import { useEffect } from 'react';

//THREE
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//Logic
import { PageManager } from '../React/logic/PageManager.js';
import { SoundManager } from '../Music/Logic/SoundManager.js';
import { GeneratePointsMesh, UpdatePoints } from './logic/GeneratePointsMesh.js';

//Textures
import particleAlphaMap from './Textures/Particles/1.png';

export default function ThreeScene() {
    useEffect(() => {
/***
 *  Renderer
 */
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
/**
 *  Canvas
 */
        const canvas = document.getElementById('renderContainer');
        canvas.appendChild(renderer.domElement);

        const sizes = {
            width : window.innerWidth,
            height : window.innerHeight
        };

/**
 *  Scene   
 */
        const scene = new THREE.Scene();
        scene.background = PageManager.backgroundColor;
        const clock = new THREE.Clock();

/**
 * Textures
 */
        const textureLoader = new THREE.TextureLoader();
        
/**
 * Camera
 */
        const cameraFOV = 75;
        const camera = new THREE.PerspectiveCamera(cameraFOV, sizes.width / sizes.height, 0.1, 1000);
        camera.position.z = -5;
        scene.add(camera);

/**
 *  Sound
 */
        SoundManager.Initialize();
        let audioFrequency = null;
/**
 * Debug Controls
 */
        const controls = new OrbitControls(camera, renderer.domElement);

/**
 *  Points
 */
        const points = GeneratePointsMesh(150, 0.02, 0.1);
        
        textureLoader.load(particleAlphaMap, ((texture) => {
            points.material.map = texture;
            scene.add(points);
        }))
/**
 *  Listeners
 */
        function Resize(){
            //update sizes
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));    
        }

        window.addEventListener('resize', Resize);
        

/**
 *  Loop
 */
        function Tick() {
            requestAnimationFrame(Tick);
            
            audioFrequency = SoundManager.GetAudioFrequency();
            
            if(points !== null && points.geometry !== null){
                UpdatePoints(points, clock.getElapsedTime(), audioFrequency, 0.05, 0.5);
            }

            controls.update();

            renderer.render(scene, camera);
        }
        Tick(); 
    });

    return (
        <>
            <div id='renderContainer' />
        </>
  )
}
