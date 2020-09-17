import React from 'react'
import { TransitionState } from 'gatsby-plugin-transition-link'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { Physics, usePlane, useSphere } from 'use-cannon'
import { EffectComposer, SSAO } from 'react-postprocessing'
import { animated, useSpring } from 'react-spring'
import Layout from '../../components/Layout'
import { TRANSITION_DELAY_IN_MS } from '../../components/constants'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import cursor from './assets/cursor.png';

// A physical sphere tied to mouse coordinates without visual representation
function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: 'Kinematic', args: 6 }))
  return useFrame(state =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      7
    )
  )
}

// A physical plane without visual representation
function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }))
  return null
}

// Creates a crate that catches the objects
function Borders() {
  const { viewport } = useThree()
  return (
    <>
      <Plane
        position={[0, -viewport.height / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
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

// Things falling down ...
function InstancedObjects({ count = 200 }) {
  const { viewport } = useThree()
  const [ref] = useSphere(index => ({
    mass: 100,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: 1,
  }))
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
    >
      <sphereBufferGeometry args={[1, 16, 16]} />
      <meshPhongMaterial color="#ff8800" shininess={150} />
    </instancedMesh>
  )
}

function Effects() {
  const AO = { samples: 3, luminanceInfluence: 0.6, radius: 2, intensity: 5 }
  const multisampling = WEBGL.isWebGL2Available() === false ? 0 : 8
  return (
    <EffectComposer multisampling={multisampling}>
      <SSAO
        {...AO}
        samples={21}
        radius={7}
        intensity={20}
        luminanceInfluence={0.6}
        color="#ff8800"
      />
      <SSAO {...AO} />
    </EffectComposer>
  )
}

function Sketch() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      background: 'powderblue',
      fontFamily: '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif',
      cursor: `url('${cursor}') 39 39, auto`,
    }}>
      <Canvas
        shadowMap
        gl={{
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
          alpha: false,
          antialias: false,
        }}
        camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
      >
        <color attach="background" args={['powderblue']} />
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
        <directionalLight
          position={[-10, -10, -5]}
          intensity={1}
          color="white"
        />
        <Physics
          gravity={[0, -50, 0]}
          defaultContactMaterial={{ restitution: 0.5 }}
        >
          <group position={[0, 0, -10]}>
            <Mouse />
            <Borders />
            <InstancedObjects />
          </group>
        </Physics>
        <Effects />
      </Canvas>
      <div style={{
        position: 'absolute',
        top: '50%',
        width: '100%',
        transform: 'translate3d(0, -50%, 0)',
        textAlign: 'center',
        color: '#374962',
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          lineHeight: '1.5',
          margin: '0 0 15px',
        }}>Wheeee!</h2>
      </div>
    </div>
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

class BallpitPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <TransitionState>
          {({ transitionStatus }) => <Main transition={transitionStatus} />}
        </TransitionState>
      </Layout>
    )
  }
}

export default BallpitPage
