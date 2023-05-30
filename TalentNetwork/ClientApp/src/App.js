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

export const Context = createContext();
export const UContext = createContext();


function App () {
    //static displayName = App.name;

    const [isLogin, setLogin] = useState(false);
    const [userId, setUserId] = useState(0);

    
     

    return (
        <Context.Provider value={[isLogin, setLogin] }> 
            <UContext.Provider value={[userId, setUserId]}> 

          <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}

                  <Route
                          path='/users-home-page'
                            element={isLogin ? <UsersHomePage id={userId} /> : <Login />}
                ></Route>
                <Route
                    path='/admin-home-page'
                        element={isLogin ? <AdminHomePage /> : <Login />}
                        ></Route>
                        <Route
                            path='users-home-page/manage-user'
                            element={
                                <ManageUser id={userId} />
                            }
                        ></Route>
                <Route
                    path='/users'
                    element={
                        <UsersTable />
                    }
                   ></Route>

                  </Routes>

      </Layout>
            </UContext.Provider >

        </Context.Provider>

    );
}
export default App;




