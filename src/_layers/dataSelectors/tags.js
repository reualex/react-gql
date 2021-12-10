const getList = data => {
  return data?.tagsList?.items || [];
};

const getTotalCount = data => {
  return data?.tagsList?.count || 0;
};

export const tagsSelector = {
  getList,
  getTotalCount,
};
