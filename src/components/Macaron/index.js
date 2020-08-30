import * as THREE from 'three'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { useRef, useMemo } from 'react'
import { TransitionState } from 'gatsby-plugin-transition-link'
import clamp from 'lodash.clamp'
import { animated, useSpring } from 'react-spring'
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber'
import { Physics, useBox, useCompoundBody } from 'use-cannon'
import { EffectComposer, SSAO, Bloom } from 'react-postprocessing'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import Layout from '../Layout'
import { TRANSITION_DELAY_IN_MS } from '../constants'

function Borders() {
  const { aspect, viewport } = useThree()
  const { width, height } = useMemo(
    () =>
      aspect > 1
        ? {
            width: 1,
            height: 1 / aspect,
          }
        : {
            width: aspect,
            height: 1,
          },

    [aspect]
  )
  const rotation = useRef()
  React.useEffect(() => {
    rotation.current = new DeviceOrientationControls(
      new THREE.PerspectiveCamera()
    )
  }, [])
  const [_, api] = useCompoundBody(() => ({
    shapes: [
      { type: 'Plane', position: [0, -viewport.height / 2 + 4, 0], rotation: [-Math.PI / 2, 0, 0] },
      { type: 'Plane', position: [0, viewport.height / 2, 0], rotation: [Math.PI / 2, 0, 0] },
      { type: 'Plane', position: [-viewport.height / 2, 0, 0], rotation: [0, Math.PI / 2, 0] },
      { type: 'Plane', position: [viewport.height / 2, 0, 0], rotation: [0, -Math.PI / 2, 0] },
      { type: 'Plane', position: [0, 0, 0], rotation: [0, 0, 0] },
      { type: 'Plane', position: [0, 0, 12], rotation: [0, -Math.PI, 0] },
    ],
  }))

  useFrame(state => {
    if (!rotation.current) {
      api.rotation.set(-state.mouse.y, state.mouse.x, 0)
      return
    }

    rotation.current.update()

    if (!rotation.current.deviceOrientation) {
      api.rotation.set(-state.mouse.y, state.mouse.x, 0)
      return
    }

    const { alpha, beta, gamma } = rotation.current.deviceOrientation

    if (!beta || !gamma) {
      api.rotation.set(-state.mouse.y, state.mouse.x, 0)
      return
    }

    const x = clamp(beta, 0, 180)
    const y = clamp(alpha, -90, 90)
    const z = clamp(gamma, -90, 90)

    api.rotation.set(-(1 - x / 90), -(1 - (y + 90) / 90), 1 - (z + 90) / 90)
  })
  return null
}

