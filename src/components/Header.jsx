import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.grid}>
      <div className={styles.header}>
        <h2 className={styles.logo}>
          <a
            style={{
              color: 'inherit',
              boxShadow: `none`,
              textDecoration: `none`,
            }}
            href="/"
          >
            Connor Holyday
          </a>
        </h2>
        <nav>
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <a className="Link" target="_blank" rel="noopener noreferrer" href="https://github.com/connorholyday">Github</a>
            </li>
            <li className={styles.navItem}>
              <a className="Link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/connor-holyday-91736082/">LinkedIn</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
