import { AppProvider } from '8base-react-sdk';
import { CircularProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import { CACHE_CONFIG, AUTH_CLIENT } from '_configs';
import { API_ENDPOINT_URI } from '_constants';
import { RootWrapper } from '_layers/ui/components';
import { CenterLayout } from '_layers/ui/layouts';
import theme from '_layers/ui/theme';
import { Pages } from '_pages/';

import './App.css';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootWrapper>
        <AppProvider
          uri={API_ENDPOINT_URI}
          authClient={AUTH_CLIENT}
          cacheOptions={CACHE_CONFIG}
          // TODO: [contribution] add introspection data and tablesList
          introspectionQueryResultData={{}}
          tablesList={[]}
        >
          {({ loading }) => {
            if (loading) {
              return (
                <CenterLayout>
                  <CircularProgress />
                </CenterLayout>
              );
            }

            return <Pages />;
          }}
        </AppProvider>
      </RootWrapper>
    </ThemeProvider>
  );
};
