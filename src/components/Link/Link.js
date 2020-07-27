import React from 'react'
import { Link as BaseLink } from 'gatsby'
import Transition from 'gatsby-plugin-transition-link'
import * as styles from './Link.module.css'

const TRANSITION_DELAY = 0.4
export const TRANSITION_DELAY_IN_MS = TRANSITION_DELAY * 1000

const exitTransition = {
  length: TRANSITION_DELAY + 0.3,
}

const entryTransition = {
  delay: TRANSITION_DELAY + 0.3,
}

export function TransitionLink({ children, style, ...props }) {
  return (
    <Transition
        className={style === undefined && styles.link}
        style={style}
        exit={exitTransition}
        entry={entryTransition}
        {...props}
    >
        {children}
    </Transition>
  )
}

export function InternalLink({ children, style, ...props }) {
  return (
    <BaseLink
        className={style === undefined && styles.link}
        style={style}
        {...props}
    >
        {children}
    </BaseLink>
  )
}

export function ExternalLink({ children, style, to, href, ...props }) {
  return (
    <a
        className={style === undefined && styles.link}
        style={style}
        href={to === undefined ? href : to}
        {...props}
    >
        {children}
    </a>
  )
}
