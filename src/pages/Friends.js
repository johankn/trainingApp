import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import {
  getDocs,
  collection,
  deleteDoc,
  getDoc,
  updateDoc,
  doc,
  setDoc,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import "../resources/friends.css";

function Friends() {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const friendRequestsCollectionRef = collection(db, "friendRequests");
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  


  const getUserList = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const currentUser = users.find(user => user.id === auth.currentUser.uid);
      const otherUsers = users.filter(user => user.id !== auth.currentUser.uid);
      setUsers(otherUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const getFriendRequests = async () => {
    try {
      const data = await getDocs(
        query(
          friendRequestsCollectionRef,
          where("receiverId", "==", auth.currentUser.uid)
        )
      );
      const requests = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFriendRequests(requests);
    } catch (error) {
      console.log(error);
    }
  };

  const getSentFriendRequests = async () => {
    try {
      const data = await getDocs(
        query(
          friendRequestsCollectionRef,
          where("senderId", "==", auth.currentUser.uid)
        )
      );
      const requests = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSentFriendRequests(requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        getUserList();
        getFriendRequests();
        getSentFriendRequests();
      }
    });
    return unsubscribe;
  }, []);

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
        console.log("Friend request already sent");
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

  const renderFriendRequest = (request) => {
    const sender = users.find((user) => user.id === request.senderId);
    const senderName = sender ? sender.username : "Unknown User";
    
    return (
      <div className="friend-requests-container" key={request.id}>
       <p> {senderName} wants to be friends. Status:{" "}
                  {request.status}</p>
                {request.status === "requested" && (
                  <div>
                    <button className="friend-response-button" onClick={() => handleAcceptFriendRequest(request.id, request.senderId)}>
                      Accept
                    </button>
                    <button className="friend-response-button" onClick={() => handleDeclineFriendRequest(request.id)}>
                      Decline
                    </button>
                  </div>
                )}

      </div>
    );
  };

  const handleAcceptFriendRequest = async (requestId, senderId) => {
    try {
      // Update the friend request document
      const requestDocRef = doc(friendRequestsCollectionRef, requestId);
      await updateDoc(requestDocRef, { status: "accepted" });
  
      // Add each user's id to the other's friends array in the users collection
      const userDocRef = doc(usersCollectionRef, auth.currentUser.uid);
      const userData = (await getDoc(userDocRef)).data();
      const friendIds = userData.friends ? [...userData.friends, senderId] : [senderId];
      await setDoc(userDocRef, { friends: friendIds }, { merge: true });
  
      const senderDocRef = doc(usersCollectionRef, senderId);
      const senderData = (await getDoc(senderDocRef)).data();
      const senderFriendIds = senderData.friends ? [...senderData.friends, auth.currentUser.uid] : [auth.currentUser.uid];
      await setDoc(senderDocRef, { friends: senderFriendIds }, { merge: true });
  
      window.location.reload();
  
    } catch (error) {
      console.log(error);
    }
  };
  


  const handleDeclineFriendRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, "friendRequests", requestId));
      setFriendRequests((prevState) =>
        prevState.filter((request) => request.id !== requestId)
      );
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  const renderUser = (user) => {
    const isRequested = friendRequests.some(
      (request) =>
        request.senderId === auth.currentUser.uid &&
        request.receiverId === user.id &&
        request.status === "requested"
    );
    const isPending = friendRequests.some(
      (request) =>
        request.senderId === user.id &&
        request.receiverId === auth.currentUser.uid &&
        request.status === "requested"
    );
    const isFriend = user.friends && user.friends.includes(auth.currentUser.uid);
    return (
      <div key={user.id}>
        <a>{user.username}</a>
        {isFriend ? (
          <span> Already friends</span>
        ) : isRequested ? (
          <span> Friend request sent</span>
        ) : isPending ? (
          <span> Friend request pending</span>
        ) : (
          <button className="add-friend-button" onClick={() => handleSendFriendRequest(user.id)}>
            Add Friend
          </button>
        )}
      </div>
    );
  };
  
  

  const filteredUsers = users.filter((user) =>
    user &&
    user.username &&
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="friends-main-page">
        <input
          className="friends-searchbar"
          type="text"
          placeholder="Search username"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm.length > 0 && (
          <div>
            {filteredUsers.map((user) => (
              renderUser(user)
            ))}
          </div>
        )}
    
        {friendRequests.length > 0 && (
          <div>
            <h2>Friend Requests</h2>
            {friendRequests.map((request) => (
              <div key={request.id}>
                <p>
                  {renderFriendRequest(request)} 
                  </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default Friends;
