import { useQuery } from '@apollo/client';

import { COMMENTS_LIST_QUERY } from '../query';

export const useCommentsList = options => {
  return useQuery(COMMENTS_LIST_QUERY, options);
};
