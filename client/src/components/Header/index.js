import React from 'react'
import { motion } from 'framer-motion'

const titleVariants = {
  hidden: {
    y: -200
  },
  visible: {
    y: 0
  }
}

export const Header = () => {
  return <motion.h3 className="title"
    initial='hidden'
    animate='visible'
    transition={{ type: 'spring', stiffness: 120 }}
    variants={titleVariants}
  >Concentration</motion.h3>
}
