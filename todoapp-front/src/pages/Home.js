import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get('http://localhost:8084/tasks');
    setTasks(result.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8084/task/${id}`);
    loadTasks();
  };

  const toggleDone = async (id) => {
    await axios.post(`http://localhost:8084/task/done/${id}`);
    loadTasks();
  };

  const toggleNotDone = async (id) => {
    await axios.post(`http://localhost:8084/task/notdone/${id}`);
    loadTasks();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortColumn === 'title') {
      return sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }
    if (sortColumn === 'state') {
      return sortDirection === 'asc' ? a.done - b.done : b.done - a.done;
    }
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="py-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="table shadow">
          <thead>
            <tr>
              <th scope="col">Nr</th>
              <th scope="col">
                Title{' '}
                <span
                  className={`sort-icon ${sortColumn === 'title' ? 'active' : ''} mx-1`}
                  onClick={() => handleSort('title')}
                >
                  <FontAwesomeIcon icon={faSort} />
                  {sortColumn === 'title' && (sortDirection === 'asc' ? <>&#9660;</> : <>&#9650;</>)}
                </span>
              </th>
              <th scope="col">
                Task state{' '}
                <span
                  className={`sort-icon ${sortColumn === 'state' ? 'active' : ''} mx-1`}
                  onClick={() => handleSort('state')}
                >
                  <FontAwesomeIcon icon={faSort} />
                  {sortColumn === 'state' && (sortDirection === 'asc' ? <>&#9660;</> : <>&#9650;</>)}
                </span>
              </th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{task.title}</td>
                <td>{task.done ? 'Finished' : 'Unfinished'}</td>
                <td>
                  <Link className="btn btn-dark mx-2" to={`/viewtask/${task.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-dark mx-2" to={`/edittask/${task.id}`}>
                    Edit
                  </Link>
                  {task.done ? (
                    <button className="btn btn-outline-danger mx-2" onClick={() => toggleNotDone(task.id)}>
                      Undo
                    </button>
                  ) : (
                    <button className="btn btn-success mx-2" onClick={() => toggleDone(task.id)}>
                      Make Done
                    </button>
                  )}
                  <button className="btn btn-danger mx-2" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
