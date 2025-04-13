import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaUser, FaGithub } from 'react-icons/fa';
import { GithubUser } from '../types/github';
import Card from './ui/Card';

interface UserCardProps {
  user: GithubUser;
  isSelected: boolean;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isSelected, onClick }) => {
  return (
    <Card
      interactive
      className={`mb-4 transition-all ${isSelected ? 'border-l-4 border-primary-500 shadow-glass-lg' : 'shadow-glass-sm'}`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {user.avatar_url ? (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary-500 rounded-full blur-sm opacity-30 scale-110" />
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  className="w-12 h-12 rounded-full relative z-10 border-2 border-glass-300 dark:border-dark-glass-300"
                />
              </motion.div>
            ) : (
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white" data-testid="user-login">
                {user.login}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <FaGithub className="mr-1" />
                {user.type}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isSelected ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="bg-glass-300 dark:bg-dark-glass-300 p-2 rounded-full"
          >
            <FaChevronDown className="text-gray-600 dark:text-gray-300" />
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
