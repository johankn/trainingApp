import "../resources/mainPage.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChooseCommunityCarousel from "../components/ChooseCommunityCarousel";

function MainPage() {
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);
  const communityCollectionRef = collection(db, "communities");
  const [communities, setCommunities] = useState([]);
  const [chosenComunity, setChosenComunity] = useState();

  const getPosts = async () => {
    try {
      const data = await getDocs(postCollectionRef);
      const posts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Effect called");
    getPosts();
  }, []);

  function toCreatePost() {
    navigate("/createpost");
  }

  function toCreateCommunity() {
    navigate("/CreateCommunity");
  }

  React.useEffect( () => {auth.onAuthStateChanged(user => {
    if (user) {    
        getUserList();
        console.log(communities);
        
    }   
    })}, []) 

    // React.useEffect(() => {
    //     const data = getDocs(postCollectionRef);
    //     const posts = data.docs.map((doc) => ({
    //         ...doc.data(),
    //         id: doc.id,
    //       }));

    //       const newPosts = posts.find(post => chosenComunity.community.sharedPosts.includes(post.id));
    //       setPosts(newPosts);
    // }, [chosenComunity])

  const getUserList = async () => {
    try {
        const data = await getDocs(communityCollectionRef);
        const userCommunities = data.docs.map((doc) => ({
            community: doc.data(),
            id: doc.id,
          }));

        //   console.log(userCommunities[0].community);

          userCommunities.forEach((doc) => {
            if (doc.community.members.includes(auth.currentUser.uid) || doc.community.admins.includes(auth.currentUser.uid)) {
                communities.push(doc);
            }}
        );
          


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="create-post-container">
        <p>
          Your personal Train With Me frontpage. Come here to check in with your
          friends.
        </p>
        <button className="create-post-button" onClick={toCreatePost}>
          Create Post
        </button>
        <br></br>
        <button className="create-post-button" onClick={toCreateCommunity}>Create communities</button>
        {chosenComunity ? (
        <div>
        <h4>
            {chosenComunity.community.name}
        </h4>
        <p>
            {chosenComunity.community.description}
        </p>
        </div>
        ) : (
            <br></br>
        )}
        
      </div>
      <div className="feed-container">
        {<ChooseCommunityCarousel communities={communities} setUserCommunity={setChosenComunity} />}
        {posts.map((post) => (
          <div className="post-container" key={post.id}>
            <div className="post-image">
              <Link to={`/post/${post.id}`}>
                <img src={post.image} alt={post.username} />
              </Link>
            </div>
            <div className="post-details">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-user">Posted by {post.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;