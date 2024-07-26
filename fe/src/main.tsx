import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import './index.css'
import LoginNav from './components/user/nav'
import Register from './components/user/register'
import Login from './components/user/login'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<LoginNav />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
