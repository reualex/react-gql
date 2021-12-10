import { useQuery } from '@apollo/client';

import { POSTS_LIST_QUERY, POSTS_LIST_FILTERING_QUERY } from '../query';

export const usePostsList = options => {
  return useQuery(POSTS_LIST_QUERY, options);
};

export const useFilteredPostsList = options => {
  return useQuery(POSTS_LIST_FILTERING_QUERY, options);
};
