import * as THREE from 'three';

function GeneratePointsMesh(ammount, scale, seperation){
    const quantity = ammount * ammount;
    
    let positions = new Float32Array(quantity * 3);
    let scales = new Float32Array(quantity);

    let i = 0; let j = 0;
    for (let ix = 0; ix < ammount; ix++){
        for (let iy = 0; iy < ammount; iy++){
            console.log(((ix * seperation) - ((ammount * seperation) / 2)));
            positions[i] = ((ix * seperation) - ((ammount * seperation) /2));
            positions[i + 1] = 0;
            positions[i + 2] = (iy * seperation) - ((ammount * seperation) /2);

            scales[ j ] = 1
            i += 3;
            j ++;
        } 
    }
    console.log(positions);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.Float32BufferAttribute(scales));
    
    const material = new THREE.PointsMaterial({ color: 0xffffff});
    material.size = scale;

    const points = new THREE.Points(geometry, material);

    return points;
}

function UpdatePoints(points, time, audioFrequency, dampening){
  

    const positions = points.geometry.attributes.position.array;
    const scales = points.geometry.attributes.scale.array;

    const amplitude = audioFrequency * dampening;
    let ammount = Math.sqrt(positions.length);

    let i = 0; 
    for (let ix = 0; ix < ammount; ix++){
        for (let iy = 0; iy < ammount; iy++){
            positions[i + 1] = Math.sin((ix + iy)) * amplitude;
            i += 3;
        }
    }


    points.geometry.attributes.position.needsUpdate = true;
}

export { GeneratePointsMesh, UpdatePoints };