import * as THREE from 'three';

function GeneratePointsMesh(ammount, scale, seperation){
    const textureLoader = new THREE.TextureLoader();
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
    
    const material = new THREE.PointsMaterial({ color: 0xffffff });
    material.size = scale;
    material.tags = {};
    material.tags.scale = scale;
    material.tags.seperation = seperation;
    material.tags.ammount = ammount;


    const points = new THREE.Points(geometry, material);
    return points;
}

function UpdatePoints(points, time, audioFrequency, amplitudeDampening, phaseDampening){
    const positions = points.geometry.attributes.position.array;

    const amplitude = audioFrequency * amplitudeDampening;
    const phase = time * phaseDampening;

    const ammount = points.material.tags.ammount;

    const halfAmmount = ammount / 2;
    
    let i = 0; 
    for (let ix = 0; ix < ammount; ix++){
        for (let iy = 0; iy < ammount; iy++){
            if(audioFrequency === 0){ continue; }

            let distanceFromCenter = Math.sqrt(Math.pow(ix - halfAmmount, 2) + Math.pow(iy - halfAmmount, 2));

            positions[i + 1] = amplitude * Math.sin(phase * distanceFromCenter) * Math.exp(-amplitudeDampening * distanceFromCenter);
            i += 3;
        }
    }


    points.geometry.attributes.position.needsUpdate = true;
}

export { GeneratePointsMesh, UpdatePoints };