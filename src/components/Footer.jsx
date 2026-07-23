import styles from './Header.module.css'

const Header = ({}) => {
  return (
    <footer
      style={{
        display: 'flex',
        marginTop: 40,
        padding: `40px 0`,
        gridColumn: '2/12',
        zIndex: 2,
      }}
    >
      <p style={{ margin: 0, marginRight: 'auto' }}>
        &copy; {new Date().getFullYear()}
      </p>
      <p style={{ margin: 0 }}>Have a nice day 👋</p>
    </footer>
  )
}

export default Header
