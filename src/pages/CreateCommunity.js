import CommunitySettings from "../components/CommunitySettings";
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

function CreateCommunity(selectedCommunity) {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const friendRequestsCollectionRef = collection(db, "friendRequests");
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

    return (
        <CommunitySettings />
    );
}

export default CreateCommunity;
