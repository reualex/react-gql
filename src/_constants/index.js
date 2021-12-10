import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import CommentIcon from '@material-ui/icons/Comment';

export const APP_URL = {
  main: '/',
  posts: '/posts',
  post: '/post/:id',
  comments: '/comments',
};

export const APP_BOTTOM_NAVIGATION = [
  {
    path: APP_URL.posts,
    icon: CollectionsBookmarkIcon,
  },
  {
    path: APP_URL.comments,
    icon: CommentIcon,
  },
];

export const API_ENDPOINT_URI = process.env.REACT_APP_API_ENDPOINT_URI;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const LOAD_LIST_ITEMS = 15;
