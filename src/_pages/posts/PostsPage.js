import React, { useEffect, useState, useMemo } from 'react';

import { CircularProgress } from '@material-ui/core';
import { isRefetch } from '_store/modalContext';
import { useDispatch, useSelector } from 'react-redux';

import { APP_BOTTOM_NAVIGATION, LOAD_LIST_ITEMS } from '_constants';
import { postsSelector } from '_layers/dataSelectors';
import { usePostsList, useFilteredPostsList } from '_layers/gql/hooks';
import { BottomNavigation } from '_layers/ui/components';
import { CenterLayout, PageLayout } from '_layers/ui/layouts';

import { PostPageFilterButton } from './PostPage.Filter.Button';
import { PostsPageContent } from './PostsPage.Content';

export const PostsPage = props => {
  const needRefetch = useSelector(state => state.modal.isRefetch);
  const types = useSelector(state => state.modal.checkBoxes);
  const [filterType, setFilterType] = useState(
    types.map(el => {
      return el.name;
    }),
  );
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: filteredData,
    loading: filteredLoading,
    fetchMore: filteredFetchMore,
    refetch: filteredRefetch,
  } = useFilteredPostsList({
    variables: {
      first: LOAD_LIST_ITEMS,
      state: filterType,
    },
  });

  const { data, loading, fetchMore, refetch } = usePostsList({
    variables: {
      first: LOAD_LIST_ITEMS,
    },
  });

  useEffect(() => {
    if (needRefetch) {
      const newTypes = types.length
        ? types
            .filter(el => el.status)
            .map(el => {
              return el.name;
            })
        : [];
      setFilterType(newTypes);
    }
  }, [needRefetch, types]);

  useEffect(() => {
    if (needRefetch) {
      if (filterType.length) {
        filteredRefetch();
      } else {
        refetch();
      }

      dispatch(isRefetch(false));
    }
  }, [dispatch, filterType, filteredRefetch, needRefetch, refetch]);

  const postsList = useMemo(() => postsSelector.getList(data), [data]);
  const totalCount = useMemo(() => postsSelector.getTotalCount(data), [data]);
  const filteredPostsList = useMemo(() => postsSelector.getListFiltering(filteredData), [
    filteredData,
  ]);
  const filteredTotalCount = useMemo(() => postsSelector.getTotalCount(filteredData), [
    filteredData,
  ]);

  useEffect(() => {
    if (filteredPostsList.length || filterType.length) {
      setPosts(filteredPostsList);
      setCount(filteredTotalCount);
      setIsLoading(filteredLoading);
    } else if (postsList.length) {
      setPosts(postsList);
      setCount(totalCount);
      setIsLoading(loading);
    }
  }, [
    filteredPostsList,
    postsList,
    filterType,
    filteredLoading,
    filteredTotalCount,
    loading,
    totalCount,
  ]);

  const onEndReached = () => {
    if (!filteredPostsList.length) {
      fetchMore({
        variables: {
          skip: postsList.length,
        },
      });
    } else {
      filteredFetchMore({
        variables: {
          skip: filteredPostsList.length,
        },
      });
    }
  };

  return (
    <PageLayout
      content={
        <>
          {isLoading ? (
            <CenterLayout>
              <CircularProgress />
            </CenterLayout>
          ) : (
            <PostsPageContent postsList={posts} totalCount={count} onEndReached={onEndReached}>
              <PostPageFilterButton />
            </PostsPageContent>
          )}
        </>
      }
      footer={<BottomNavigation navList={APP_BOTTOM_NAVIGATION} />}
    />
  );
};
