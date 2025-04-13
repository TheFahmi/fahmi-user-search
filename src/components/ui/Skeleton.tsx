import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
  circle?: boolean;
  glass?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = true,
  circle = false,
  glass = true,
}) => {
  const baseClasses = glass
    ? 'animate-pulse bg-glass-200 dark:bg-dark-glass-300 backdrop-blur-sm'
    : 'animate-pulse bg-gray-200 dark:bg-gray-700';
  const roundedClasses = rounded ? 'rounded-lg' : '';
  const circleClasses = circle ? 'rounded-full' : '';

  return (
    <motion.div
      className={`${baseClasses} ${height} ${width} ${roundedClasses} ${circleClasses} ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }}
    />
  );
};

export default Skeleton;
