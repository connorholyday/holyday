import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function Macaron() {
  const { nodes, materials } = useLoader(GLTFLoader, '/scene.gltf')
  return (
    <mesh castShadow receiveShadow>
      <group scale={[0.03, 0.03, 0.03]} dispose={null}>
        <mesh args={[nodes.mesh_0.geometry, materials.Rose]} />
        <mesh args={[nodes.mesh_1.geometry, materials.Rose]} />
        <mesh args={[nodes.mesh_2.geometry, materials.Liquid_rose]} />
        <mesh args={[nodes.mesh_3.geometry, materials.Rose]} />
        <mesh args={[nodes.mesh_4.geometry, materials.Rose]} />
      </group>
    </mesh>
  )
}

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/swirls.gltf')

  // const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  // useEffect(() => {
  //   // actions.current = {
  //     mixer.clipAction(animations[0], group.current).play()
  //   // }
  //   return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  // }, [])
  return (
    <group ref={group} {...props} dispose={null}
    position={[0, -1000, -2000]}>
      <primitive object={nodes.Camera_RIG} />
      <mesh
        material={materials['Enda glow?']}
        geometry={nodes.Tube.geometry}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
    </group>
  )
}
