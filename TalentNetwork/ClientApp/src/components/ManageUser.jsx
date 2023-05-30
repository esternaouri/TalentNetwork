import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { json } from "../../../../node_modules/react-router-dom/dist/index";

const ManageUser = (props) =>
{
    const [faqsData, setFaqs] = useState([]);
    const [ProjsData, setProjData] = useState([]);
    const [AddProject, setAddProject] = useState(false);
    const [AddProjectName, setAddProjectName] = useState(false);
    const [AddProjectPrice, setAddProjectPrice] = useState(false);
    const [randomId, setRandomId] = useState(uuidv4());
     const [userId, setUserId] = useState(props.id);
    const [fetchUser, setFetchedUser] = useState([]);
    //
    const fetchUserData = async () => {
    
            fetch('https://localhost:7116/ProjectsForTalents/' + props.id).then(res => res.json()).
                then(json => setProjData( json)).
            catch(err => console.error(err));
            console.log(JSON.stringify(ProjsData));

            fetch('https://localhost:7116/Faqs/' + props.id).then(res => res.json()).
                then(json => setFaqs(json)).
                catch(err => console.error(err));
            console.log(JSON.stringify(faqsData));
    }
    //
    const addProject = async (e) =>
    {
        e.preventDefault();

        const post = {
            ProjectId: 85,
            UserId: 1,
            ProjectName: "dan",
            ProjectPrice: 12
        }

        fetch('https://localhost:7116/ProjectsForTalents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle the response
            })
            .catch((error) => {
                console.error(error);
                // Handle the error
            });
    }
    //
    //const GetUser = async (e) => {
       // axios.get('https://localhost:7116/USERS/1' )
           // .then((response) => {
         //       setFetchedUser(response.data);
       //         setFetchedUser(response.data);
     //       });
    //}
    //useEffect(() => {
       // GetUser()
    //}, [])
   // console.log("heell" + AddProjectName);
    // 
    const editProject = async () => { }
    //
    const DelProject = async () => { }
    //
    let rowsProj = ProjsData.map((p, i) => {
        return (<ul className="list-group">
            <li className= "list-group-item">🆎 PROJECT: {p.projectName}
                💳| PRICE: {p.projectPrice} <></>
                <button className="btn btn-success">edit</button>
                <button className="btn btn-danger">delete</button>

                </li>
            </ul>);
        });
    //
    let rowsFaqs = faqsData.map((p, i) => {
            return (<ul>
                <li className="list-group-item">🆎 Q: {p.question}
                    💳| A: {p.answer}
                    <button className="btn btn-success">edit</button>
                    <button className="btn btn-danger">delete</button>

                </li>
            </ul>);
        });
    //
    const handleAddProject = () =>
    {
        setAddProject(!AddProject);
    }

    const toRandomId = () => {
        setRandomId(uuidv4() + 545484);
    }
    console.log("helo props + " + userId)
    useEffect(() => {
        fetchUserData();
        toRandomId();
        //GetUser()

    }, [])

    return (

        <div>
            <div className="alert alert-info">
                <h5 class="card-title">Project</h5>
           
                <button className="btn btn-primary" onClick={handleAddProject}>new project</button> 
                {AddProject &&
                    <form onSubmit={addProject}                    >
                        <lable>
                            Project Name
                            <input type="text" onChange={(e) => setAddProjectName(e.target.value)} />
                        </lable>
                        <lable>
                            Project price
                            <input type="number" onChange={(e) => setAddProjectPrice(e.target.value)} />

                        </lable>
                        <button type="submit">add</button>
                    </form>
                }
                <ul className="list-group-item">{rowsProj}</ul>


                <h5 class="card-title">Faq</h5>
                <button className="btn btn-primary">add</button>
                <ul className="list-group-item" >{rowsFaqs}</ul>


            </div>
        </div>

    );
};

export default ManageUser;