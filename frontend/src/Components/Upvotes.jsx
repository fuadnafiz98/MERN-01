import React from 'react';

/**
 * here we make a post request to /api/blog/.. just post request to increase 
 * the upvote 
 * we get a json response to the total number of upvotes
 * we send it to setBlog with is upper of this component
 * each time we click the button we call the fetch ... increase ... get json ... return json
 */
const Upvotes = ({ blogName, upvotes, setBlogInfo}) => {
  const up = async () => { 
    const result = await fetch(`/api/blogs/${blogName}/upvote`, {
      method: 'post',
    });
    const body = await result.json();
    setBlogInfo(body);
  }

  return (
    <div> 
      <button className="btn-floating btn-large waves-effect waves-light red" onClick={() => up()}></button>
      <h5>This Blog has {upvotes} upvotes!</h5>
    </div>
  );
}


export default Upvotes;