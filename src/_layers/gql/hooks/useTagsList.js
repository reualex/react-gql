import { useQuery } from '@apollo/client';

import { TAGS_LIST_QUERY } from '../query';

export const useTagsList = options => {
  return useQuery(TAGS_LIST_QUERY, options);
};
