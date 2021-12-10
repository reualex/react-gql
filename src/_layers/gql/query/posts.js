import { gql } from '@apollo/client';

export const POSTS_LIST_QUERY = gql`
  query PostsList($first: Int, $skip: Int) {
    postsList(first: $first, skip: $skip) {
      count
      items {
        id
        title
        content
        createdAt
        thumbnail {
          id
          downloadUrl
        }
      }
    }
  }
`;

export const POSTS_LIST_FILTERING_QUERY = gql`
  query PostList($state: [String!]) {
    postsList(filter: { tags: { some: { name: { in: $state } } } }) {
      count
      items {
        id
        title
        thumbnail {
          id
          downloadUrl
        }
      }
    }
  }
`;

export const test = gql`
  query TagsList($state: [String!]) {
    tagsList(filter: { name: { in: $state } }) {
      items {
        posts {
          count
          items {
            id
            title
            thumbnail {
              id
              downloadUrl
            }
          }
        }
      }
      groups: items {
        posts {
          count
          items {
            id
            title
            thumbnail {
              id
              downloadUrl
            }
          }
        }
      }
    }
  }
`;
