import React from 'react';

import { CircularProgress, List, ListItem, ListItemText, Box } from '@material-ui/core';
import { Virtuoso } from 'react-virtuoso';

const ListContainer = React.forwardRef(({ style, children }, listRef) => {
  return (
    <List ref={listRef} style={style}>
      {children}
    </List>
  );
});

const ItemContainer = ({ children, ...props }) => {
  return (
    <>
      <ListItem {...props} divider>
        {children}
      </ListItem>
    </>
  );
};

export const CommentsPageContent = ({ commentsList = [], totalCount = 0, onEndReached }) => {
  const hasMore = commentsList.length < totalCount;

  return (
    <Virtuoso
      style={{ height: '100%', flexGrow: 1 }}
      data={commentsList}
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
      itemContent={(index, comment) => (
        <ListItemText
          primary={comment.content}
          secondary={new Date(comment.createdAt).toLocaleString()}
          primaryTypographyProps={{
            noWrap: true,
          }}
        />
      )}
    />
  );
};
