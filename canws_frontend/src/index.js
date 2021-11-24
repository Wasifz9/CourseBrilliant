import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
// import theme
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '',
    ].join(','),
  },
  palette: {
    primary_blue: {
      main: '#005E93',
      lighter: '#00A3FF',
      contrastText: '#FFFFFF',
    },
    primary_green: {
      main: '#4CBB17',
      lighter: '#00A3FF',
      contrastText: '#FFFFFF',
    },
    secondary_yellow: {
      main: '#FAFF13',
      darker: '#DBDF00',
      contrastText: '#000000',
    },
    invalid_red: {
      main: '#D74141',
    },
    background_gray: {
      main: '#ECECEC',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
