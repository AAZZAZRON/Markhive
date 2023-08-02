import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './features/auth';
import userReducer from './features/user';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react'

const root = createRoot(document.getElementById('root'));

// redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// redux
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
