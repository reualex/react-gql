import React from 'react';

import { CircularProgress, Box } from '@material-ui/core';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import { PostPageFilterModal } from '_pages/posts/PostPage.Filter.Modal';

const styleListItem = {
  marginBottom: '10px',
  padding: '0 12px',
  maxWidth: '100%',
  boxSizing: 'border-box',
  overflow: 'overlay',
};

const modalStyles = {
  content: {
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
  },
};

const ListContainer = React.forwardRef(({ style, children }, listRef) => {
  return (
    <ImageList id="posts" ref={listRef} style={style} cols={1}>
      {children}
    </ImageList>
  );
});

const ItemContainer = ({ children, ...props }) => {
  return (
    <>
      <ImageListItem {...props} style={styleListItem}>
        {children}
      </ImageListItem>
    </>
  );
};

export const PostsPageContent = ({ postsList = [], totalCount = 0, onEndReached, children }) => {
  const hasMore = postsList.length < totalCount;
  const isOpenModal = useSelector(state => state.modal.isOpenModal);

  return (
    <>
      <div role="button" style={{ margin: '10px auto' }}>
        {children}
      </div>
      {postsList.length ? (
        <Virtuoso
          style={{ height: '100%', flexGrow: 1 }}
          data={postsList}
          totalCount={totalCount}
          endReached={onEndReached}
          components={{
            List: ListContainer,
            Item: ItemContainer,
            Footer: () => {
              return hasMore ? (
                <Box
                  component="li"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                >
                  <CircularProgress />
                </Box>
              ) : null;
            },
          }}
          itemContent={(index, post) => (
            <div style={{ display: 'contents' }}>
              <img
                src={`${post.thumbnail.downloadUrl}?w=124&fit=crop&auto=format&dpr=2`}
                srcSet={`${post.thumbnail.downloadUrl}?w=124&fit=crop&auto=format&dpr=2 2x`}
                style={{ maxWidth: '100%' }}
                alt={post.title}
              />
              <ImageListItemBar
                title={post.title}
                subtitle={<span>{new Date(post.createdAt).toLocaleString()}</span>}
                position="below"
              />
            </div>
          )}
        />
      ) : (
        <div style={{ color: 'gray', margin: '0 auto' }}>No match</div>
      )}

      <Modal isOpen={isOpenModal} style={modalStyles}>
        <PostPageFilterModal />
      </Modal>
    </>
  );
};
