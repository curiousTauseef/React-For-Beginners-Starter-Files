// let's go!

//libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

//css file
import './css/style.css'

//components
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={StorePicker} />
          <Match exactly pattern="/store/:storeId" component={App} />  
          <Miss component={NotFound} />      
        </div>
      </BrowserRouter>
    )
}

ReactDOM.render(<Root/>, document.querySelector('#main')); 