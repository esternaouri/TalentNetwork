import React, { Component, createContext, useState, useRef, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { UsersHomePage } from "./components/UsersHomePage"
import { UsersTable } from "./components/UsersTable"
import './custom.css';
import Login from './components/Login';
import ManageUser from"./components/ManageUser"
import axios from "axios";
import { Keys, getItem, setLoginData, removeLoginData } from "./utils/storage";

import Home from "./components/Home"
import { Card, Form, Button } from 'react-bootstrap';

export const Context = createContext();
export const UContext = createContext();
export const AContext = createContext();
export const NContext = createContext();


function App () {
    //static displayName = App.name;

    const [isLogin, setLogin] = useState(false);
    const [userId, setUserId] = useState(0);
    const [IsAdmin, seIsAdmin] = useState(0);
    const [userName, setUserName] = useState(NContext);

    let timerID = useRef();

    useEffect(() => {
        console.log("App useEffect", Date());
        if (getItem(Keys.refreshToken) && isNaN(timerID)) {
            setRefreshTokenInterval();
            refreshToken();
        }
    }, []);
    //
    function setRefreshTokenInterval() {
        if (isNaN(timerID)) {
            let expiresInSeconds = getItem(Keys.expiresInSeconds);
            let refreshInterval = expiresInSeconds
                ? Number(expiresInSeconds) / 2
                : 30;
            timerID = setInterval(refreshToken, refreshInterval * 1000);
            console.log("starting refreshToken", refreshInterval, Date());
        }
    }
    //
    function refreshToken() {
        console.log("refreshToken", Date());
        axios
            .post("https://localhost:7116/users/refreshToken", {
                refreshToken: getItem(Keys.refreshToken),
            })
            .then((response) => {
                login(response.data);
            })
            .catch((error) => {
                logout();
            });
    }
    //
    function login(loginData) {
        setLoginData(loginData.userResponse, loginData.tokensData);
        setRefreshTokenInterval();
        seIsAdmin(loginData.userResponse[Keys.roleID]);
        setLogin(true);
    }
    //
    function logout() {
        clearTimeout(timerID);
        removeLoginData();
        setLogin(false);
    }


    return (
        <Context.Provider value={[isLogin, setLogin] }> 
            <UContext.Provider value={[userId, setUserId]}> 
                <AContext.Provider value={[IsAdmin, seIsAdmin]}> 
                    <NContext.Provider value={[userName, setUserName]}> 

          <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}

                  <Route
                      path='/login'
                      element={isLogin ? <UsersHomePage id={userId} admin={IsAdmin} name={userName} /> : <Login />}>
                  </Route>
                  <Route
                       path='login/admin-home-page'
                       element={IsAdmin == 2 ? < UsersTable /> : <Home />}>
                  </Route>
                    <Route
                       path='login/manage-user'
                       element={userId != 0 ?
                       < ManageUser id={userId} /> : <Login />}>       
                      </Route>
                  </Routes>

                        </Layout>
                        <Card style={{ color: "red",
                            padding: "20px",
                            textAlign: "center", border: "none", width:"900"
                        }}> Wish You Luck On Finiding You And Your Partner</Card>
                        </NContext.Provider> 

                    </AContext.Provider > 

            </UContext.Provider >

        </Context.Provider>

    );
}
export default App;



