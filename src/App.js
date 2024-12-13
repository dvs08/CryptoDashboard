import React from 'react';
// import ReactDOM, { createRoot } from 'react-dom/client';
import ReactDom from 'react-dom';
import Main from './components/main';
import '@innovaccer/design-system/css';

const App = () => <Main/>;

const root = document.getElementById('app');

ReactDom.render(<App/>, root);

