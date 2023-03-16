import React, { useState, useEffect } from "react";
import "../resources/createPost.css";
import ChooseProgramCarousel from "../components/ChooseProgramCarousel";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { getDocs, collection, addDoc} from "firebase/firestore";



function CreatePost(){
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const [userPrograms, setUserPrograms] = useState();
    const trainingProgramsCollectionRef = collection(db, "trainingPrograms");

    
    const postCollectionRef = collection(db, "posts");
    const navigate = useNavigate();
    
    const createNewPost = async () => {
        // if (image === "") {
        //   alert("You must have a image for a post.");
        //   return;
        // }
        addDoc(postCollectionRef, {
            userID: auth.currentUser.uid,
            username: auth.currentUser.displayName,
            image: './deadlift.png',
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
            <button onClick={createNewPost}>Submit</button>
        </div>
    )
}

export default CreatePost