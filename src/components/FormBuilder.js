import React, { useState } from 'react'
import axios from 'axios'

const FormBuilder = () => {
    const [title, setTitle] = useState('')
    const [fields, setFields] = useState([])
    const [message, setMessage] = useState('')

    const addField = (type) => {
        setFields([...fields, { label: '', type }])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim()) {
            setMessage('Title is required.')
            return
        }
        const form = { title, fields }
        try {
            const response = await axios.post('http://localhost:3001/api/forms/register', form)
            if (response.status === 200) {
                setMessage('Form saved successfully!')
                setTitle('')
                setFields([])
            } else {
                setMessage('Failed to save form. Please try again.')
            }
        } catch (error) {
            console.error('Error saving form:', error)
            setMessage('Error saving form. Please try again.')
        }
        console.log(fields)
    }

    return (
        <div>
            <h1>Create a Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Form Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {fields.map((field, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Field Label"
                            value={field.label}
                            onChange={(e) =>
                                setFields(fields.map((f, i) =>
                                    i === index ? { ...f, label: e.target.value } : f
                                ))
                            }
                        />
                        {field.type === 'text' && <input type="text" />}
                        {field.type === 'email' && <input type="email" />}
                        {field.type === 'number' && <input type="number" />}
                    </div>
                ))}
                <div>
                    <button type="button" onClick={() => addField('text')}>Add Name Field</button>
                    <button type="button" onClick={() => addField('email')}>Add Email Field</button>
                    <button type="button" onClick={() => addField('number')}>Add Number Field</button>
                </div>
                <button type="submit">Save Form</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default FormBuilder
