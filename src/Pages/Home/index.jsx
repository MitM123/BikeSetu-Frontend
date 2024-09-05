import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Footer from '../../Components/UserLayout/Footer';

// Import your FBX file as a URL
import BlueScooterUrl from "../../assets/model/Blue_Electric_Scooter_0905084118.fbx?url";

function Model({ url }) {
  const fbx = useLoader(FBXLoader, url);
  const { scene } = useThree();

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;

        // Ensure the material is using standard material
        if (!(child.material instanceof THREE.MeshStandardMaterial)) {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material.color,
            map: child.material.map,
            normalMap: child.material.normalMap,
            metalness: 0.5,
            roughness: 0.5,
          });
        }

        // If there's no texture, set a default color
        if (!child.material.map) {
          child.material.color.setHex(0x3399ff); // Set to blue color
        }
      }
    });

    // Center the model
    const box = new THREE.Box3().setFromObject(fbx);
    const center = box.getCenter(new THREE.Vector3());
    fbx.position.sub(center);

    // Scale down the model
    fbx.scale.set(0.005, 0.005, 0.005); // Adjust these values to get the desired size

    scene.add(fbx);
  }, [fbx, scene]);

  return null;
}

function Scene() {
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
        <Model url={BlueScooterUrl} />
        <Environment preset="city"/>
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
    </>
  );
}

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Home;  