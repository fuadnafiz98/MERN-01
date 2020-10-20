import React, { useState, useEffect } from 'react';

import data from './data';

import AddCommentForm from './AddCommentsForm';
import BlogList from './BlogList';
import CommentsList from './CommentsList';
import NotFound from './404';
import Upvotes from './Upvotes';

const BlogPage = ({ match }) => {
  const name = match.params.name;
  const blog = data.find(blog => blog.name === name);
  const otherBlogs = data.filter(blog => blog.name !== name);
  
  const [blogInfo, setBlogInfo] = useState({ upvotes: 0, comments: []});
  // the third bracket indicates that if the elements of the array change then and only then change the state or 
  // call the useEffect 
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/blogs/${name}`);
      const body = await result.json();
      setBlogInfo(body);
    };
    fetchData();
  }, [name]);

  // eslint-disable-next-line
  if (!blog) return <NotFound />;
  
  return (
    <>
    <div className="row">
      <div className="col s12 m4 l2"></div>
      <div className="col s12 m4 l8">
          <h4>{blog.title}</h4>
          <Upvotes blogName={name} upvotes={blogInfo.upvotes} setBlogInfo= {setBlogInfo} />
          {
          blog.content.map((part, key) => { 
              return <p key={key}>{part}</p>
          })
        }
      <div className="col s12 m4 l2"></div>
      <CommentsList comments={blogInfo.comments} />
      <AddCommentForm blogName={name} setBlogInfo={setBlogInfo}/>
      <h4>Other Articles: </h4>
      </div>
      </div>
      <BlogList data={otherBlogs}/>
    </>
  );
};

export default BlogPage;