﻿import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { json } from "../../../../node_modules/react-router-dom/dist/index";

const ManageUser = (props) => {
    const [faqsData, setFaqs] = useState([]);
    const [ProjsData, setProjData] = useState([]);
    const [AddProject, setAddProject] = useState(false);
    const [AddProjectName, setAddProjectName] = useState(false);
    const [AddProjectPrice, setAddProjectPrice] = useState(false);
    const [userId, setUserId] = useState(props.id);
    const [idToEdit, setIdtoEdit] = useState(0);

    const [editProject, setEditproject] = useState(false);
    //
    const handleEdit = (id) => {
        setEditproject(!editProject);
        setIdtoEdit(id);
    }
    //
    const fetchUserData = async () => {

        fetch('https://localhost:7116/ProjectsForTalents/' + props.id).then(res => res.json()).
            then(json => setProjData(json)).
            catch(err => console.error(err));
        console.log(JSON.stringify(ProjsData));

        fetch('https://localhost:7116/Faqs/' + props.id).then(res => res.json()).
            then(json => setFaqs(json)).
            catch(err => console.error(err));
        console.log(JSON.stringify(faqsData));
    }
    //
    const addProject = async (e) => {
        e.preventDefault();

        const post = {
            projectId: 12121,
            UserId: userId,
            ProjectName: AddProjectName,
            ProjectPrice: AddProjectPrice
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
    const postEditProject = async ( e) => {
        e.preventDefault();

        const postToUpdate = {
            projectId: idToEdit,
            UserId: userId,
            ProjectName: AddProjectName,
            ProjectPrice: AddProjectPrice
        }

        axios.put('https://localhost:7116/ProjectsForTalents/' + idToEdit, postToUpdate)
            .then(response => {
                // Handle successful response
                console.log(response.data);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    }
    //
    const DelProject = (projectId) => {
        axios
            .delete('https://localhost:7116/ProjectsForTalents/' + projectId)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }
    //
    let rowsProj = ProjsData.map((p, i) => {
        return (<ul className="list-group">
            <li className="list-group-item">🆎 PROJECT: {p.projectName}
                💳| PRICE: {p.projectPrice} <></>
                <button className="btn btn-success" onClick={() => handleEdit(p.projectId)}>edit</button>

                <button className="btn btn-danger" onClick={() => DelProject(p.projectId)} >delete</button>

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
    const handleAddProject = () => {
        setAddProject(!AddProject);
    }
  

    useEffect(() => {
        fetchUserData();

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
                }<></>
                
                {editProject &&
                    <form onSubmit={postEditProject}                    >
                        <lable>
                            Project New Name
                            <input type="text" onChange={(e) => setAddProjectName(e.target.value)} />
                        </lable>
                        <lable>
                            Project New price
                            <input type="number" onChange={(e) => setAddProjectPrice(e.target.value)} />

                        </lable>
                        <button type="submit">edit</button>
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