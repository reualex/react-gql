import * as R from 'ramda';

const getKeyArgs = args => {
  const doesHaveFilter = !!args?.filter;
  const doesHaveSort = !!args?.sort;
  const doesHaveGroupBy = !!args?.groupBy;
  const keys = [];

  if (doesHaveFilter) {
    keys.push('filter');
  }

  if (doesHaveSort) {
    keys.push('sort');
  }

  if (doesHaveGroupBy) {
    keys.push('groupBy');
  }

  return keys;
};

const getListQueryTypePolicy = () => ({
  keyArgs: getKeyArgs,
  merge: (existing = { items: [] }, incoming, { args }) => {
    const isFirstFetch = !args?.skip && !args?.data?.lastItemId;
    const isList = Array.isArray(incoming?.items);
    /**
     * Getting amount of items that could be received from refetch.
     */
    const refetchItemsCount = args?.first;

    // fetch-policy and refetch handler
    if (isFirstFetch) {
      // updating cache for lists, deleting items that are deprecated (deleted shoes/ offers for ex.)
      if (isList) {
        const existingItemsArr = refetchItemsCount ? R.drop(refetchItemsCount, existing.items) : [];

        return {
          ...incoming,
          items: R.uniq([...incoming?.items, ...existingItemsArr]),
        };
      }

      return incoming;
    }

    // fetch-policy handler for fields with possibly no arrays
    if (!isList) {
      return { ...existing, ...incoming };
    }

    // regular fetchMore handler
    return {
      ...incoming,
      items: R.uniq([...existing.items, ...incoming?.items]),
    };
  },
});

const createCacheConfig = () => ({
  typePolicies: {
    Query: {
      fields: {
        commentsList: getListQueryTypePolicy(),
        postsList: getListQueryTypePolicy(),
      },
    },
  },
});

export const CACHE_CONFIG = createCacheConfig();
