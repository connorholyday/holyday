import * as THREE from 'three'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useLoader, useFrame, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

function useEquirectangolarEnv(url) {
  const env = useLoader(RGBELoader, url)
  const { gl } = useThree()
  const envCube = useMemo(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl)
    pmremGenerator.compileEquirectangularShader()

    const envMap = pmremGenerator.fromEquirectangular(env).texture
    pmremGenerator.dispose()

    return envMap
  }, [env, gl])

  return envCube
}

export default function Model({ video, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    '/swirls2.gltf'
  )
  const envMap = useEquirectangolarEnv('/venice_sunset_1k.hdr')

  // const actions = useRef()
  // const [mixer] = useState(() => new THREE.AnimationMixer())
  // useFrame((state, delta) => mixer.update(delta))
  // useEffect(() => {
  //   // actions.current = {
  //   //   animation_0: mixer.clipAction(animations[0], group.current),
  //   // }
  //   mixer.clipAction(animations[0], group.current).play();
  //   return () => animations.forEach(clip => mixer.uncacheClip(clip))
  // }, [])
  const { setDefaultCamera } = useThree()
  React.useEffect(() => {
    setDefaultCamera(nodes.Camera_RIG)
  }, [nodes.Camera_RIG])
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Camera_RIG} />
      <mesh
        geometry={nodes.Tube.geometry}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        position={[-2.42, 2.76, -0.41]}
      >
        <meshStandardMaterial
          {...materials.Litur}
          envMap={envMap}
          attach="material"
        >
          <videoTexture attach="map" args={[video.current]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}
