import  Home from "./components/Home";
import Register from "./components/Register";
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
 

    {
        path: '/register',
        element: <Register />
    },
 
   
];

export default AppRoutes;
