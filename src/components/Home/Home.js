import React from 'react';
import { rhythm } from '../../utils/typography'
import Arc from '../Arc'
import styles from './Home.module.css';

const arcHeight = 50;
const Home = ({ title, social = {} }) => {
    const { twitter = '', github = '' } = social;
  return (
    <>
      <div className={styles.content}>
        <div className={styles.centered}>
          <h1 style={{ margin: `0 0 ${rhythm(1)}` }}>Hi I'm Connor</h1>
          <p style={{ margin: 0 }}>A creative developer</p>
          <p>Attempting to spark joy on the internet</p>
          <div
            style={{
              display: 'flex',
            }}
          >
            <a href={`https://twitter.com/${twitter}`}>twitter</a> ﹒{' '}
            <a href={`https://github.com/${github}`}>github</a>
          </div>
        </div>
      </div>
      <div className={styles.media}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: `translateY(-${arcHeight}px)`,
          }}
        >
          <Arc radius={arcHeight}>From the lab</Arc>
        </div>
        <div
          style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}
        ></div>
      </div>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>Facebook Connectivity</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>Website</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>Blue Lagoon</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>Website</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>Nova</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>App</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>ILEditor 2</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>Desktop App</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>Dry January</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>App</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>YAY</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>App</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>Hopp</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>App + Website</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
          <h2 className={styles.caseStudy__title}>Hrósarinn</h2>
          <div className={styles.caseStudy__media}>
            <p className={styles.caseStudy__tag}>Website</p>
            <div style={{ background: '#eee', width: '100%', paddingBottom: '100%' }}></div>
          </div>
      </article>
    </>
  )
}

export default Home;
