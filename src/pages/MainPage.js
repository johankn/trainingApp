import "../resources/mainPage.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { auth, db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function MainPage(){
    const navigate = useNavigate();
    const postCollectionRef = collection(db, "posts");
    const [posts, setPosts] = useState([]);

      const getPosts = async () => {
        try {
          const data = await getDocs(postCollectionRef);
          const currentUser = auth.currentUser;
          console.log(currentUser.uid);
          const posts = data.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))          
            setPosts(posts);
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        console.log("Effect called");
        getPosts();
      }, []);

      function toCreatePost(){
        navigate("/createpost");
      }
    
      return (
        <div>
            <div className="create-post-container">
              <p>Your personal Train With Me frontpage. Come here to check in with your friends.</p>
              <button className="create-post-button" onClick={toCreatePost}>Create Post</button>
              <br></br>
              <button className="create-post-button">Create communities</button>
            </div>
          <div className="feed-container">
            {posts.map(post => (
                <div className="post-container" key={post.userID}>
                <div className="post-image">
                    <Link to={`/post/${post.userID}`}>
                    <img src={post.image} alt={post.username}/>
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