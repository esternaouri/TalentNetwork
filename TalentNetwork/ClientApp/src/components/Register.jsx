import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form } from 'react-bootstrap';

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Context } from "../App"
import { UContext } from "../App"
import { Navigate, NavLink, redirect } from "../../../../node_modules/react-router-dom/dist/index";
import { withRouter } from 'react-router-dom';
const { REACT_APP_API_URL } = process.env;

const Register = () => {

    let [enteredPassword, setEnteredPassword] = useState("");
    let [enteredUserId, setEnteredUserId] = useState(0);
    let [enteredUserName, setEnteredUserName] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post1 = {
            UserId: enteredUserId,
            UserName: enteredUserName,
            Password: enteredPassword,

        }

        try {
            const res = await axios.post(`${REACT_APP_API_URL}/USERS/register`, post1)
            alert("Saved");
            navigate("/login");


        } catch (e) {
            alert(e)
        }

    }

    return (

        <div>
        <Card style={{ "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.02)" }}>

                <Card.Body>
                    <Card.Title > Regist!</Card.Title> 
                <Form  onSubmit={(e) => handleSubmit(e)}>

                <div className="form-group row">

                <label className="d-flex justify-content-end">
                    ID/LICENSE DRIVER ID: 
                    <input className="form-control"  type="number" value={enteredUserId} onChange={(e) => setEnteredUserId(e.target.value)} />
                    </label>
                </div>
                <hr></hr>
                <div className="form-group row">

                <label className="d-flex justify-content-end">
                     Name:
                    <input className="form-control"  type="text" onChange={(e) => setEnteredUserName(e.target.value)} />
                </label>
                </div>
                <hr></hr>

                <div className="form-group row">

                <label className="d-flex justify-content-end">
                      Password:
                    <input className="form-control" type="password" onChange={(e) => setEnteredPassword(e.target.value)} />
                </label>
            </div>
                <button class="btn btn-primary" type="submit">Add User</button>

            </Form>
                    </Card.Body>

            </Card>
        </div>
   );
};

export default Register;