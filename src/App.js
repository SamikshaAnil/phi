import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './components/Home'
import FormBuilder from './components/FormBuilder'
import FormDisplay from './components/FormDisplay'

const App = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<FormBuilder />} />
        <Route path="/forms" element={<FormDisplay />} />
    </Routes>
)

export default App
