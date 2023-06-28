import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { json } from "../../../../node_modules/react-router-dom/dist/index";
import { useNavigate } from "react-router-dom";

const ManageUser = (props) => {
    let navigate = useNavigate();

    const [faqsData, setFaqs] = useState([]);
    const [ProjsData, setProjData] = useState([]);
    const [AddProject, setAddProject] = useState(false);
    const [AddProjectName, setAddProjectName] = useState(false);
    const [AddProjectPrice, setAddProjectPrice] = useState(false);
    const [userId, setUserId] = useState(props.id);
    const [idToEdit, setIdtoEdit] = useState(0);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [firstInfo, setFirstInfo] = useState(false);
    const [city, setCity] = useState("");
    const [talent, setTalent] = useState("");
    const [phone, setPhone] = useState("");

    const [addFaq, setAddFaq] = useState(false);
    const [qestion, setquestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [editFaq, setEditFaq] = useState(false);


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
            
            .then((data) => {
                alert("Done");
                setAddProject(false);
                fetchUserData();

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
                setEditproject(!editProject);
                fetchUserData();

                alert("Saved");
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
                alert("Saved");
                fetchUserData();

                console.log(res);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }
    //
    const addFaqHandle = (e) =>
    {
        e.preventDefault();

        const post = {
            projectId: 12121,
            UserId: userId,
            Question: qestion,
            Answer: answer
        }

        fetch('https://localhost:7116/Faqs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then((data) => {
                alert("Saved");
                setAddFaq(false);
                fetchUserData();
                // Handle the response
            })
            .catch((error) => {
                console.error(error);
                // Handle the error
            });
    }
    //
    const delFaq = (FaqId) =>
    {

        axios
            .delete('https://localhost:7116/Faqs/' + FaqId)
            .then((res) => {
                alert("OK");
                fetchUserData();

                console.log(res);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }
    //
    const editFaqHandleSub = (e) =>
    {

        e.preventDefault();
        setEditFaq(!editFaq)
        const post = {
            FaqId: idToEdit,
            UserId: userId,
            Question: qestion,
            Answer: answer
        }

        axios.put('https://localhost:7116/Faqs/' + idToEdit, post)
            .then(response => {
                alert("Saved");
                fetchUserData();

                console.log(response.data);
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    }
    //
    const editFaqs = (id) =>
    {
        setEditFaq(!editFaq);
        setIdtoEdit(id);
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
                <button className="btn btn-success" onClick={() => editFaqs(p.faqId)}>edit</button>
                <button className="btn btn-danger" onClick={() => delFaq(p.faqId)}>delete</button>

            </li>
        </ul>);
    });
    //
    const handleAddProject = () => {
        setAddProject(!AddProject);
    }
    //
    const handleAddFaq = () => {
        setAddFaq(!addFaq);
    }
    //
    async function saveImage(e) {
        e.preventDefault();
        {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("image", image);
            try {
                const response = await axios({
                    method: "post",
                    url: 'https://localhost:7116/TalentUsers/Image',
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Saved");

            } catch (error) {
                alert(error);
            }

        }
    }
    //
    const basicInfo = async (e) =>
    {
        e.preventDefault();
        const post = {
            Talent: talent,
            ContactPhone: phone,
            City: city,
            UserId: userId

        }

        try {
            const res = await axios.put('https://localhost:7116/TalentUsers/' + userId, post)
            console.log(res.data)
            alert("ok");
            setFirstInfo(false);


        } catch (e) {
            alert(e)
        }
    }  
    useEffect(() => {
        // Fetch the image data from the API endpoint
        fetch('https://localhost:7116/TalentUsers/Image/' + userId)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary URL for the image data
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            });

        // Clean up the URL when the component unmounts
        return () => URL.revokeObjectURL(imageUrl);
    }, [userId]);
    //

    useEffect(() => {
        fetchUserData();

    }, [])


    return (

        <div>
            <div >
                <h5 class="card-title">Project</h5>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={() => setFirstInfo(true)}>Edit First Info </button>
                    </div>
                {firstInfo &&

                    <form onSubmit={(e)=>basicInfo(e) }>
                        <label>
                            Talent:
                            <input type="text" onChange={(e) => setTalent(e.target.value)} />
                        </label>
                        <label>
                            City:
                            <input type="text" onChange={(e) => setCity(e.target.value)} />
                        </label> <label>
                            Phone:
                            <input type="number" onChange={(e) => setPhone(e.target.value)} />
                        </label>

                        <button type="submit">edit!</button>

                    </form>}<hr></hr>
                    
                <button className="btn btn-primary" onClick={handleAddProject}>new project</button>
                {AddProject &&
                    <form onSubmit={(e)=>addProject(e)} >
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
                <button className="btn btn-primary" onClick={handleAddFaq}>  New Faq</button>
                {addFaq &&
                    <form onSubmit={addFaqHandle} >
                        <lable>
                            Question
                            <input type="text" onChange={(e) => setquestion(e.target.value)} />
                        </lable>
                        <lable>
                            Answer
                            <input type="text" onChange={(e) => setAnswer(e.target.value)} />

                        </lable>
                        <button type="submit">add</button>
                    </form>
                }<></>
                {editFaq &&
                    <form onSubmit={editFaqHandleSub}>
                        <lable>
                            Faq New Qeustion
                            <input type="text" onChange={(e) => setquestion(e.target.value)} />
                        </lable>
                        <lable>
                            faq New Answer
                            <input type="text" onChange={(e) => setAnswer(e.target.value)} />

                        </lable>
                        <button type="submit">edit</button>
                    </form>
                } 
                <ul className="list-group-item" >{rowsFaqs}</ul>
            </div>


            <div className="form-group">
                <label className="form-label">Profile Image</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit" onClick={saveImage}>Save Image</button>
                <img style={{ height: "100px"} } src={imageUrl} alt="Image" />

            </div>
        </div>

    );
};

export default ManageUser;