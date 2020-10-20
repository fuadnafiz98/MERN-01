import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ data }) => {
  return (
    <>
      <div className="row">
        <div className="col s12 m4 l2"></div>
        <div className="col s12 m4 l8">
          <ul className="collection">
            {data.map((part, key) => {
              return (
                <li className="collection-item avater" key={key}>
                  <div className="row">
                    <Link key={key} to={`/blog-page/${part.name}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <div className="col s2">
                        <img src="favicon.ico" alt="" className="circle"></img>
                      </div>
                      <div className="col s8 offset-s1">
                        <span className="title" key={key} > {part.title} </span>
                        <p className="truncate">{part.content[0]} </p>
                      </div>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="col s12 m4 l2"></div>
        </div>
      </div>
    </>
  );
};

export default BlogList;