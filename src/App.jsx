import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { createHashRouter, RouterContextProvider, RouterProvider } from 'react-router-dom';
import MasterLayout from './Components/MasterLayout/MasterLayout';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import ProductByCategories from './Components/ProductByCategories/ProductByCategories';

function App() {

  const routes = createHashRouter([
    {
      path:'/', element:<MasterLayout/> , children:[
        {
          index:true , element:<Home/>,
        },
              { path: 'home', element: <Home /> }, 
              {path:'product', element:<ProductByCategories/>},
              {path: '*', element: <NotFound/>},

      ]

    }
  ])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
