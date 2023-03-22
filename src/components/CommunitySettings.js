import React, { useState } from "react";
import { db, auth } from "../firebase-config";
import "../resources/profilepage.css";
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
import { useNavigate } from "react-router-dom";

function CommunitySettings({ community }) {
    const usersCollectionRef = collection(db, "users");
    const communityCollectionRef = collection(db, "communities");
    const [communityName, setCommunityName] = useState("");
    const [description, setDescription] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [hasSaved, setHasSaved] = useState(false);

    const [adminTable, setAdminTable] = useState();
    const [memberTable, setMemberTable] = useState();

    const [admins, setAdmins] = useState([]);
    const [members, setMembers] = useState([]);
    const [membersShown, setMembersShown] = useState([]);
    const [friends, setFriends] = useState([]);
    
    const navigate = useNavigate();

    React.useEffect(() => {auth.onAuthStateChanged(user => {
        if (user) {    
            getUserList().then(() => {
                makeTable(setAdminTable,friends, "Admins", selectAdmin, deselectAdmin);
                makeTable(setMemberTable,friends, "Community Members", selectMember, deselectMember);
            }
            )
        }   
    })}, []) 

    const getUserList = async () => {
        try {
          const data = await getDocs(usersCollectionRef);
          const users = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const currentUser = users.find(user => user.id === auth.currentUser.uid);

          //console.log(friends);

          currentUser.friends.forEach(friend => {
            const friendName = users.find(user => user.id === friend);
            friends.push({id:friend, name:friendName.username}); 
            });

        } catch (error) {
          console.log(error);
        }
      };

      React.useEffect(() => {
        const newMembers = [];
        members.forEach(member => {
            admins.forEach(admin => {
                if (admin !== member) {
                    newMembers.push(member);
                }
            })
        })

        setMembers(newMembers);

        const newMembersShown = [];
        friends.forEach(member => {
            if (!(admins.some(item => member.id === item))) {
                newMembersShown.push(member);
            }
        })
        
        setMembersShown(newMembersShown);
        makeTable(setMemberTable,newMembersShown, "Community Members", selectMember, deselectMember);
      }
      ,[admins])

      React.useEffect(() => {
        makeTable(setMemberTable,membersShown, "Community Members", selectMember, deselectMember);
      }
      ,[membersShown])  

    function selectAdmin(newMember) {
        const newAdmins = [...admins, newMember];
        setAdmins(newAdmins);
    }

    function deselectAdmin(newMember) {
        const newAdmins = [];
        admins.forEach(admin => {
            if (admin !== newMember) {
                newAdmins = [...newAdmins, admin];
            }
        })
        setAdmins(newAdmins);
    }

    function selectMember(newMember) {
        const newMembers = [];
        members.forEach(member => {
            if (member !== newMember) {
                newMembers = [...newMembers, member];
            }
        })

        setMembers(newMembers);
    }

    function deselectMember(newMember) {
        const newMembers = [];
        members.forEach(member => {
            if (member !== newMember) {
                newMembers = [...newMembers, member];
            }
        })
        setMembers(newMembers);
    }

    const saveChanges = async (e) => {
        // This line ensures that the page is not reloaded: 
        e.preventDefault();
        setHasSaved(false);

        try {
            const data = await getDocs(collection(db, "communities"));
            const communities = data.docs.map((doc) => ({
                community: doc.data(),
                id: doc.id,
              }));
            console.log(communities);

            if (community) {
                if (communityName === '') {
                    setCommunityName(community.community.name);
                }
                if (description === '') {
                    setDescription(community.community.description);
                }
                if (admins.length === 0) {
                    admins.push(auth.currentUser.uid);
                    setAdmins(community.community.admins);
                }
                if (members.length === 0) {
                    setMembers(community.community.members);
                }
                setDoc(doc(db, "communities", community.id), {
                    name:communityName, 
                    description: description,
                    admins: admins,
                    members: members,
                    sharedPosts: []
                });
    
            } else {
                admins.push(auth.currentUser.uid);
                addDoc(communityCollectionRef, {
                    name:communityName, 
                    description: description,
                    admins: admins,
                    members: members,
                    sharedPosts: []
                });
            }
            navigate('/mainpage');
        } 
        catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }

         setErrorMessage("");

     };

    function makeTable(setstate, people, name, selecterFunc, deselectFunc) {
        console.log(people);
        console.log(friends);
        console.log(admins);
        console.log(members);
        setstate(<div>
                <h3> {name}: </h3>
                    <table>
                        <thead>
                            Friends
                        </thead>
                        
                        <tbody>
                            {people.map((person) => (
                                <tr>
                                    <td>
                                        <input type="checkbox" 
                                        onChange={
                                            (e) => {
                                                if (e.target.checked) {
                                                    selecterFunc(person.id);
                                                } else {
                                                    deselectFunc(person.id);
                                                }
                                            }
                                        }>
                                        </input>
                                        {person.name}
                                    </td>
                                </tr>   
                            ))
                            }
                        </tbody>
                    </table>
                </div>);
    }
  
    return (
    <form>
          <div className="main-page">
            {community ? (
                <p className="title"> Community Settings </p>
            ) : (
                <p className="title"> New Community </p>
            )}

            <div>
                <h3> {communityName ? (`Community name: ${communityName} `) : ("No community-name has been chosen")} </h3>
                <input
                  type="Username"
                  id="Username"
                  className="submit-field"
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  placeholder={community ? (community.community.name) : ("Community Name")}
                ></input>
            </div>
            <h3> Description </h3>
            <textarea className="submit-field" 
            placeholder={community ? (community.community.description) : ("Write a community description")} 
            onChange={(e) => {setDescription(e.target.value)}}></textarea>
            <br></br>
            {adminTable}
            {memberTable}
            {(
                community || communityName 
            ) ? (
                <button className="submit saveChanges" onClick={saveChanges}>Create Community</button>
            ) : (
                <button className="submit saveChangesInactive"> Save changes </button>
            )}
                {(errorMessage !== "") && <h3 className="errorMessage">{errorMessage}</h3>}
                {hasSaved && (errorMessage === "") && <h3 className="confirmationMessage"> Your changes have been saved! </h3>}
            </div>
            
        </form>
  );
}

export default CommunitySettings;