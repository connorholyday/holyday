import React, { useRef, useMemo } from 'react'
import { TransitionState } from 'gatsby-plugin-transition-link'
import { animated, useSpring } from 'react-spring'
import { Canvas, useFrame, useRender } from 'react-three-fiber'
import * as THREE from 'three'
import { OrbitControls } from 'drei'
import { fragmentShader, vertexShader } from '../../shaders/noise-waves'
import Layout from '../../components/Layout'
import { TRANSITION_DELAY_IN_MS } from '../../components/constants'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

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
        args={[1, 1, 100, 100]}
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

function Main({ transition }) {
  const prefersReducedMotion = usePrefersReducedMotion();
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
    <animated.div style={{
      gridColumn: '1/13',
      opacity,
    }}>
      <Sketch />
    </animated.div>
  )
}

class NoiseWavesPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} inverse>
        <TransitionState>
          {({ transitionStatus }) => (
            <Main transition={transitionStatus} />
          )}
        </TransitionState>
      </Layout>
    )
  }
}

export default NoiseWavesPage
