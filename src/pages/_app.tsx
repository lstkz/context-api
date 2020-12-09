import React from 'react';
import _NextApp, { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorModalModule } from '../ErrorModalModule';

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorModalModule>
      <Component {...pageProps} />;
    </ErrorModalModule>
  );
}

export default App;
