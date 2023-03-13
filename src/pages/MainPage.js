import "../resources/mainPage.css";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
  

function MainPage(){

    const [posts, setPosts] = useState([
        {
          userID: 1,
          username: 'Andreas Ander Li',
          image: './hutao.png',
          title: 'Push Pull Legs'
        },
        {
          userID: 2,
          username: 'Johan Knudsen',
          image: './deadlift.png',
          title: 'Treetrunk Legs'
        },
        {
            userID: 3,
            username: 'Andrea Seglem',
            image: './deadlift.png',
            title: 'INSANE 30 MINUTE FULL BODY WORKOUT!'
          },
        {
            userID: 3,
            username: 'Andrea Seglem',
            image: './deadlift.png',
            title: 'INSANE 30 MINUTE FULL BODY WORKOUT!'
          },
          {
            userID: 3,
            username: 'Andrea Seglem',
            image: './deadlift.png',
            title: 'INSANE 30 MINUTE FULL BODY WORKOUT!'
          },
          {
            userID: 3,
            username: 'Andrea Seglem',
            image: './deadlift.png',
            title: 'INSANE 30 MINUTE FULL BODY WORKOUT!'
          },
          {
            userID: 3,
            username: 'Andrea Seglem',
            image: './deadlift.png',
            title: 'INSANE 30 MINUTE FULL BODY WORKOUT!'
          },
      ]);
    
      return (
        <div>
            <div className="create-post-container">
              <p>Your personal Train With Me frontpage. Come here to check in with your favorite communities.</p>
              <button className="create-post-button">Create Post</button>
              <br></br>
              <button className="create-post-button">Create communities</button>
            </div>
          <div className="feed-container">
            {posts.map(post => (
                <div className="post-container" key={post.userID}>
                <div className="post-image">
                    <Link to={`/post/${post.userID}`}>
                    <img src={post.image} alt={post.username} />
                    </Link>
                </div>
                <div className="post-details">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-username">Posted by {post.username}</p>
                </div>
                </div>
            ))}
        </div>
        </div>
      );
}

export default MainPage;