function Macaron() {
  const { nodes, materials } = useLoader(GLTFLoader, '/scene.gltf')
  const { viewport } = useThree()
  const [ref] = useBox(index => ({
    mass: 75,
    position: [0, 0, 0, 0],
    args: [2, 2, 1.5],
  }))
  const colour = Math.random() >= 0.66 ? 0 : Math.floor(Math.random() * (5 - 0) + 0)
  switch (colour) {
    case 0:
    default:
      return (
        <mesh ref={ref} castShadow receiveShadow>
          <group scale={[0.03, 0.03, 0.03]} dispose={null}>
            <mesh args={[nodes.mesh_0.geometry, materials.Rose]} />
            <mesh args={[nodes.mesh_1.geometry, materials.Rose]} />
            <mesh args={[nodes.mesh_2.geometry, materials.Liquid_rose]} />
            <mesh args={[nodes.mesh_3.geometry, materials.Rose]} />
            <mesh args={[nodes.mesh_4.geometry, materials.Rose]} />
          </group>
        </mesh>
      )
    case 1:
      return (
        <mesh ref={ref} castShadow receiveShadow>
          <group scale={[0.03, 0.03, 0.03]} dispose={null}>
            <mesh args={[nodes.mesh_5.geometry, materials.Orange]} />
            <mesh args={[nodes.mesh_6.geometry, materials.Liquid_orange]} />
            <mesh args={[nodes.mesh_7.geometry, materials.Juice_Grapefruit]} />
            <mesh args={[nodes.mesh_8.geometry, materials.Liquid_orange]} />
            <mesh args={[nodes.mesh_9.geometry, materials.Orange]} />
          </group>
        </mesh>
      )
    case 2:
      return (
        <mesh ref={ref} castShadow receiveShadow>
          <group scale={[0.03, 0.03, 0.03]} dispose={null}>
            <mesh args={[nodes.mesh_10.geometry, materials.Blue]} />
            <mesh args={[nodes.mesh_11.geometry, materials.Blue]} />
            <mesh args={[nodes.mesh_12.geometry, materials.BlueCherry]} />
            <mesh args={[nodes.mesh_13.geometry, materials.Blue]} />
            <mesh args={[nodes.mesh_14.geometry, materials.Blue]} />
          </group>
        </mesh>
      )
    case 3:
      return (
        <mesh ref={ref} castShadow receiveShadow>
          <group scale={[0.03, 0.03, 0.03]} dispose={null}>
            <mesh args={[nodes.mesh_15.geometry, materials.coffee]} />
            <mesh args={[nodes.mesh_16.geometry, materials.Liquid_coffee]} />
            <mesh args={[nodes.mesh_17.geometry, materials.coffee2]} />
            <mesh args={[nodes.mesh_18.geometry, materials.Liquid_coffee]} />
            <mesh args={[nodes.mesh_19.geometry, materials.coffee]} />
          </group>
        </mesh>
      )
    case 4:
      return (
        <mesh ref={ref} castShadow receiveShadow>
          <group scale={[0.03, 0.03, 0.03]} dispose={null}>
            <mesh args={[nodes.mesh_25.geometry, materials.Liquid_Chocolate]} />
            <mesh args={[nodes.mesh_26.geometry, materials['Chocolate-2']]} />
            <mesh args={[nodes.mesh_27.geometry, materials['Corona_14_-_Defa']]} />
            <mesh args={[nodes.mesh_28.geometry, materials['Chocolate-2']]} />
            <mesh args={[nodes.mesh_29.geometry, materials.Liquid_Chocolate]} />
          </group>
        </mesh>
      )
  }
}

function Effects() {
  const AO = { samples: 3, luminanceInfluence: 0.6, radius: 2, intensity: 5 }
  return (
    <EffectComposer>
      <SSAO
        {...AO}
        samples={21}
        radius={7}
        intensity={20}
        luminanceInfluence={0.6}
        color="red"
      />
      <SSAO {...AO} />
      <Bloom
        luminanceThreshold={0.95}
        luminanceSmoothing={0}
        height={300}
        opacity={3}
      />
    </EffectComposer>
  )
}

function Sketch() {
  return (
    <Canvas
      shadowMap
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        transform: 'translateZ(0)',
      }}
      gl={{
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
        alpha: false,
        antialias: false,
      }}
      camera={{ position: [0, 0, 20], fov: 50 }}
    >
      <color attach="background" args={['lightpink']} />
      <ambientLight intensity={1.85} />
      <directionalLight
        position={[10, 10, 0]}
        angle={0.3}
        intensity={3}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <Physics
        gravity={[0, -50, 0]}
        defaultContactMaterial={{ restitution: 0.5 }}
      >
        <group position={[0, 0, 0]}>
          <Borders />
          <React.Suspense fallback={null}>
            {[...new Array(100)].map((_, i) => (
              <Macaron key={i} />
            ))}
          </React.Suspense>
        </group>
      </Physics>
      <Effects />
    </Canvas>
  )
}

function Main({ transition }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [toggle, set] = React.useState(true)
  const { opacity } = useSpring({
    delay: TRANSITION_DELAY_IN_MS + 0.3,
    opacity: toggle ? 1 : 0,
    from: { opacity: 0 },
    immediate: prefersReducedMotion,
  })
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  return (
    <animated.div
      style={{
        gridColumn: '1/13',
        opacity,
      }}
    >
      <Sketch />
    </animated.div>
  )
}

export default Main
