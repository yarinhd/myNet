import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Store from './Store';
import Routes from './Routes';

const App: React.FC = () => {
    return (
        <Store>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </Store>
    );
};

export default App;
