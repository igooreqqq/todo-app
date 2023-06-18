import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTask() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const { title, description } = task;

  const onInputChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const loadTask = async () => {
      const result = await axios.get(`http://localhost:8084/task/${id}`);
      setTask(result.data);
    };

    loadTask();
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:8084/task/${id}`, task);
    navigate('/');
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit task</h2>
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your title"
                name="title"
                value={title}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control h-100 resize-none"
                placeholder="Enter your description"
                name="description"
                maxLength={255}
                value={description}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <button type="submit" className="btn btn-outline-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
