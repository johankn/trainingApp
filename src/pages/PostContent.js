import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import DisplayPrograms from "../components/DisplayPrograms";

function PostContent() {
// this gets the documentID from firebase
  const { postId } = useParams();
  const [postContent, setPostContent] = useState(null);

  const fetchPost = async () => {
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      setPostContent(postDoc.data());
    }
  };

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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostContent;
