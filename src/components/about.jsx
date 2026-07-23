import styles from './About.module.css'
import Animate from './animate.jsx'
import profile from '../assets/profile.jpg';

// TODO
// get it in first
// then add gsap scrolltrigger

const About = () => {
  return (
    <>
      <div className={styles.media}>
        <img className={styles.img} src={profile.src} alt="Male with grey hair and a beard" loading="lazy" />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>Who am I?</h2>
        <div>
          <p>I'm a fullstack developer living just outside of Cardiff in the UK. I have over 10 years of experience writing code for a wonderful mix of medias ranging from: websites, apps, physical installations, to even a custom IDE.</p>

          <p>My all time favourite thing about working in digital is making people smile. Whether that's from a well-built UI or a playful interaction, a smile is a sign of a job done well.</p>

          <p>Outside of work you'll likely find me reading a good book or playing a board game - my current favourite is Catan but Carcassonne is a close second.</p>
        </div>
      </div>
    </>
  )
}

export default About
