import React from 'react';
import { rhythm } from '../../utils/typography'
import Bio from '../Bio'
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
    </>
  )
}

export default Home;
