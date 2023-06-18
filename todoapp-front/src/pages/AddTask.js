import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddTask() {

    let navigate = useNavigate();

    const [task, setTask] = useState({
        title:"",
        description:""
    })

    const{title, description} = task

    const onInputChange = (event) => {
        setTask({...task, [event.target.name]:event.target.value});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:8084/task", task);
        navigate("/");
    };

  return (
    <div className='container mt-3'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add new task</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
                <div className='mb-3'>
                <label htmlFor='Title' className='form-label'>Title</label>
                <input type='text' className='form-control' placeholder='Enter your task title' name='title' maxLength={100} value={title} onChange={(e) => onInputChange(e)} autoComplete='off' />
                </div>
                <div className='mb-3'>
                <label htmlFor='Description' className='form-label'>Description</label>
                <textarea className='form-control h-100 resize-none' placeholder='Enter your description' name='description' maxLength={255} value={description} onChange={(e) => onInputChange(e)} autoComplete='off' />
                </div>

                <button type='submit' className='btn btn-outline-dark'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}
