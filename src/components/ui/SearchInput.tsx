import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from './Button';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  isLoading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = 'Search...',
  initialValue = '',
  isLoading = false,
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <motion.div
            animate={{ scale: isFocused ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <FaSearch className="h-5 w-5 text-gray-400 dark:text-gray-300" />
          </motion.div>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block w-full pl-12 pr-3 py-3 glass-input rounded-xl leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm dark:placeholder-gray-400 backdrop-blur-lg"
          placeholder={placeholder}
          data-testid="user-input"
        />
        <div className="ml-3">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!query.trim() || isLoading}
            variant="glass"
          >
            Search
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchInput;
