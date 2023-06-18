import React from 'react'
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            
            <h3 className="mb-0">Todo app</h3>
            <div className='mx-2'>
            <FontAwesomeIcon icon={faStickyNote} className="mr-auto" />
            </div>
            
          </Link>

          <div className="ml-auto">
            <Link className="btn btn-outline-light" to="/addtask">
              Add Task
            </Link>
            <Link className="btn btn-outline-light mx-4" to="/requestcount">
              See Request Count
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
