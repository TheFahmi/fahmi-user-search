import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  floating?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  interactive = false,
  floating = false,
}) => {
  const baseClasses = 'glass-card';
  const interactiveClasses = interactive
    ? 'cursor-pointer transition-all hover:shadow-glass-lg'
    : '';
  const floatingClasses = floating ? 'floating' : '';

  return (
    <motion.div
      className={`${baseClasses} ${interactiveClasses} ${floatingClasses} ${className}`}
      onClick={onClick}
      whileHover={interactive ? { y: -4, scale: 1.02 } : {}}
      whileTap={interactive ? { y: 0, scale: 1 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;
