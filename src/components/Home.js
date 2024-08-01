import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('/create')}>Create a New Form</button>
            <button onClick={() => navigate('/forms')}>View Forms</button>
        </div>
    )
}

export default Home
