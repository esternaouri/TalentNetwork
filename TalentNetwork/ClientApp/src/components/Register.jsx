import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Context } from "../App"
import { UContext } from "../App"
import { Navigate, NavLink, redirect } from "../../../../node_modules/react-router-dom/dist/index";
import { withRouter } from 'react-router-dom';

const Register = () => {

    let [enteredPassword, setEnteredPassword] = useState("");
    let [enteredUserId, setEnteredUserId] = useState(0);
    let [enteredUserName, setEnteredUserName] = useState("");

    const handleSubmit = async () => {
        const post1 = {
            UserId: enteredUserId,
            UserName: enteredUserName,
            Password: enteredPassword,

        }

        try {
            const res = await axios.post('https://localhost:7116/USERS/register', post1)
            console.log(res.data)
        } catch (e) {
            alert(e)
        }

    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Set User Identity number:
                    <input className="form-control"  type="number" value={enteredUserId} onChange={(e) => setEnteredUserId(e.target.value)} />
                </label>
                <label>
                    Set Name:
                    <input className="form-control"  type="text" onChange={(e) => setEnteredUserName(e.target.value)} />
                </label> <label><></>
                    Set  Password:
                    <input className="form-control" type="password" onChange={(e) => setEnteredPassword(e.target.value)} />
                </label>
                <></>
                <hr></hr>
                <button class="btn btn-primary" type="submit">Add User</button>

            </form>

        </div>

    );
};

export default Register;