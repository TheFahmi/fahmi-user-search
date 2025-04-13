import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import UserSearch from './components/UserSearch';
import { FaMoon, FaSun } from 'react-icons/fa';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    // Add transition class
    document.documentElement.classList.add('dark-mode-transition');

    // Create overlay for transition effect
    const overlay = document.createElement('div');
    overlay.className = newDarkMode ? 'dark-mode-fade-in' : 'dark-mode-fade-out';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = newDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);

    // Apply dark mode with slight delay for animation
    setTimeout(() => {
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Remove transition class and overlay after animation
      setTimeout(() => {
        document.documentElement.classList.remove('dark-mode-transition');
        document.body.removeChild(overlay);
      }, 500);
    }, 50);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen transition-colors duration-300">
        {/* Decorative elements */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Glass orbs */}
          <motion.div
            className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary-400/20 dark:bg-primary-400/10 blur-3xl"
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-[15%] w-72 h-72 rounded-full bg-secondary-400/20 dark:bg-secondary-400/10 blur-3xl"
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute top-[40%] left-[25%] w-96 h-96 rounded-full bg-blue-300/10 dark:bg-blue-300/5 blur-3xl"
            animate={{
              x: [0, 30, 0],
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <motion.button
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 p-4 rounded-full glass-button text-gray-800 dark:text-white shadow-glass z-50 hover:shadow-glass-lg transition-all"
          aria-label="Toggle dark mode"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-primary-600" />}
        </motion.button>

        <UserSearch />
      </div>
    </QueryClientProvider>
  );
};

export default App;
