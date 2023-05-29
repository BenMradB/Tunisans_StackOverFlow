import React, { useEffect, useState } from 'react'
import Login from '../Auth/Login/Login'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddUserBtn = (props) => {
  return (
    <>
      <div className="mb-2" style={{ display: 'flex' }}>
        <Link className="link" to='/add-user' state={[props.users]}>
          <button type="button" className="btn btn-primary btn-sm btn-rounded">
            <i className="fa-solid fa-plus"
              style={{
                fontSize: '20px'
              }}
            ></i>
          </button>
        </Link>
      </div>
    </>
  )
}

const EditUserBtn = (props) => {
  return (
    <>
      <Link to="/edit-user" className="link" state={[props.user.id, props.users]}>
        <button type="button" className="btn btn btn-sm btn-rounded" style={{ background: '#198754', color: '#FFF' }}>
          <i className="fa-solid fa-pen-to-square"
            data-mdb-toggle="modal" data-mdb-target="#editModal"
            style={{
              fontSize: '15px'
            }}
          ></i>
        </button>
      </Link>
    </>
  )
}

const DeleteUserBtn = (props) => {
  return (
    <>
      <button onClick={() => props.deleteUser(props.user.id)} type="button" className="btn btn-danger btn btn-sm btn-rounded" style={{ marginLeft: '10px' }}>
        <i className="fa-solid fa-trash"
          style={{
            fontSize: '15px'
          }}
        ></i>
      </button>
    </>
  )
}

const UserCode = () => {
  const [users, setUsers] = useState([]);
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users').then(res => {
      setUsers(res.data['hydra:member']);
    })
  }, [])

  const deleteUser = (userId) => {
    axios.delete(`http://127.0.0.1:8000/api/users/${userId}`).then(res => {
      setUsers(users.filter(user => user.id !== userId))
    })
  }

  return (
    <div className="container mt-5">


    {
      !isAdmin ? '' : <AddUserBtn users={users} />
    }


      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      alt=""
                      style={{
                        width: '45px',
                        height: '45px',
                      }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1"> {user.username} </p>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1"> {user.role.toUpperCase()} </p>
                  <p className="text-muted mb-0"></p>
                </td>
                <td>
                  <span className="badge badge-success rounded-pill d-inline">Active</span>
                </td>
                <td>
                    {
                      !isAdmin ? '' : <EditUserBtn  user={user} users={users} />
                    }
                    {

                      !isAdmin ? '' : <DeleteUserBtn user={user} deleteUser={deleteUser} />
                    }
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
const User = () => {
  return (
    <>
      {
        localStorage.getItem('userId') !== null ? <UserCode /> : <Login />
      }

    </>
  )
}

export default User