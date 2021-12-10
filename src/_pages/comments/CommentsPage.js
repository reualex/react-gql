import { CircularProgress } from '@material-ui/core';

import { APP_BOTTOM_NAVIGATION, LOAD_LIST_ITEMS } from '_constants';
import { commentsSelector } from '_layers/dataSelectors';
import { useCommentsList } from '_layers/gql/hooks';
import { BottomNavigation } from '_layers/ui/components';
import { CenterLayout, PageLayout } from '_layers/ui/layouts';

import { CommentsPageContent } from './CommentsPage.Content';

export const CommentsPage = () => {
  const { data, loading, fetchMore } = useCommentsList({
    variables: {
      first: LOAD_LIST_ITEMS,
    },
  });

  const commentsList = commentsSelector.getList(data);
  const totalCount = commentsSelector.getTotalCount(data);

  const onEndReached = () => {
    fetchMore({
      variables: {
        skip: commentsList.length,
      },
    });
  };

  return (
    <PageLayout
      content={
        <>
          {loading ? (
            <CenterLayout>
              <CircularProgress />
            </CenterLayout>
          ) : (
            <CommentsPageContent
              commentsList={commentsList}
              totalCount={totalCount}
              onEndReached={onEndReached}
            />
          )}
        </>
      }
      footer={<BottomNavigation navList={APP_BOTTOM_NAVIGATION} />}
    />
  );
};
