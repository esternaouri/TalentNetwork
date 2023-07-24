import { useEffect, useState } from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

const ManageUser = (props) => {

    //users data arrys including faqs and projects
    const [faqsData, setFaqs] = useState([]);
    const [ProjsData, setProjData] = useState([]);
    const [UserData, setUserData] = useState([]);

    //boleans for adding/updating any data 
    const [AddProject, setAddProject] = useState(false);
    const [AddProjectName, setAddProjectName] = useState(false);
    const [AddProjectPrice, setAddProjectPrice] = useState(false);
    const [addFaq, setAddFaq] = useState(false);
    const [editFaq, setEditFaq] = useState(false);
    const [editProject, setEditproject] = useState(false);
    //cureent user
    const [userId, setUserId] = useState(props.id);
    const [idToEdit, setIdtoEdit] = useState(0);
    //manging profile image
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    //managing first info of the user
    const [firstInfo, setFirstInfo] = useState(false);
    const [city, setCity] = useState("");
    const [talent, setTalent] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    //manging faq crud
    const [qestion, setquestion] = useState("");
    const [answer, setAnswer] = useState("");


    

    //------------------------------------------ --------------------------------------------------------------------------------------------//
    //------------------------------------------ manging Projects---------------------------------------------------------------------------//
    //------------------------------------------ -------------------------------------------------------------------------------------------//
    let rowsProj = ProjsData.map((p, i) => {
        return (

            <tr key={"p_data" + i} >
                <td> {p.projectName}</td>
                <td> {p.projectPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}</td>
                <td> <button className="btn btn-success" onClick={() => handleEdit(p.projectId)}>🖊️</button></td>

                <td>   <button className="btn btn-danger" onClick={() => DelProject(p.projectId)} >🗑️</button></td>
            </tr>

        );
    });
    const addProject = async (e) => {
        e.preventDefault();

        const post = {
            projectId: 12121,
            UserId: userId,
            ProjectName: AddProjectName,
            ProjectPrice: AddProjectPrice
        }

        fetch(`${REACT_APP_API_URL}/ProjectsForTalents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

            .then((data) => {
                if (!(data.status == 400)) {
                    alert("Done");
                    setAddProject(false);
                    fetchUserData();

                }
                else { alert("Title Not Okay-Must Be Less Than 10 Characters") }

            })
            .catch((error) => {
                throw new Error('TITLE LENGTH NOT OKAY');
                alert("not okay ")
            });
    }
    const postEditProject = async (e) => {
        e.preventDefault();

        const postToUpdate = {
            projectId: idToEdit,
            UserId: userId,
            ProjectName: AddProjectName,
            ProjectPrice: AddProjectPrice
        }

        axios.put(`${REACT_APP_API_URL}/ProjectsForTalents/` + idToEdit, postToUpdate)
            .then(response => {
                setEditproject(!editProject);
                fetchUserData();

                alert("Saved");
            })
            .catch(error => {
                alert("Title Not Okay-Must Be Less Than 10 Characters")
            });
    }
    const DelProject = (projectId) => {
        axios
            .delete(`${REACT_APP_API_URL}/ProjectsForTalents/` + projectId)
            .then((res) => {
                alert("Saved");
                fetchUserData();

            })
            .catch((err) => {
                alert(err.message);
            });

    }
    const handleAddProject = () => {
        setAddProject(!AddProject);
    }
    const handleEdit = (id) => {
        setEditproject(!editProject);
        setIdtoEdit(id);
    }

    //------------------------------------------ --------------------------------------------------------------------------------------------//
    //------------------------------------------ manging Faqs------------------------------------------------------------------------------//
    //------------------------------------------ -------------------------------------------------------------------------------------------//
    const handleAddFaq = () => {
        setAddFaq(!addFaq);
    }
    let rowsFaqs = faqsData.map((p, i) => {
        return (<tr key={"f_data" + i}>
            <td> {p.question}</td>
            <td>{p.answer}</td>
            <td>  <button className="btn btn-success" onClick={() => editFaqs(p.faqId)}>🖊️</button></td>
            <td><button className="btn btn-danger" onClick={() => delFaq(p.faqId)}>🗑️</button></td>


        </tr>);
    });
    const editFaqs = (id) => {
        setEditFaq(!editFaq);
        setIdtoEdit(id);
    }
    const delFaq = (FaqId) => {

        axios
            .delete(`${REACT_APP_API_URL}/Faqs/` + FaqId)
            .then((res) => {
                alert("OK");
                fetchUserData();


            })
            .catch((err) => {
            });

    }
    const editFaqHandleSub = (e) => {

        e.preventDefault();
        setEditFaq(!editFaq)
        const post = {
            FaqId: idToEdit,
            UserId: userId,
            Question: qestion,
            Answer: answer
        }

        axios.put(`${REACT_APP_API_URL}/Faqs/` + idToEdit, post)
            .then(response => {
                alert("Saved");
                fetchUserData();

            })
            .catch(error => {
            });
    }
    const addFaqHandle = (e) => {
        e.preventDefault();

        const post = {
            projectId: 12121,
            UserId: userId,
            Question: qestion,
            Answer: answer
        }

        fetch(`${REACT_APP_API_URL}/Faqs`, {
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


    //------------------------------------------ --------------------------------------------------------------------------------------------//
    //------------------------------------------ manging image------------------------------------------------------------------------------//
    //------------------------------------------ -------------------------------------------------------------------------------------------//
    async function saveImage(e) {
        e.preventDefault();
        {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("image", image);
            try {
                const response = await axios({
                    method: "post",
                    url: `${REACT_APP_API_URL}/TalentUsers/Image`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Saved");
                fetchUserData();


            } catch (error) {
                alert(error + " First Add Basic Info");
            }

        }
    }
    //------------------------------------------ -------------------------------------------------------------------------------------------//
    //------------------------------------------ basic information-------------------------------------------------------------------------//
    //------------------------------------------ -----------------------------------------------------------------------------------------//

    const basicInfo = async (e) => {
        e.preventDefault();
        
        const post = {
            Talent: talent,
            ContactPhone: phone,
            City: city,
            UserId: userId,
            Email:email

        }

        try {
            const res = await axios.put(`${REACT_APP_API_URL}/TalentUsers/` + userId, post)
            alert("ok");
            fetchUserData();

            setFirstInfo(false);


        } catch (e) {
            alert("enter all parameters")
        }
    }
    //
    const h = (talent, city, phone, email, name) =>
    {
        setEmail(email);
        setPhone(phone);
        setTalent(talent);
        setCity(city);
        setFirstInfo(!firstInfo)
    }
    //
    const fetchUserData = async () => {

        fetch(`${REACT_APP_API_URL}/ProjectsForTalents/` + props.id).then(res => res.json()).
            then(json => setProjData(json)).
            catch(err => console.error(err));

        fetch(`${REACT_APP_API_URL}/Faqs/` + props.id).then(res => res.json()).
            then(json => setFaqs(json)).
            catch(err => console.error(err));


        fetch(`${REACT_APP_API_URL}/TalentUsers/` + props.id).then(res => res.json()).
            then(json => setUserData(json)).
            catch(err => console.error(err));


    }
    useEffect(() => {
        // Fetch the image data from the API endpoint
        fetch(`${REACT_APP_API_URL}/TalentUsers/Image/` + userId)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary URL for the image data
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            });

        // Clean up the URL when the component unmounts
        return () => URL.revokeObjectURL(imageUrl);
    }, [userId]);

    useEffect(() => {
        fetchUserData();
    }, [])





    return (

        <div>
            {/* -------------------------------------------------------------------------------------------------------------------------------*/}
            {/* -----------------------------For  managing basic information------------ ------------------------------------------------------*/}
            {/* -------------------------------------------------------------------------------------------------------------------------------*/}

            <div >

                <img src="BEAR green.png" style={{
                    width: "5%", height: "5%", float: "right" }} />             
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <span> Talent :  </span>{UserData.talent}  
                    <span> City :   </span>{UserData.city} 
                    <span>Phone : </span> {UserData.contactPhone} 
                    <span>Name :  </span>{UserData.userName} 
                    <span> Email : </span> {UserData.email} 
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-success" onClick={(t) => h(UserData.talent, UserData.city, UserData.contactPhone, UserData.email, UserData.userName)}>🖊️</button>
                    </div>
                </div>

                {firstInfo &&

                    <form onSubmit={(e) => basicInfo(e)}>
                        <label>
                            Talent:
                            <input type="text" value={talent} onChange={(e) => setTalent(e.target.value)} />
                        </label>
                        <label>
                            City:
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </label> <label>
                            Phone:
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <button type="submit">edit!</button>

                    </form>}
                <hr></hr>
                <h5 className="card-title">Project <button className="btn btn-outline-success" onClick={handleAddProject}> + </button></h5>
                {/* -------------------------------------------------------------------------------------------------------------------------------*/}
                {/* -----------------------------------------For Manging Projects------------------------------------------------------------------*/}
                {/* -------------------------------------------------------------------------------------------------------------------------------*/}


                {AddProject &&
                    <form onSubmit={(e) => addProject(e)} >
                        <span>
                            Project Name
                            <input type="text" onChange={(e) => setAddProjectName(e.target.value)} />
                        </span>
                        <span>
                            Project price
                            <input type="number" onChange={(e) => setAddProjectPrice(e.target.value)} />
                        </span>
                        <button type="submit">add</button>
                    </form>
                }<></>

                {editProject &&
                    <form className="form-inline" onSubmit={postEditProject} >
                        <div className="form-group mb-2">
                            Project New Name
                            <input type="text" className="form-control" onChange={(e) => setAddProjectName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            Project New price
                            <input className="form-control" type="number"  onChange={(e) => setAddProjectPrice(e.target.value)} />

                        </div>
                        <button className="btn btn-primary mb-2" type="submit">edit</button>
                    </form>
                }
                {rowsProj.length > 0 && <div className="container">
                    <table className=" table table table-striped ">

                        <thead className="table table-info">
                            <tr>
                                <th >Project Title</th>
                                <th > Price (TVA)</th>
                                <th ></th>
                                <th ></th>

                            </tr>
                        </thead>
                        <tbody className="table table-striped ">{rowsProj}</tbody>
                    </table>
                </div>}
                {rowsProj.length == 0 && <h3 style={{ textAlign: "center", color: "red" }}> No Projects Data, Add Project  </h3>}
                {/* -------------------------------------------------------------------------------------------------------------------------------*/}
                {/* -----------------------------------------For Manging Faqs----------------------------------------------------------------------*/}
                {/* -------------------------------------------------------------------------------------------------------------------------------*/}


                <h5 className="card-title">Faq <button className="btn btn-outline-success" onClick={handleAddFaq}>  + </button></h5>
               
                {addFaq &&
                    <form onSubmit={addFaqHandle} >
                        <span>
                            Question
                            <input type="text" onChange={(e) => setquestion(e.target.value)} />
                        </span>
                        <span>
                            Answer
                            <input type="text" onChange={(e) => setAnswer(e.target.value)} />

                        </span>
                        <button type="submit">add</button>
                    </form>
                }<></>
                {editFaq &&
                    <form onSubmit={editFaqHandleSub} >
                        <div className="form-group">
                            Faq New Qeustion
                            <input className="form-control" type="text" onChange={(e) => setquestion(e.target.value)} />
                        </div>
                        <div className="form-group" >
                            faq New Answer
                            <input className="form-control" type="text"  onChange={(e) => setAnswer(e.target.value)} />

                        </div>
                        <button className="btn btn-success btn-block btn-lg" type="submit">edit</button>
                    </form>
                }<></>

                {rowsFaqs.length > 0 && <div className="container">
                    <table className=" table table table-striped ">
                        <thead className="table table-info">
                            <tr>
                                <th >Question</th>
                                <th > Answer</th>
                                <th ></th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody className="table table-striped">{rowsFaqs}</tbody>
                    </table>
                </div>}
                {rowsFaqs.length == 0 && <h3 style={{ textAlign: "center", color: "red" }}> No Projects Data, Add Faq </h3>}
            </div>
            {/* -------------------------------------------------------------------------------------------------------------------------------*/}
            {/* -----------------------------------------For Manging Image---------------------------------------------------------------------*/}
            {/* -------------------------------------------------------------------------------------------------------------------------------*/}


            <div className="form-group">
                <label className="form-label">Profile Image</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit" className="btn btn-success"  onClick={saveImage}>Save Image</button>
                <img style={{ height: "100px" }} src={imageUrl} alt="Image" />
            </div>
        </div>

    );
};

export default ManageUser;