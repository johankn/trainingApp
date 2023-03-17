import React, { useState, useEffect } from "react";
import "../resources/createPost.css";
import ChooseProgramCarousel from "../components/ChooseProgramCarousel";
import { useNavigate } from "react-router-dom";
import { auth, db, uploadImg } from "../firebase-config";
import { getDocs, collection, addDoc} from "firebase/firestore";



function CreatePost(){
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const [userPrograms, setUserPrograms] = useState();
    const trainingProgramsCollectionRef = collection(db, "trainingPrograms");
    const [url, setUrl] = useState('');

    
    const postCollectionRef = collection(db, "posts");
    const navigate = useNavigate();
    
    const createNewPost = async () => {
        if (url === '') {
           alert("You must have a image for a post.");
           return;
        }
        addDoc(postCollectionRef, {
            userID: auth.currentUser.uid,
            username: auth.currentUser.displayName,
            image: url,
            title: userPrograms.title,
        });
        navigate("/mainpage");
    };

    const getPrograms = async () => {
        try {
          const data = await getDocs(trainingProgramsCollectionRef);
          const currentUser = auth.currentUser;
          console.log(currentUser.uid);
          const programs = data.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            .filter((program) => program.author.id === currentUser.uid);
          
          setTrainingPrograms(programs);
        } catch (err) {
          console.log(err);
        }
      };
    
    useEffect(() => {
    console.log("Effect called");
    getPrograms();
    }, []);



    return(
        <div>
            <ChooseProgramCarousel
            trainingPrograms={trainingPrograms}
            setUserPrograms={setUserPrograms}
            />
            <input type="file" id="fileInput" onChange={
            (e) => {
                uploadImg(e.target.files[0], auth.currentUser, 'postImages', userPrograms.title, setUrl);
            }}></input>
            <button onClick={createNewPost}>Submit</button>
        </div>
    )
}

export default CreatePost