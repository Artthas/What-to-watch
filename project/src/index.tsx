import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const title = 'The Grand Budapest Hotel';
const genre = 'Drama';
const date = '2014';

ReactDOM.render(
  <React.StrictMode>
    <App title={title} genre={genre} date={date}/>
  </React.StrictMode>,
  document.getElementById('root'));
