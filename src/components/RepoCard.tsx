import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaExclamationCircle, FaCode, FaCalendarAlt } from 'react-icons/fa';
import { GithubRepo } from '../types/github';
import Card from './ui/Card';

interface RepoCardProps {
  repo: GithubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <Card className="mb-4 hover:border-l-2 hover:border-primary-500 transition-all">
      <div className="p-5">
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-primary-600 hover:underline dark:text-primary-400 flex items-center"
              data-testid="repo-name"
              whileHover={{ x: 2 }}
            >
              <div className="w-1 h-5 bg-primary-500 rounded-full mr-2"></div>
              {repo.name}
            </motion.a>
            <div className="flex items-center space-x-3 text-sm bg-glass-300 dark:bg-dark-glass-300 px-3 py-1 rounded-full">
              <motion.span
                className="flex items-center text-yellow-500"
                data-testid="stargazers"
                whileHover={{ scale: 1.1 }}
              >
                <FaStar className="mr-1" />
                {repo.stargazers_count.toLocaleString()}
              </motion.span>
              <motion.span
                className="flex items-center text-blue-500"
                whileHover={{ scale: 1.1 }}
              >
                <FaCodeBranch className="mr-1" />
                {repo.forks_count.toLocaleString()}
              </motion.span>
              {repo.open_issues_count > 0 && (
                <motion.span
                  className="flex items-center text-red-500"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaExclamationCircle className="mr-1" />
                  {repo.open_issues_count.toLocaleString()}
                </motion.span>
              )}
            </div>
          </div>

          {repo.description && (
            <p className="mt-3 text-gray-600 dark:text-gray-300 bg-glass-100 dark:bg-dark-glass-100 p-3 rounded-lg" data-testid="repo-description">
              {repo.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {repo.language && (
              <motion.span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium glass-button text-gray-800 dark:text-gray-200"
                whileHover={{ y: -2 }}
              >
                <FaCode className="mr-1" />
                {repo.language}
              </motion.span>
            )}

            {repo.topics && repo.topics.slice(0, 3).map(topic => (
              <motion.span
                key={topic}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                whileHover={{ y: -2 }}
              >
                {topic}
              </motion.span>
            ))}

            {repo.topics && repo.topics.length > 3 && (
              <motion.span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium glass-button text-gray-800 dark:text-gray-200"
                whileHover={{ y: -2 }}
              >
                +{repo.topics.length - 3} more
              </motion.span>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <FaCalendarAlt className="mr-1" />
            Updated {new Date(repo.updated_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepoCard;
