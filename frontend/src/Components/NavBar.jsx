import React from 'react';
import '../css/index.css';
import {
  Link
} from 'react-router-dom';

const NavBar = () => {
  return (
    <>
    <nav>
      <div className="nav-wrapper">
        <ul>
          <li><Link to = "/">Home</Link></li>
          <li><Link to = "/blog-list">Blogs</Link></li>
          <li><Link to = "/about"> About</Link></li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default NavBar;