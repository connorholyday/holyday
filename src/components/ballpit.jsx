import * as THREE from "three"
import React from 'react'
import { useControls } from 'leva'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import { Environment } from "@react-three/drei"
import { 
  EffectComposer,
  N8AO,
  // SSAO,
  // SMAA
} from '@react-three/postprocessing'

// import cursor from '../assets/cursor.png';
import adamsbridgeHdr from "../assets/adamsbridge.hdr?url"

function Cursor() {
  return window.innerWidth > 760 ? <Mouse /> : null;
}

// A physical sphere tied to mouse coordinates without visual representation
function Mouse() {
  const [, api] = useSphere(() => ({
    type: 'Kinematic',
    args: [6],
  }))
  return useFrame(state =>
    api.position.set(
      (state.pointer.x * state.viewport.width) / 2,
      (state.pointer.y * state.viewport.height) / 2,
      7
    )
  )
}

// A physical plane without visual representation
function Plane({ ...props }) {
  const [ref] = usePlane(() => ({ ...props, type: 'Static' }), React.useRef(null))
  return <mesh ref={ref} />
}

function BottomPlane() {
  const [, api] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], type: 'Static' }), React.useRef(null))
  return useFrame(({ viewport }) => {
    api.position.set(0, -viewport.height / 2, 0)
  });
}

// Creates a crate that catches the objects
function Borders() {
  const viewport = useThree((state) => state.viewport)
  return (
    <>
      <BottomPlane />
      {/* <LeftPlane /> */}
      <Plane
        position={[-viewport.width / 2 - 1, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        position={[viewport.width / 2 + 1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

const rfs = THREE.MathUtils.randFloatSpread;
// const ballColors = [
//   '#FBE798',
//   '#FBE798',
//   '#FBE798',
//   '#FBE798',
//   '#72eaff',
//   '#afe44d',
//   '#fd8089',
//   '#ffc3f1',
//   '#a2c3fc',
// ]
const ballColors = [
  '#FBE798',
  '#FBE798',
  '#FBE798',
  '#FBE798',
  '#72eaff',
  '#bfe479',
  '#ffa7ac',
  '#ffc3f1',
  '#a2c3fc',
]

// Things falling down ...
// const numberOfObjects = 300;
function InstancedObjects() {
  const { size, viewport } = useThree((state) => ({ size: state.size, viewport: state.viewport }))
  const numberOfObjects = React.useMemo(() => Math.min(300, Math.floor(size.width / 4)), [])
  const [ref] = useSphere(() => ({
    mass: 1,
    args: [1],
    position: viewport.width > 760
      ? [rfs(viewport.width), rfs(10) + (viewport.height * 1.5), 0]
      : [rfs(30), rfs(10) + 20, 0]
  }))
  const colors = React.useMemo(() => {
    const array = new Float32Array(numberOfObjects * 3)
    const color = new THREE.Color()
    for (let i = 0; i < numberOfObjects; i++)
      color
        .set(ballColors[Math.floor(Math.random() * ballColors.length)])
        .convertSRGBToLinear()
        .toArray(array, i * 3)
    return array
  }, [numberOfObjects])
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[undefined, undefined, numberOfObjects]}
    >
        <sphereGeometry args={[1, 32, 32]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </sphereGeometry>
        {/* <meshStandardMaterial vertexColors roughness={0.4} /> */}
        <meshPhongMaterial vertexColors shininess={300} />
    </instancedMesh>
  )
}

function Lights() {
  // const { position, angle, intensity, position2, intensity2 } = useControls({
  //   position:
  //   {
  //     value: { x: 10, y: 10 },
  //     step: 1.0
  //   },
  //   angle: { value: 0.3, step: 0.1 },
  //   intensity: { value: 3, step: 0.5 },
  //   position2: { 
  //     value: { x: -10, y: -30, z: 10 },
  //     step: 1.0
  //   },
  //   intensity2: { value: 3, step: 0.5 },
  // })
  return (
    <>
      <ambientLight intensity={2.0} />
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
        color="white"
      />
      <directionalLight
        position={[-10, -30, 10]}
        intensity={3}
        color="white"
      />
      {/* <directionalLight
        position={[position.x, position.y, 0]}
        angle={angle}
        intensity={intensity}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="white"
      />
      <directionalLight
        position={[position2.x, position2.y, position2.z]}
        intensity={intensity2}
        color="white"
      /> */}
    </>
  )
}

function BG() {
  // #9594ff
  // #ad94ff
  // #d69eff
  // #ff9494
  const { bg } = useControls({ bg: { value: '#d69eff' } })
  return (
    <color attach="background" args={[bg]} />
  )
}

function Sketch() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif',
      // cursor: `url('${cursor.src}') 39 39, auto`,
    }}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap, enabled: true }}
        camera={{ position: [0, 3.5, 20], fov: 50, near: 17, far: 40 }}
        dpr={[1, 1.5]}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.5
          state.gl.shadowMap.type = THREE.PCFShadowMap
        }}
      >
        {/* <BG /> */}
        <Lights />
        <Physics
          gravity={[0, -50, 0]}
          defaultContactMaterial={{ restitution: 0.5 }}
        >
          <group position={[0, 0, -10]}>
            <Cursor />
            <Borders />
            <InstancedObjects />
          </group>
        </Physics>
        <Environment files={adamsbridgeHdr} />
        {/* <EffectComposer multisampling={8}>
          <N8AO halfRes color="white" aoRadius={2} intensity={5} aoSamples={6} />
        </EffectComposer> */}
        <EffectComposer disableNormalPass>
          <N8AO color="white" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

class Ballpit extends React.Component {
  render() {
    return (
      <Sketch />
    )
  }
}

export default Ballpit
