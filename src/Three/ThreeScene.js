//Core
import React from 'react';
import * as THREE from 'three';
//React
import { useState, useEffect } from 'react';
//THREE
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Logic
import { PageManager } from '../React/logic/PageManager.js';
import { GeneratePointsMesh, UpdatePoints } from './logic/GeneratePointsMesh.js';

//Songs
import subway from '../Music/subway.mp3';

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
 * Camera
 */
        const cameraFOV = 90;
        const camera = new THREE.PerspectiveCamera(cameraFOV, sizes.width / sizes.height, 0.1, 1000);
        camera.position.z = -5;
        scene.add(camera);

/**
 *  Sound
 */
        const listener = new THREE.AudioListener();
        const music = new THREE.PositionalAudio(listener);

        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(subway, ((buffer) => {
            music.setBuffer(buffer);
        }));

        const audioAnalyzer = new THREE.AudioAnalyser(music);
        let audioFrequency = null;

/**
 * Debug Controls
 */
        const controls = new OrbitControls(camera, renderer.domElement);

/**
 *  Debug Square
 */
        const points = GeneratePointsMesh(50, 0.1, 1);
        scene.add(points);
        console.log(points);
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

        function leftClick(){
            music.play();
        }

        window.addEventListener('click', leftClick);
        window.addEventListener('resize', Resize);


/**
 *  Loop
 */
        function Tick() {
            requestAnimationFrame(Tick);
            
            audioFrequency = audioAnalyzer.getAverageFrequency();

            UpdatePoints(points, clock.getElapsedTime(), audioFrequency, 100);

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
