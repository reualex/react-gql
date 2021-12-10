import { Auth, AUTH_STRATEGIES } from '8base-sdk';

import { API_TOKEN } from '_constants';

export const AUTH_CLIENT = Auth.createClient(
  {
    strategy: AUTH_STRATEGIES.API_TOKEN,
    subscribable: true,
  },
  {
    apiToken: API_TOKEN,
  },
);
