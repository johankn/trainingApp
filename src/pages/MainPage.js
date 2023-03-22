import "../resources/mainPage.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChooseCommunityCarousel from "../components/ChooseCommunityCarousel";

function MainPage( props) {
    const friendRequestsCollectionRef = collection(db, "friendRequests");
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);
  const communityCollectionRef = collection(db, "communities");
  const [communities, setCommunities] = useState([]);
  const [chosenComunity, setChosenComunity] = useState();

  const [shownPosts, setShownPosts] = useState();
  const [friends, setFriends] = useState([]);

  const [hasLoaded, setSasLoaded] = useState(false);

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

  const getFriends = async () => {
    try {
        console.log('hello');
        const data = await getDocs(collection(db, 'users'));
        const users = data.docs.map((doc) => ({
            user: doc.data(),
            id: doc.id,
          }));

          setFriends(users.find(user => user.id === auth.currentUser.uid).user.friends);
          
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {auth.onAuthStateChanged(user => {
    if (user) {    
        getUserList();
        getFriends();
        setSasLoaded(true);
    }   
    })}, []) 

    function editCommunity() {
        props.setSelectedCommunity(chosenComunity);
        navigate("/CreateCommunity");
    }

    React.useEffect(() => {
        if (chosenComunity) {
            getCommunityPosts();
        }
        
    }, [chosenComunity])

    const getCommunityPosts = async () => {
        try {
          const data = await getDocs(postCollectionRef);
          const posts = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const communityPosts = [];
          posts.forEach((post) => {
            if (chosenComunity.community.sharedPosts.includes(post.id)) {
                communityPosts.push(post);
            }
        }
        );
        setPosts(communityPosts);
        } catch (err) {
          console.log(err);
        }
      };

      const handleSendFriendRequest = async (userId) => {
        try {
          // Check if a friend request has already been sent
          const existingRequestQuery = query(
            friendRequestsCollectionRef,
            where("senderId", "==", auth.currentUser.uid),
            where("receiverId", "==", userId)
          );
          const existingRequest = await getDocs(existingRequestQuery);
          if (!existingRequest.empty) {
            window.alert("Friend request already sent");
            return;
          }
    
          // Create a new friend request document
          const newRequest = {
            senderId: auth.currentUser.uid,
            receiverId: userId,
            status: "requested",
          };
          await addDoc(friendRequestsCollectionRef, newRequest);
          window.alert("Friend request sent!")
        } catch (error) {
          console.log(error);
        }
      };

    React.useEffect(() => {
        setShownPosts(
            posts.map((post) => (
                <div className="post-container" key={post.id}>
                  <div className="post-image">
                    <Link to={`/post/${post.id}`}>
                      <img src={post.image} alt={post.username} />
                    </Link>
                  </div>
                  <div className="post-details">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-user">Posted by {post.username}</p>
                    {((post.program.author.id !== auth.currentUser.uid) && hasLoaded && (!friends.includes(post.program.author.id))) ?
                        (<button className="post-user" onClick={() => handleSendFriendRequest(post.program.author.id)}>
                            Add {post.username} as a friend 
                        </button>) 
                        :
                        (<br></br>)}
                  </div>
                </div>
            ))
        );
    }, [posts])


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
            {(chosenComunity.community.admins.includes(auth.currentUser.uid)) && 
            <button className="create-post-button" onClick={editCommunity}> Community settings </button>}
        </div>
        ) : (
            <br></br>
        )}
        
      </div>
      <div className="feed-container">
        {<ChooseCommunityCarousel communities={communities} setUserCommunity={setChosenComunity} />}
        {shownPosts}
      </div>
    </div>
  );
}

export default MainPage;