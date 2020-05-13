import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './assets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

setGlobal({
  isLoading: true,
  isLoggedIn: false,
  isOpenSnackbar: false,
  snackbarSeverity: '',
  snackbarMessage: '',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
