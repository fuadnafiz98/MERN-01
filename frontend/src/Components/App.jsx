import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import '../css/App.css';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import BlogListPage from './BlogListPage';
import BlogPage from './BlogPage';
import NavBar from './NavBar';
import NotFound from './404';

class App extends React.Component {
  render() {
    return ( 
    <Router >
      <div className = "App" >
      <NavBar />
      <Switch >
      <Route exact path = "/"
      component = {
        HomePage
      }
            />
            <Route exact path = "/about"
      component = {
        AboutPage
      }
      /> <
      Route exact path = "/blog-list"
      component = {
        BlogListPage
      }
      /> <
      Route path = "/blog-page/:name"
      component = {
        BlogPage
      }
      /> <
      Route component = {
        NotFound
      }
      /> < /
      Switch > <
      /div> < /
      Router >
    );
  }
};

export default App;