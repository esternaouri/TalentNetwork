import { createContext, useContext, useEffect, useState } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Context } from "../App"
import { UContext } from "../App"

const Login = () => {

         let [enteredPassword, setEnteredPassword] = useState("");
         let [enteredUserId, setEnteredUserId] = useState(0);
         const [fetchedToken, setFetchedToken] = useState([])

         const [fetchedUser, setFetchedUser] = useState([])
         const [isLogin, setLogin] = useContext(Context);    
         const [userId, setUserId] = useContext(UContext);

         let navigate = useNavigate();

      //  const AuthContext = createContext({ isLogin });


            const fetchToken = async (e) =>{
    

               const post = {
                     UserId: enteredUserId,
                     password: enteredPassword
                }

                try {
                    const res = await axios.post('https://localhost:7116/USERS/LOGIN', post)
                    setFetchedToken(res.data)
                    setLogin(true);
                    console.log(res.data)

                } catch (e) {
                    alert(e)
                }
                    
                };

            useEffect(() => {
            fetchToken()
             }, [])


            const GetUser = async (e) => {
                axios.get( 'https://localhost:7116/USERS/'+enteredUserId)
                    .then((response) => {
                        setFetchedUser(response.data);
                        setFetchedUser(response.data);
                    });
                }
                useEffect(() => {
                  GetUser()
                }, [])
                
                const handleSubmit = e => {
                    e.preventDefault()
                    GetUser();
                    fetchToken();
                }

                useEffect(() => {
                let myObj = JSON.parse(JSON.stringify(fetchedUser));
                    const x = myObj.userId;
                    setUserId(x);
                });
                //console.log("is admin : " + isAdmin);
                //console.log("fetch Token: " + JSON.stringify(fetchedToken) + "logine: " + isLogin);
                // console.log("user: " + JSON.stringify(fetchedUser));
                console.log(userId);
                let CurentUser = JSON.parse(JSON.stringify(fetchedUser));
                const checkAdmin = CurentUser.isAdmin;

                if ((isLogin == true)) {
                    if (checkAdmin == 2)
                    {
                        navigate("/admin-home-page");
                    }
                } else if (checkAdmin == 1){
                    navigate("/users-home-page");
                    } 
        
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
                
        </div>

         );
};

export default Login;