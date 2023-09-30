import React, { useRef } from 'react';
import styled from 'styled-components';
import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface SpaceLogoProps {
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const SpaceLogo = ({
  ...props
}: SpaceLogoProps) => {
  const spheres = [];
  for(let z=-100; z < 100; z+=1) {
    const x = Math.random() * 200 - 100;
		const y = Math.random() * 200 - 100;
    spheres.push(<Sphere x={x} y={y} z={z}/>)
  }
  return (
    <Wrapper
      {...props}
    >
      <Canvas shadows camera={{ position: [0, 0, 100.5], fov: 50 }}>
        {spheres}
        <Sphere x={0} y={0} z={0}/>
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
        <color attach="background" args={[0,0,0]} />
      </Canvas>
    </Wrapper>
  );
};

interface SphereProps {
  x:number,
  y:number,
  z:number
}

function Sphere({x,y,z,...props}:SphereProps) {
  const ref = useRef<Mesh>(null!)

  useFrame(() => {
    // This function runs at the native refresh rate inside of a shared render-loop
    ref.current.position.z +=  1;

    if(ref.current.position.z > 100) ref.current.position.z-=200; 
  })

  return (
    <mesh visible position={[x, y, z]} {...props} ref={ref}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="white" emissive={"white"} emissiveIntensity={2}/>
    </mesh>
  )
}

function Env() {
  return <Environment preset='sunset' background blur={1} />
}