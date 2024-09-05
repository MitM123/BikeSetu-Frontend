import React, { useRef, useEffect, Suspense } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function Model({ url }) {
    const fbx = useLoader(FBXLoader, url);
    const { scene } = useThree();

    useEffect(() => {
        fbx.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                if (!(child.material instanceof THREE.MeshStandardMaterial)) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: child.material.color,
                        map: child.material.map,
                        normalMap: child.material.normalMap,
                        metalness: 0.5,
                        roughness: 0.5,
                    });
                }

                if (!child.material.map) {
                    child.material.color.setHex(0x3399ff);
                }
            }
        });

        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        fbx.position.sub(center);
        fbx.scale.set(0.010, 0.010, 0.010);

        scene.add(fbx);

        return () => {
            scene.remove(fbx);
        };
    }, [fbx, scene]);

    return null;
}

function ModelScene({ url }) {
    const lightRef = useRef();

    useFrame(({ clock }) => {
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(clock.getElapsedTime()) * 3;
            lightRef.current.position.z = Math.cos(clock.getElapsedTime()) * 3;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight ref={lightRef} intensity={1} color="white" />
            <Suspense fallback={null}>
                <Model url={url} />
                <Environment preset="city" />
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
        </>
    );
}

export default ModelScene;
