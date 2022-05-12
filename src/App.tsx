import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes';
import { theme } from './utils/theme';
import { Provider } from 'react-redux';
import { store, persistor } from './stores/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  //  const { colorMode, theme } = useContext(ColorModeContext);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
