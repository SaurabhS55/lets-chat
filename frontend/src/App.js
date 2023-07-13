import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register,{registerAction} from './pages/Register'
import Login,{loginAction} from './pages/Login'
import Avatar from './components/Avatar'
import Chat,{chatLoader} from './pages/Chat'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const route= createBrowserRouter([
    {path:'/register',element:<Register/>,action:registerAction},
    {path:'/login',element:<Login/>,action:loginAction},
    {path:'/',element:<Chat/>,loader:chatLoader},
    {path:'/avatar',element:<Avatar/>}
  ])
  return (
    <RouterProvider router={route}/>
  )
}

export default App