import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { defaultTheme } from './themes';

import { Layout } from './components';
// import reportWebVitals from './reportWebVitals';

const root = createRoot((document.getElementById('root')) as Element);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <Layout />
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
