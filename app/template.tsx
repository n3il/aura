// app/template.tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 30 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 1, x: 0, y: -30 },
  };

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'spring', duration: 0.5 }}
    >
      {children}
    </motion.main>
  );
}
