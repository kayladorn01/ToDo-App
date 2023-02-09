import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header.js';

// Utilized BrowserRouter as Router, Route to navigate between the Header and TodoList components.
function App() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <Router>
        <Route path="/" exact component={Header} />
        <Route path="/user" component={TodoList} />
      </Router>
    </div>
  );
}

/* The App function here has been exported to display the Header and TodoList components. 
This is done when the App.js file is imported and used in Index.js. */
export default App;