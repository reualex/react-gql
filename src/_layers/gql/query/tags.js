import { gql } from '@apollo/client';

export const TAGS_LIST_QUERY = gql`
  {
    tagsList {
      items {
        name
      }
    }
  }
`;
