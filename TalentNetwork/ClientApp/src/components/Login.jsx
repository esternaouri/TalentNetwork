import {  useContext, useState } from "react";
import { Card, Form, Button } from 'react-bootstrap';

import axios from 'axios';
import { Link } from "react-router-dom";
import { Context } from "../App"
import { UContext } from "../App"
import { AContext } from "../App"
import { NContext } from "../App"
const { REACT_APP_API_URL } = process.env;

const Login = () => {

    let [enteredPassword, setEnteredPassword] = useState("");
    let [enteredUserId, setEnteredUserId] = useState(0);
    const [fetchedToken, setFetchedToken] = useState([]);

    const [fetchedUser, setFetchedUser] = useState([]);
    const [isLogin, setLogin] = useContext(Context);
    const [userId, setUserId] = useContext(UContext);
    const [IsAdmin, seIsAdmin] = useContext(AContext);
    const [userName, setUserName] = useContext(NContext);


    const fetchToken = async (e) => {

        const post = {
            UserId: enteredUserId,
            password: enteredPassword
        }

        try {
            const res = await axios.post(`${REACT_APP_API_URL}/USERS/LOGIN`, post)
            setFetchedToken(res.data)
            setLogin(true);
            let CurentUser = JSON.parse(JSON.stringify(res.data));
            seIsAdmin(CurentUser.isAdmin);
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





    return (

        <div>
            <Card style={{ }}>
                <Card.Body>
                    <img className=" card-img-top" style={{
                        width: "12%", height: "12%",
                    }} src="/BEAR GREEN.png" alt="logo" /> <h2>Try The Best You Are Money As It Sounds "kling, klang"
                    </h2>
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