import { createContext, useContext, useEffect, useState } from "react";

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App"
import { UContext } from "../App"

const Login = () => {

    let [enteredPassword, setEnteredPassword] = useState("");
    let [enteredUserId, setEnteredUserId] = useState(0);
    const [fetchedToken, setFetchedToken] = useState([])

    const [fetchedUser, setFetchedUser] = useState([])
    const [isLogin, setLogin] = useContext(Context);
    const [userId, setUserId] = useContext(UContext);
    const [IsAdmin, seIsAdmin] = useState(false);

    let navigate = useNavigate();



    const fetchToken = async (e) => {


        const post = {
            UserId: enteredUserId,
            password: enteredPassword
        }

        try {
            const res = await axios.post('https://localhost:7116/USERS/LOGIN', post)
            setFetchedToken(res.data)
            setLogin(true);
            let CurentUser = JSON.parse(JSON.stringify(res.data));
            seIsAdmin(CurentUser.IsAdmin);
            console.log(res.data)
            setUserId(CurentUser.userId);

            if (CurentUser.IsAdmin === 1) {
                navigate('/user-home-page');
            } else if (CurentUser.IsAdmin === 2) {
                navigate('/admin-home-page');
            }
        } catch (e) {
            alert(e)
        }

    };


    const handleSubmit = e => {
        e.preventDefault()
        fetchToken();
    }

 
    console.log(userId);
  
   

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    User Identity number:
                    <input type="number" value={enteredUserId} onChange={(e) => setEnteredUserId(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
            </form>
            <Link to ="/register">New Here? Let Regist!</Link>
        </div>

    );
};

export default Login;