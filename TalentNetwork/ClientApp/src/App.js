import React, { Component, createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { AdminHomePage } from "./components/AdminHomePage"
import { UsersHomePage } from "./components/UsersHomePage"
import { UsersTable } from "./components/UsersTable"
import './custom.css';
import Login from './components/Login';
import ManageUser from"./components/ManageUser"
import { Counter } from './components/Counter';
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



