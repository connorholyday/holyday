import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useRender } from 'react-three-fiber'
import * as THREE from 'three'
import { OrbitControls } from 'drei'
import { fragmentShader, vertexShader } from './shaders'

function Wave() {
  const ref = useRef()
  const uniforms = useMemo(() => ({
    time: { type: 'f', value: 0 },
  }), [])
  useFrame(state => {
    const time = state.clock.getElapsedTime()
    ref.current.material.uniforms.time.value = time
  })
  return (
    <points ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry
        attach="geometry"
        args={[1, 1, window.outerWidth / 17, window.outerWidth / 17]}
      />
      <shaderMaterial
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </points>
  )
}

function Sketch() {
  return (
    <Canvas
      camera={{
        position: [0, 0.7, 2],
        fov: 40,
        near: 0.001,
        far: 1000,
      }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        transform: 'translateZ(0)',
        backgroundColor: '#2100e6',
      }}
    >
      <OrbitControls />
      <Wave />
    </Canvas>
  )
}

export default Sketch
