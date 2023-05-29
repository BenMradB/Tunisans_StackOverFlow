import React, { useEffect, useState } from 'react'
import './EditUser.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from '../Alerts/Alert'

const EditUser = () => {
    const [user, setUser] = useState()
    const location = useLocation();
    const userId = location.state[0];
    let users = location.state[1];
    const [username, setUsername] = useState('');
    const [userExists, setUserExists] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${userId}`).then(res => {
            setUser(res.data);
            setUsername(res.data.username);
            setEmail(res.data.email);
        })
    }, [])

    
    const edit = () => {
        users = users.filter(_user => _user.id !== userId)
        console.log(users);
        const exists = users.filter(_user => _user.email === email)[0];

        if (exists) {
            setUserExists(true);
            setErrorMsg(`The updated email [ ${email} ] related to another account`);
        } else {
            setUserExists(false);
            const updatedUser = {
                username: username,
                email: email,
                password: user?.password,
                role: user?.role
            }

            axios.put(`http://127.0.0.1:8000/api/users/${userId}`, updatedUser).then(() => {
                navigate('/users');
            })
        }
    }

    return (
        <>
            <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            {userExists ? <Alert error={errorMsg} /> : ''}
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    style={{ width: '185px' }} alt="logo" />
                                                <h4 className="mt-1 mb-5 pb-1">Tunisian Stack Over Flow</h4>
                                            </div>
                                            <form>
                                                <p>Update <strong> {user?.username} </strong> </p>
                                                <div className="form-outline mb-4">
                                                    <input type="text" value={username} id="form2Example11" className="form-control"
                                                        placeholder="Username"
                                                        onChange={(event) => setUsername(event.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example11">Username</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="form2Example11" value={email} className="form-control"
                                                        placeholder="Email Address"
                                                        onChange={(event) => setEmail(event.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example11">Email Address</label>
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"
                                                        onClick={edit}
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">We are more than just a Website</h4>
                                            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditUser