import React from "react"
import ReactDOM from "react-dom/client"
import './src/index.css'
import Main from './src/Main'
import { BrowserRouter, Routes, Route } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<Main />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
  )