import { gql } from '@apollo/client';

export const COMMENTS_LIST_QUERY = gql`
  query CommentsList($first: Int, $skip: Int) {
    commentsList(first: $first, skip: $skip) {
      count
      items {
        id
        content
        createdAt
      }
    }
  }
`;
