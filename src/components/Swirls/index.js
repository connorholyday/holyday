import * as THREE from 'three'
import React, { Suspense } from 'react'
import { Canvas, Dom } from 'react-three-fiber'
import { Html, useProgress, OrbitControls } from 'drei'
// import Model, { Macaron } from './Swirls'
import Model from './swirls2'
import video from './swirls-video.mp4'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function Sketch({ location }) {
  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef()
  return (
    <>
      <video
        ref={ref}
        src={video}
        muted
        autoPlay
        loop
        onPlay={() => setLoaded(true)}
        style={{ opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
      />
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transform: 'translateZ(0)',
        }}
        // camera={{
        //   position: [0, 0, 20],
        //   fov: 50,
        //   far: 5000,
        // }}
      >
        <directionalLight position={[10, 10, 0]} angle={0.3} intensity={3} />
        <ambientLight intensity={1.85} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={<Loader />}>
          {loaded && <Model video={ref} />}
          {/* {loaded && <Model position={[0, -1000, -1000]} video={ref} />} */}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default Sketch
