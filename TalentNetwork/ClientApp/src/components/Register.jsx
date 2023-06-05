import { createContext, useContext, useEffect, useState } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Context } from "../App"
import { UContext } from "../App"
import { Navigate, NavLink, redirect } from "../../../../node_modules/react-router-dom/dist/index";
import { withRouter } from 'react-router-dom';

const Register = () => {
    let navigate = useNavigate();

    let [enteredPassword, setEnteredPassword] = useState("");
    let [enteredUserId, setEnteredUserId] = useState(0);
    let [enteredUserName, setEnteredUserName] = useState("");
    let [enteredPhone, setEnteredUserphone] = useState(0);
    let [enteredCity, setEnteredUserCity] = useState(0);
    let [enteredTalent, setEnteredUserTalent] = useState(0);

    const handleSubmit = async (e) => {
        const post1 = {
            UserId: enteredUserId,
            password: enteredPassword,
            UserName: enteredUserName,
            PhoneNumber: enteredPhone
        }

        try {
            const res = await axios.post('https://localhost:7116/USERS/register', post1)
            console.log(res.data)
        } catch (e) {
            alert(e)
        }

    }

    const submit2 =async () => {



        const post2 = {
            UserId: enteredUserId,
            City: enteredCity,
            Talent: enteredTalent,
            ContactPhone: enteredPhone
        }

        try {
            const res = await axios.post('https://localhost:7116/TalentUsers', post2)
            console.log(res.data)
        } catch (e) {
            alert(e)
        }
    }
    return (

        <div>
            <form onSubmit={handleSubmit }>
                <label>
                   Set User Identity number:
                    <input type="number" value={enteredUserId} onChange={(e) => setEnteredUserId(e.target.value)} />
                </label>
                <label>
                    Set Name:
                    <input type="text" onChange={(e) => setEnteredUserName(e.target.value)} />
                </label> <label>
                    Set  Password:
                    <input type="password"  onChange={(e) => setEnteredPassword(e.target.value)} />
                </label>
                <button type="submit">Add User</button>

            </form>
            <form onSubmit={submit2}>
                <label>
                  Set  Phone Number:
                    <input type="number" onChange={(e) => setEnteredUserphone(e.target.value)} />
                </label>
                <label>
                    Set  City:
                    <input type="text" onChange={(e) => setEnteredUserCity(e.target.value)} />
                </label><label>
                    Set  Talent:
                    <input type="text" onChange={(e) => setEnteredUserTalent(e.target.value)} />
                </label>
                <button type="submit">Add User2</button>

            </form>

        </div>

    );
};

export default Register;