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
      ]);
    
      return (
        <div className="feed-container">
            <h1>Feed</h1>
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
      );
}

export default MainPage;