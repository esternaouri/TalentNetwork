import { createContext, useContext, useEffect, useState } from "react";
import { Card,Form, Button } from 'react-bootstrap';

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App"
import { UContext } from "../App"
import { AContext } from "../App"
import { NContext } from "../App"

const Login = () => {

    let [enteredPassword, setEnteredPassword] = useState("");
    let [enteredUserId, setEnteredUserId] = useState(0);
    const [fetchedToken, setFetchedToken] = useState([])

    const [fetchedUser, setFetchedUser] = useState([])
    const [isLogin, setLogin] = useContext(Context);
    const [userId, setUserId] = useContext(UContext);
    const [IsAdmin, seIsAdmin] = useContext(AContext);
    const [userName, setUserName] = useContext(NContext);

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
            seIsAdmin(CurentUser.isAdmin);
            console.log(res.data)
            setUserId(CurentUser.userId);
            setUserName(CurentUser.userName);
      
        } catch (e) {
            alert(" USER ID OR PASSWORD IS INCORRECT")
        }

    };


    const handleSubmit = e => {
        e.preventDefault()
        fetchToken();
    }

 
    console.log(userId);
  
   

    return (

        <div>
            <img style={{ width: "12%", height: "12%"   ,boxShadow: "0 2px 4px rgba(0, 0, 0, 9)"
            }} src="/favicon.png" alt="logo" /> <h2>Try The Best You Are Money As It Sounds "kling, klang"
</h2> 
            <Card style={{  "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.02)" }}>
                <Card.Body>
                    <Card.Title>Login!</Card.Title>

            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formEmail">
                    <Form.Label>User Id</Form.Label>
                    <Form.Control
                        type="text"
                         placeholder="Enter Id"
                         onChange={(e) => setEnteredUserId(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                            placeholder="Password"
                            onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log in
                </Button>
                    </Form>

                    <hr></hr>
                <Link to="/register">New Here? Let Regist!</Link>
                </Card.Body>
            </Card>
                </div>
              

    );
};

export default Login;