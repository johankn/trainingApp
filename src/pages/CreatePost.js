import React, { useState, useEffect } from "react";
import "../resources/createPost.css";
import ChooseProgramCarousel from "../components/ChooseProgramCarousel";
import DisplayPrograms from "../components/DisplayPrograms";
import { useNavigate } from "react-router-dom";
import { auth, db, uploadImg } from "../firebase-config";
import { getDocs, collection, addDoc, doc, setDoc} from "firebase/firestore";



function CreatePost(){
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const [userPrograms, setUserPrograms] = useState();
    const trainingProgramsCollectionRef = collection(db, "trainingPrograms");
    const [url, setUrl] = useState('');

    const communityCollectionRef = collection(db, "communities");
    const [communities, setCommunities] = useState([]);
    const [chosenComunities, setChosenComunities] = useState([]);

    const [communityTable, setCommunityTable] = useState();
    
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
            // adds the whole userprogram because DisplayPrograms.js takes this as the parameter
            program: userPrograms
        })
        .then(docRef => {
            console.log(docRef.id); //p4eZcO5QV43IYnigxALJ
            console.log(chosenComunities);
            communities.forEach(currentCommunity => {
                chosenComunities.forEach(chosenCommunity => {
                    if (chosenCommunity === currentCommunity.id) {
                        if (!(currentCommunity.community.sharedPosts.includes(docRef.id))) {
                            currentCommunity.community.sharedPosts.push(docRef.id)
                            setDoc(
                                doc(db, 'communities', currentCommunity.id),
                                currentCommunity.community
                            );
                        }   
                    } 
                });
            });
            
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

    React.useEffect( () => {auth.onAuthStateChanged(user => {
        if (user) {
            getUserList();        
        }   
    })}, []) 

    React.useEffect(() => {
        makeTable(setCommunityTable, communities, "Who shall see this post?", selectFunction, deselectFunction);
    }, [communities])

    function selectFunction(community){
        setChosenComunities([...chosenComunities, community]);
    }

    function deselectFunction(community){
        console.log(chosenComunities);
        const newCommunities = [];
        chosenComunities.forEach(currentCommunity => {
            if (currentCommunity.id !== community.id) {
                newCommunities = [...newCommunities, currentCommunity];
            }
        })
        setChosenComunities(newCommunities);
        
    }

    React.useEffect(() => {
        console.log(chosenComunities);
    },[chosenComunities])

    const getUserList = async () => {
        try {
            const data = await getDocs(communityCollectionRef);
            const userCommunities = data.docs.map((doc) => ({
                community: doc.data(),
                id: doc.id,
              }));
    
            //   console.log(userCommunities[0].community);
                
            const currentUserCommunities = [];

              userCommunities.forEach((doc) => {
                if (doc.community.members.includes(auth.currentUser.uid) || doc.community.admins.includes(auth.currentUser.uid)) {
                    currentUserCommunities.push(doc);
                }}
            );
              
            setCommunities(currentUserCommunities);
    
        } catch (error) {
          console.log(error);
        }
      }; 

      function makeTable(setstate, communities, name, selecterFunc, deselectFunc) {
        setstate(<div>
                <h3> {name}: </h3>
                    <table>
                        <thead>
                            Groups:
                        </thead>
                        
                        <tbody>
                            {communities.map((community) => (
                                <tr>
                                    <td>
                                        <input type="checkbox" 
                                        onChange={
                                            (e) => {
                                                if (e.target.checked) {
                                                    selecterFunc(community.id);
                                                } else {
                                                    deselectFunc(community.id);
                                                }
                                            }
                                        }>
                                        </input>
                                        {community.community.name}
                                    </td>
                                </tr>   
                            ))
                            }
                        </tbody>
                    </table>
                </div>);
    }

    return(
        <div>
            <ChooseProgramCarousel
            trainingPrograms={trainingPrograms}
            setUserPrograms={setUserPrograms}
            onClick={console.log(userPrograms)}
            />
            {userPrograms ? (            
            <DisplayPrograms userPrograms={userPrograms} />
              ) : (
                <h2>No program has been selected yet</h2>
              )}
            <input type="file" id="fileInput" onChange={
            (e) => {
                uploadImg(e.target.files[0], auth.currentUser, 'postImages', userPrograms.title, setUrl);
            }}></input>
            {communityTable}
            <button onClick={createNewPost}>Submit</button>
        </div>
    )
}

export default CreatePost