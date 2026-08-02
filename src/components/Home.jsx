import { useState, useEffect, useRef } from 'react'
import styles from './Home.module.css'
import Animate from './animate.jsx'

import Ballpit from './ballpit.jsx'
import About from './about.jsx'
import Projects from './projects.jsx'

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home = () => {
  const [loaded, setLoaded] = useState(false)
  const [loadedSketch, setLoadSketch] = useState(false)

  useEffect(() => {
    setLoaded(true)
    window.setTimeout(() => {
      setLoadSketch(true)
    }, 900)
  }, [])

  const container = useRef();

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: container.value,
        start: 'top top',
        end: 'bottom top',
        // markers: true,
        onEnterBack: () => {
          setLoadSketch(true);
          // console.log('ENTER BACK')
        },
        onLeave: () => {
          setLoadSketch(false);
          // console.log('LEAVE')
        }
      }
    })
  }, { scope: container });

  return (
    <>
      {loadedSketch ? <Ballpit /> : null}
      <div ref={container} className={styles.content}>
        <div className={styles.centered}>
          {loaded ? (
            <>
              <h1 className={styles.title}>
                <Animate>Hi, I'm Connor!</Animate>
                <span style={{ display: 'block', fontWeight: '300', fontSize: '0.5em' }}><Animate delay={700}>Fullstack Developer from Wales</Animate></span>
              </h1>
            </>
          ) : null}
        </div>
      </div>
      <About />
      <Projects />
    </>
  )
}

export default Home
