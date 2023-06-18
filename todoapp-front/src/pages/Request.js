import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Request() {

    const [ requestCounter, setRequestCounter] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetchRequestCount();
    }, []);

    const fetchRequestCount = async () => {
        try {
            const response = await fetch('http://localhost:8084/api/requests');
            const data = await response.json();
            setRequestCounter(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error: ', error);
            setIsLoading(false);
        }
    };

    return (
      <div className="text-center mt-4">
        <div className="card mx-auto w-75 p-3 shadow">
          {isLoading ? (
            <h1 className="text-muted">Checking request counter...</h1>
          ) : (
            <h1 className="text-dark">Request Count: {requestCounter}</h1>
          )}
          <div className="card-footer text-center mt-4">
            <Link className="btn btn-outline-dark" to="/">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
    
}
