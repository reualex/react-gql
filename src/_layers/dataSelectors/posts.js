const getList = data => {
  return data?.postsList?.items || [];
};

const getTotalCount = data => {
  return data?.postsList?.count || 0;
};

const getListFiltering = data => {
  return data?.postsList?.items || [];
};

export const postsSelector = {
  getList,
  getTotalCount,
  getListFiltering,
};
