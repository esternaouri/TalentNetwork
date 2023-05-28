import { Counter } from "./components/Counter";
import Login  from "./components/Login";
import  Home from "./components/Home";
import { UsersTable } from "./components/UsersTable"
import { AdminHomePage } from "./components/AdminHomePage"
import { UsersHomePage } from "./components/UsersHomePage"
import  ManageUser  from "./components/ManageUser"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
      path: '/login',
      element: <Login />
    },
    {
        path: '/manage-user',
        element: <ManageUser />
    },

    //{
        //path: '/users',
     //   element: <UsersTable />
   // },
   // {
     //   path: '/admin-home-page',
       // element: <AdminHomePage />
    //},
    //{
      //  path: '/users-home-page',
       // element: <UsersHomePage />
    //},
];

export default AppRoutes;