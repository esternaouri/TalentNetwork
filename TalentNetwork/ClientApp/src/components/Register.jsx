import { useState } from "react";
import { Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;

const Register = () => {

    let [enteredPassword, setEnteredPassword] = useState("");
    let [enteredUserId, setEnteredUserId] = useState(0);
    let [enteredUserName, setEnteredUserName] = useState("");
    let [enteredEmail, setEnteredEmail] = useState("");

    let navigate = useNavigate();
    //register data to server
    const handleSubmit = async (e) => {
        e.preventDefault();

        const post1 = {
            UserId: enteredUserId,
            UserName: enteredUserName,
            Password: enteredPassword,
            Email: enteredEmail,
        }

        try {
            const res = await axios.post(`${REACT_APP_API_URL}/USERS/register`, post1)
            alert("Saved");
            navigate("/login");


        } catch (e) {
            alert("all data need to be apply. ID need to be indentic")
        }

    }

    return (

        <div>
            <Card style={{ "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.02)" }}>

                <Card.Body>
                    <Card.Title > Regist!</Card.Title>
                    <Form onSubmit={(e) => handleSubmit(e)}>

                        <div className="form-group row">

                            <label className="d-flex justify-content-end">
                                ID/LICENSE DRIVER ID:
                                <input className="form-control" type="number" value={enteredUserId} onChange={(e) => setEnteredUserId(e.target.value)} />
                            </label>
                        </div>
                        <hr></hr>
                        <div className="form-group row">

                            <label className="d-flex justify-content-end">
                                Name:
                                <input className="form-control" type="text" onChange={(e) => setEnteredUserName(e.target.value)} />
                            </label>
                        </div>
                        <label className="d-flex justify-content-end">
                            Email:
                            <input className="form-control" type="email" onChange={(e) => setEnteredEmail(e.target.value)} />
                        </label>
                        <hr></hr>

                        <div className="form-group row">

                            <label className="d-flex justify-content-end">
                                Password:
                                <input className="form-control" type="password" onChange={(e) => setEnteredPassword(e.target.value)} />
                            </label>
                        </div>
                        <button className="btn btn-primary" type="submit">Add User</button>

                    </Form>
                </Card.Body>

            </Card>
        </div>
    );
};

export default Register;