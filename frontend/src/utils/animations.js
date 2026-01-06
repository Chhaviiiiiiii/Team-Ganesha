export const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30
}

export const smoothSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 25
}

export const bouncySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 20
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const slideRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default {
  springConfig,
  smoothSpring,
  bouncySpring,
  fadeIn,
  slideUp,
  slideRight,
  scaleIn,
  staggerContainer
}
