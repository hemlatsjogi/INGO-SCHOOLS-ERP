import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'heading' | 'fade-up';
  highlightWord?: string;
  highlightClass?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  type = 'words',
  highlightWord,
  highlightClass = 'text-blue-600 font-extrabold relative inline-block'
}) => {
  // Word-by-word staggered reveal variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      }
    }
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] // Custom snappy spring easing
      }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: 'blur(3px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  if (type === 'fade-up') {
    return (
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  const words = text.split(' ');

  return (
    <motion.h1
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block mr-[0.28em] ${isHighlight ? highlightClass : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};
