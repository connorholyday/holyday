import Typography from 'typography'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Circular', 'Open Sans', 'sans-serif'],
  bodyFontFamily: ['Merriweather', 'Georgia', 'serif'],
  bodyColor: '#333333',
  headerWeight: 900,
  headerWeight: 800,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    blockquote: {
      ...scale(1 / 5),
      color: '#666666',
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: rhythm(-1),
      borderLeft: `${rhythm(3 / 16)} solid #999999`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    ul: {
      listStyle: 'disc',
    },
    'ul,ol': {
      marginLeft: 0,
    },
    [MOBILE_MEDIA_QUERY]: {
      'ul,ol': {
        marginLeft: rhythm(1),
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(2),
    },
    h4: {
      letterSpacing: '0.140625em',
      textTransform: 'uppercase',
    },
    h6: {
      fontStyle: 'italic',
    },
    a: {
      boxShadow: '0 1px 0 0 currentColor',
      color: '#286CCD',
      textDecoration: 'none',
      fontFamily: `Circular, "Open Sans", sans-serif`,
    },
    'a:hover,a:active': {
      boxShadow: 'none',
    },
    'mark,ins': {
      background: '#286CCD',
      color: 'white',
      padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
      textDecoration: 'none',
    },
  }),
  overrideThemeStyles: () => {
    return {
      'a.gatsby-resp-image-link': {
        boxShadow: `none`,
      },
    }
  },
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
