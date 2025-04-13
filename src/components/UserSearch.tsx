import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaSearch, FaUserAstronaut } from 'react-icons/fa';
import { useSearchUsers, useUserRepos } from '../hooks/useGithubQueries';
import SearchInput from './ui/SearchInput';
import UserCard from './UserCard';
import RepoCard from './RepoCard';
import Skeleton from './ui/Skeleton';
import Card from './ui/Card';
import { GithubUser } from '../types/github';

const UserSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [searchEnabled, setSearchEnabled] = useState(false);

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    isFetching: isSearchFetching
  } = useSearchUsers(searchQuery, searchEnabled);

  const {
    data: userRepos,
    isLoading: isReposLoading,
    isFetching: isReposFetching
  } = useUserRepos(selectedUser, !!selectedUser);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchEnabled(true);
    setSelectedUser('');
  };

  const handleUserClick = (user: GithubUser) => {
    if (selectedUser === user.login) {
      setSelectedUser('');
    } else {
      setSelectedUser(user.login);
    }
  };

  const isLoading = isSearchLoading || isSearchFetching;
  const hasError = searchError !== null;
  const hasUsers = searchResults?.items && searchResults.items.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        className="flex items-center justify-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-primary-500 rounded-full blur-md opacity-50"></div>
          <FaGithub className="text-5xl mr-4 text-gray-800 dark:text-white relative z-10" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
          GitHub User Search
        </h1>
      </motion.div>

      <Card className="overflow-hidden mb-8 shadow-glass-lg">
        <div className="p-6 sticky top-0 z-10 backdrop-blur-xl bg-glass-200 dark:bg-dark-glass-200 border-b border-glass-300 dark:border-dark-glass-300">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search GitHub users..."
            isLoading={isLoading}
            initialValue={searchQuery}
          />

          {hasError && (
            <motion.div
              className="mt-4 p-4 bg-red-100/70 backdrop-blur-sm text-red-700 rounded-xl dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <FaSearch className="mr-2 text-red-500" />
                An error occurred while searching. Please try again.
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <Skeleton width="w-12" height="h-12" circle />
                    <div className="space-y-2 w-full">
                      <Skeleton width="w-40" />
                      <Skeleton width="w-24" height="h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasUsers ? (
            <div>
              <motion.div
                className="mb-6 glass p-3 rounded-lg inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <FaSearch className="mr-2 text-primary-500" />
                  Found <span className="font-bold mx-1">{searchResults.total_count.toLocaleString()}</span> users.
                  Showing top <span className="font-bold mx-1">{searchResults.items.length}</span>.
                </p>
              </motion.div>

              <div className="space-y-3">
                {searchResults.items.map((user, index) => (
                  <motion.div
                    key={user.id}
                    data-testid="user-click"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <UserCard
                      user={user}
                      isSelected={selectedUser === user.login}
                      onClick={() => handleUserClick(user)}
                    />

                    <AnimatePresence>
                      {selectedUser === user.login && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden pl-6 border-l-2 border-glass-300 dark:border-dark-glass-300 ml-6"
                        >
                          {isReposLoading || isReposFetching ? (
                            <div className="py-6 space-y-4">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="space-y-3">
                                  <Skeleton width="w-3/4" />
                                  <Skeleton width="w-full" height="h-16" />
                                </div>
                              ))}
                            </div>
                          ) : userRepos && userRepos.length > 0 ? (
                            <div className="py-6">
                              <div className="flex items-center mb-4 bg-glass-200 dark:bg-dark-glass-200 p-3 rounded-lg">
                                <div className="w-1 h-6 bg-primary-500 rounded-full mr-3"></div>
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                                  Repositories ({userRepos.length})
                                </h3>
                              </div>
                              {userRepos.map((repo, idx) => (
                                <motion.div
                                  key={repo.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                >
                                  <RepoCard repo={repo} />
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="py-6 text-center">
                              <Card className="p-6 text-gray-500 dark:text-gray-400 flex flex-col items-center">
                                <FaUserAstronaut className="text-4xl mb-3 text-gray-400 dark:text-gray-500" />
                                <p>No repositories found for this user.</p>
                              </Card>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : searchQuery && !isLoading ? (
            <motion.div
              className="text-center py-12 glass-card p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaSearch className="text-4xl mb-4 mx-auto text-gray-400 dark:text-gray-500" />
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No users found matching <span className="font-bold">'{searchQuery}'</span>.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Try a different search term or check your spelling.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaSearch className="text-5xl mb-4 mx-auto text-gray-300 dark:text-gray-600 opacity-50" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Enter a GitHub username to search for users
              </p>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserSearch;
