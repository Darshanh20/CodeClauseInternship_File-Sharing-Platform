import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import IntroPage from './IntroPage';
import ViewFile from './FileAccess'; // Make sure you have this file created
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/file/:id" element={<ViewFile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
