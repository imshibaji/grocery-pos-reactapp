import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import './styles.css';
import router from './routes';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
