import { Route, Routes } from "react-router-dom"
import './index.css'

import Layout from './components/Layout'
import PageNotFound from './components/PageNotFound'

// User route
import Register from './components/user/register'
import Login from './components/user/login'

// Task route
import Tasks from './components/task/tasks'
import NewTask from './components/task/newTask'


export default function Main() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

                {/* Protect Routes */}
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/new" element={<NewTask />} />

                {/* 404 Not Found */}
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}