import React, { useState } from 'react';

const AddCommentForm = ({ blogName, setBlogInfo }) => { 
  const [username, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');

  const addComment = async () => { 
    const result = await fetch(`/api/blogs/${blogName}/add-comment`, {
      method: 'post',
      body: JSON.stringify({ username, comment: commentText }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const body = await result.json();
    setBlogInfo(body);
    setUserName('');
    setCommentText('');
  }

  return (
    <div>
      <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea"
                value={username}
                onChange={(event) => { setUserName(event.target.value)}}
              />
            <label htmlFor="textarea1">UserName</label>
          </div>
          </div>
        <div className="row">
          <div className="input-field col s12">
              <textarea id="textarea2" className="materialize-textarea"
                value={commentText}
                onChange={(event) => { setCommentText(event.target.value)}}
              />
            <label htmlFor="textarea2">Textarea</label>
          </div>
          </div>
          <button className="waves-effect waves-light btn-small" onClick={() => addComment() }>Add Comment</button>
      </form>
    </div>
  </div>
  );
  
}

export default AddCommentForm;