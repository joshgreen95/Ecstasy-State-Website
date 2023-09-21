import * as THREE from 'three';

function GeneratePointsMesh(quantity, scale){
    const vertices = [];

    for (let i = 0; i <= quantity; i++){
         const x = i % 2 === 0 ? -i * scale : i * scale;
         
         for(let j = 0; j <= quantity; j++){
            const y = j % 2 === 0 ? -j * scale : j * scale;
            
            for(let k = 0; k <= quantity; k++){
                const z = k % 2 === 0 ? -k * scale : k * scale;
                vertices.push(x, y, z);
            }
        }
    };

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xffffff});
    material.size = scale;

    const points = new THREE.Points(geometry, material);

    return points;
}

function UpdatePoints(points, time){
    const geometryArray = points.geometry.attributes.position.array;
    
    for(let i = 0; i < geometryArray.length; i++){
        geometryArray[i] *= 1.11;
        console.log(geometryArray[i]);
    }
}

export { GeneratePointsMesh, UpdatePoints };