import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from './container/HomePage';

ReactDOM.hydrate(
  <React.StrictMode>
    <Router>
      <HomePage />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
