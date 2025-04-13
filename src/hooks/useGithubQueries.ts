import { useQuery } from '@tanstack/react-query';
import { searchUsers, getUserRepos, getUserProfile } from '../api/githubApi';

export const useSearchUsers = (query: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => searchUsers(query),
    enabled: query.trim() !== '' && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserRepos = (username: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['repos', username],
    queryFn: () => getUserRepos(username),
    enabled: username !== '' && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserProfile = (username: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => getUserProfile(username),
    enabled: username !== '' && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
