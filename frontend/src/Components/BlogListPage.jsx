import React from 'react';
import BlogList from './BlogList';
import data from './data';

const BlogListPage = () => {
  return (
    <>
      <h4 className="center">Blogs</h4>
      <BlogList data={data} />
    </>
  );
};

export default BlogListPage;