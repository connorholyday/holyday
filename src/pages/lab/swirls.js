import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { TransitionState } from 'gatsby-plugin-transition-link'
import lerp from "lerp";
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { WEBGL } from 'three/examples/jsm/WebGL'
import { Physics, usePlane, useSphere } from 'use-cannon'
import { EffectComposer, SSAO } from 'react-postprocessing'
import { animated, useSpring } from 'react-spring'
import Layout from '../../components/Layout'
import { TRANSITION_DELAY_IN_MS } from '../../components/constants'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

import video from './assets/swirls-video-texture.mp4';

function useEquirectangolarEnv(url) {
  const env = useLoader(RGBELoader, url);
  const { gl } = useThree();
  const envCube = useMemo(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const envMap = pmremGenerator.fromEquirectangular(env).texture;
    pmremGenerator.dispose();

    return envMap;
  }, [env, gl]);

  return envCube;
}

// Transform value from one range to another
const map = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

function Model({ video, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    "https://raw.githubusercontent.com/connorholyday/scroll-swirls/master/public/3d/swirls.gltf"
  );

  // Env Map for reflections
  const envMap = useEquirectangolarEnv("/3d/venice_sunset_1k.hdr");

  // Animation
  const actions = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useEffect(() => {
    actions.current = {
      animation_0: mixer.clipAction(animations[0], group.current)
    };
    actions.current.animation_0.setLoop(THREE.LoopOnce);
    actions.current.animation_0.clampWhenFinished = true;
    actions.current.animation_0.time = 0;
    actions.current.animation_0.play();
    mixer.update(0);
    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, []);

  // Bind scroll to animation
  useEffect(() => {
    const handleScroll = () => {
      if (actions.current) {
        actions.current.animation_0.time = lerp(
          actions.current.animation_0.time,
          map(
            window.scrollY,
            0,
            document.body.getBoundingClientRect().height - window.innerHeight,
            0,
            actions.current.animation_0.getClip().duration
          ),
          0.1
        );
        mixer.update(0);
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Set the Camera
  const camRef = useRef();
  const { setDefaultCamera } = useThree();
  React.useEffect(() => {
    setDefaultCamera(camRef.current);
  }, []);
  useFrame(() => camRef.current.updateMatrixWorld());
  const sharedVideo = React.useMemo(
    () => new THREE.VideoTexture(video.current),
    [video.current]
  );

  return (
    <group ref={group} dispose={null}>
      <scene name="Scene" {...props}>
        <perspectiveCamera
          ref={camRef}
          {...nodes.Camera_NEW}
          onUpdate={(self) => self.updateProjectionMatrix()}
        />
        <mesh
          geometry={nodes.Tube1.geometry}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          position={[-2.42, 2.76, -0.41]}
        >
          <meshStandardMaterial
            {...materials.Litur}
            metalness={0.2}
            envMap={envMap}
            envMapIntensity={0.4}
            attach="material"
            map={sharedVideo}
          />
        </mesh>
        <mesh
          geometry={nodes.Tube.geometry}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          position={[-2.42, 2.76, -0.41]}
        >
          <meshStandardMaterial
            {...materials.Litur}
            metalness={0.2}
            envMap={envMap}
            envMapIntensity={0.4}
            attach="material"
            map={sharedVideo}
          />
        </mesh>
      </scene>
    </group>
  );
}

function Sketch() {
  const ref = useRef();
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      <video
        crossOrigin="anonymous"
        ref={ref}
        src={video}
        muted
        autoPlay
        loop
        playsInline
        onPlay={() => setVideoLoaded(true)}
        style={{
          opacity: 0,
          pointerEvents: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          height: '1px',
          width: '1px',
        }}
      />
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 2019,
          transform: 'translateZ(0)',
          pointerEvents: 'none',
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.6;
        }}
      >
        <ambientLight color="white" intensity={0.7} />
        {videoLoaded && (
          <Suspense fallback={null}>
            <Model video={ref} />
          </Suspense>
        )}
      </Canvas>
    </>
  );
}

function Main({ transition }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [toggle, set] = React.useState(true)
  const [hasMounted, setMounted] = useState(false);
  const { opacity } = useSpring({
    delay: TRANSITION_DELAY_IN_MS + 0.3,
    opacity: toggle ? 1 : 0,
    from: { opacity: 0 },
    immediate: prefersReducedMotion,
  })

  useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  return (
    <>
    <div style={{
      marginTop: '30px',
      gridColumn: '2/12',
      color: '#374962',
      maxWidth: '370px',
    }}>
      <h2 style={{
        fontSize: '42px',
        fontWeight: 'bold',
        lineHeight: '1.5',
        margin: '0 0 15px',
      }}>Scrolling Swirls 👇</h2>
      <p style={{
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '1.5',
        margin: '0 0 15px',
      }}>
        The swirls were designed to dance around blocks of text as you scroll down the page.
      </p>
    </div>
    <div style={{
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '100vh',
      textAlign: 'center',
      color: '#374962',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h2 style={{
        fontSize: '42px',
        fontWeight: 'bold',
        lineHeight: '1.5',
        margin: '0 0 15px',
      }}>🌈 Snazzy ✨</h2>
    </div>
    <animated.div
      style={{
        gridColumn: '1/13',
        opacity,
        height: '1000vh',
      }}
    >
      {hasMounted && (
        <Suspense fallback={null}>
          <Sketch />
        </Suspense>
      )}
    </animated.div>
    </>
  )
}

class SwirlsPage extends React.Component {
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

export default SwirlsPage
