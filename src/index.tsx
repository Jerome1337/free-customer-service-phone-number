import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Contact from '@routes/contact';
import Faq from '@routes/faq';
import { store } from '@store';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='faq' element={<Faq />} />
          <Route path='contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);

reportWebVitals();
