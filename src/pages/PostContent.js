import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useState, useEffect } from "react";
import DisplayPrograms from "../components/DisplayPrograms";
import "../resources/filipsTechnicalDebt.css";
import { useNavigate } from "react-router-dom";

function PostContent() {
// this gets the documentID from firebase
  const { postId } = useParams();
  const [postContent, setPostContent] = useState(null);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      setPostContent(postDoc.data());
    }
  };

  function copyDoc() {
    postContent.program.author.id = auth.currentUser.uid;
    postContent.program.author.name = auth.currentUser.displayName;
    addDoc(collection(db, 'trainingPrograms'), postContent.program);
    navigate("/ViewPrograms");
  }

  useEffect(() => {
    console.log("Effect called");
    fetchPost();
    console.log(postId);
  }, [postId]);

  return (
    <div>
      {postContent ? (
        <div>
          <DisplayPrograms userPrograms={postContent.program} />
          <div className="main-page"> 
            <button className="training-submit" onClick={copyDoc}>Copy training program</button>
          </div>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostContent;
