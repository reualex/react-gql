const getList = data => {
  return data?.commentsList?.items || [];
};

const getTotalCount = data => {
  return data?.commentsList?.count || 0;
};

export const commentsSelector = {
  getList,
  getTotalCount,
};
