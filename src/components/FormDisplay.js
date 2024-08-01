import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FormDisplay = () => {
    const [forms, setForms] = useState([])
    const [editingForm, setEditingForm] = useState(null)

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/forms/getForms')
                setForms(res.data)
            } catch (error) {
                console.error('Error fetching forms:', error)
            }
        }
        fetchForms()
    }, [])

    const deleteForm = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/forms/deleteForm/${id}`)
            setForms(forms.filter(form => form._id !== id))
        } catch (error) {
            console.error('Error deleting form:', error)
        }
    }

    const updateForm = async (form) => {
        try {
            const res = await axios.put(`http://localhost:3001/api/forms/updateForm/${form._id}`, form)
            setForms(forms.map(f => (f._id === form._id ? res.data : f)))
            setEditingForm(null)
        } catch (error) {
            console.error('Error updating form:', error)
        }
    }

    const handleEditChange = (e, index) => {
        const newFields = [...editingForm.fields]
        newFields[index] = { ...newFields[index], label: e.target.value }
        setEditingForm({ ...editingForm, fields: newFields })
    }

    return (
        <div>
            <h1>Forms</h1>
            {forms.map((form) => (
                <div key={form._id}>
                    <h2>{form.title}</h2>
                    {Array.isArray(form.fields) && form.fields.map((field, index) => (
                        <div key={index}>
                            <label>{field.label}</label>
                            {field.type === 'text' && <input type="text" />}
                            {field.type === 'email' && <input type="email" />}
                            {field.type === 'number' && <input type="number" />}
                        </div>
                    ))}
                    <button onClick={() => setEditingForm(form)}>Edit</button>
                    <button onClick={() => deleteForm(form._id)}>Delete</button>
                </div>
            ))}

            {editingForm && (
                <div>
                    <h2>Edit Form</h2>
                    <input
                        type="text"
                        placeholder="Form Title"
                        value={editingForm.title}
                        onChange={(e) => setEditingForm({ ...editingForm, title: e.target.value })}
                    />
                    {editingForm.fields.map((field, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Field Label"
                                value={field.label}
                                onChange={(e) => handleEditChange(e, index)}
                            />
                            {field.type === 'text' && <input type="text" />}
                            {field.type === 'email' && <input type="email" />}
                            {field.type === 'number' && <input type="number" />}
                        </div>
                    ))}
                    <button onClick={() => updateForm(editingForm)}>Save</button>
                    <button onClick={() => setEditingForm(null)}>Cancel</button>
                </div>
            )}
        </div>
    )
}

export default FormDisplay
