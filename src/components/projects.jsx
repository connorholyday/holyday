import styles from './Projects.module.css'
// import mcdo from '../assets/projects/mcdo.avif';
import apechain from '../assets/projects/apechain.jpg';
import understood from '../assets/projects/understood.jpg';
import prosperity from '../assets/projects/prosperity.png';
import hopp from '../assets/projects/hopp.jpg';
import nova from '../assets/projects/nova.jpg';
import dry from '../assets/projects/dry.png';
import lagoon from '../assets/projects/lagoon.jpg';
import ileditor from '../assets/projects/ileditor2.jpg';
import hk from '../assets/projects/hk.jpg';
import kerrygold from '../assets/projects/kerrygold.jpg';
import spotify from '../assets/projects/spotify.avif';
import xox from '../assets/projects/xox.jpeg';
import mmplay from '../assets/projects/mmplay.jpeg';
import netflix from '../assets/projects/netflix.jpg';

const data = [
  {
    slug: "netflix-events",
    poster: netflix.src,
    title: "Netflix Events",
    url: "https://onepiecemarket.fr/",
    desc: "One Piece Season 2, Stranger Things Season 5, Bridgerton Season 4",
    tech: ["TypeScript", "Vue", "Tailwind", "Vite"]
    // more than 700 people refreshing the website before the launch of the ticket registration
    // ALL TICKETS gone in less than 3 minutes
  },
  {
    slug: "spotify",
    poster: spotify.src,
    title: "Spotify Astrology Club",
    case: "https://www.makemepulse.com/case-study/astrology-club-by-spotify",
    tech: ["Vue", "Nuxt", "Contentful"],
    awards: ["FWA SotD"],
  },
  {
    slug: "kerrygold",
    poster: kerrygold.src,
    title: "Kerrygold: The Magical Pantry",
    url: "https://www.themagicalpantry.com/",
    case: "https://www.makemepulse.com/case-study/kerrygold-the-magical-pantry",
    tech: ["TypeScript", "Vue", "XState", "Storybook", "Prismic"],
    awards: ["Awwwards SotD", "FWA SotD"],
  },
  {
    slug: "intuit",
    poster: prosperity.src,
    title: "Intuit Prosperity",
    case: "https://www.makemepulse.com/case-study/intuit-prosperity",
    tech: ["TypeScript", "Vue", "XState", "Storybook"],
    awards: [],
  },
  {
    slug: "hopp",
    poster: hopp.src,
    title: "Hopp",
    url: "https://hopp.bike/",
    tech: ["TypeScript", "React Native", "Node", "XState", "GraphQL"],
    awards: [],
  },
  // {
  //   slug: "mcdonalds",
  //   poster: mcdo.src,
  //   title: "McDonalds",
  //   tech: ["TypeScript", "Vue", "Tailwind", "Vite"]
  // },
  {
    slug: "makemeplay",
    poster: mmplay.src,
    title: "makemeplay",
    url: "https://play.makemepulse.com/",
    tech: ["Vue", "Nuxt", "Tailwind", "Prismic"],
    awards: ["Awwwards SotD", "FWA SotD"],
  },
  {
    slug: "xox",
    poster: xox.src,
    title: "XOX",
    url: "https://xox.makemepulse.com/",
    tech: ["TypeScript", "Vue", "Tailwind", "XState", "Vite"],
    awards: ["Awwwards SotD", "FWA SotD"],
  },
  {
    slug: "dry",
    poster: dry.src,
    title: "Dry January",
    url: "https://alcoholchange.org.uk/get-involved/campaigns/dry-january/get-involved/the-dry-january-app",
    case: "https://www.rareloop.com/project/dry-january/",
    tech: ["Ionic", "AngularJS"],
  },
  {
    slug: "lagoon",
    poster: lagoon.src,
    title: "Blue Lagoon",
    url: "https://www.bluelagoon.com/",
    tech: ["TypeScript", "React", "NextJS", "Contentful"],
  },
  {
    slug: "apechain",
    poster: apechain.src,
    title: "Apechain",
    url: "https://apechain.com/",
    case: "https://www.makemepulse.com/case-study/apechain-platform-redesign",
    tech: ["TypeScript", "React", "NextJS", "Tailwind", "Contentful"],
    awards: ["Awwwards SotD", "FWA SotD"],
  },
  {
    slug: "companion",
    poster: understood.src,
    title: "Understood: Companion Resources",
    url: "https://www.understood.org/en/through-my-eyes/kids-resources",
    case: "https://www.makemepulse.com/case-study/companion-resources-understood",
    tech: ["TypeScript", "React", "Tailwind", "Vite"],
    awards: [],
  },
  {
    slug: "ileditor",
    poster: ileditor.src,
    title: "ILEditor 2",
    tech: ["TypeScript", "React", "Electron"],
    awards: [],
  },
  {
    slug: "nova",
    poster: nova.src,
    title: "Nova App",
    url: "https://www.nova.is/",
    tech: ["TypeScript", "React Native", "XState", "GraphQL"],
    awards: [],
  },
  {
    slug: "hk",
    poster: hk.src,
    title: "Hill and Knowlton",
    case: "https://www.makemepulse.com/case-study/hill-knowlton-global-website",
    tech: ["Vue", "Nuxt", "Contentful"],
    awards: [],
  },
]

const Projects = () => {
  return data.map(project => 
    <article
      key={project.slug}
      className={styles.caseStudy}
    >
      <div className={styles.caseStudy__header}>
        {project.title && (<h3 className={styles.caseStudy__title}>{project.title}</h3>)}
        {project.url && (<div><span className={styles.caseStudy__linkDivider}>–</span><a className="Link Tag" href={project.url} target="_blank" rel="noopener noreferrer">View live</a></div>)}
      </div>
      <div className={styles.caseStudy__media}>
        {project.video && (
          <video
            className={styles.caseStudy__video}
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
          >
            <source src={project.video} type="video/mp4"></source>
          </video>
        )}
        {project.poster && (<img className={styles.caseStudy__img} src={project.poster} loading="lazy" alt="" />)}
      </div>
      <div className={styles.caseStudy__meta}>
        {project.tech && project.tech.length && (
          <ul className={styles.caseStudy__techList}>
            {project.tech.map(tech => <li key={`${project.slug}-${tech}`}>{tech}</li>)}
          </ul>
        )}
        {project.case && (<a className="Link Tag Tag--alt" href={project.case} target="_blank" rel="noopener noreferrer">Case Study</a>)}
      </div>
    </article>
  )
}

export default Projects
