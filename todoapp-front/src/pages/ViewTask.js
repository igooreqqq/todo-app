import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function ViewTask() {
  
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const { id } = useParams();

  useEffect(() => {
    const loadTask = async () => {
      const result = await axios.get(`http://localhost:8084/task/${id}`);
      setTask(result.data);
    };

    loadTask();
  }, [id]);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">More Info</h2>
              <div className="card-text">
                <h5>Title:</h5>
                <p>{task.title}</p>
                <h5>Description:</h5>
                <p>{task.description}</p>
              </div>
            </div>
            <div className="card-footer text-center">
              <Link className="btn btn-outline-dark" to="/">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
