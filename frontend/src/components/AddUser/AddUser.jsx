import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import axios from 'axios';
import Alert from '../Alerts/Alert';

const AddUser = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState();
    const [password, setPassword] = useState('');
    const [userExists, setUserExists] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();
    const users = location.state[0];
    let [errorMsg, setErrorMsg] = useState('');

    const add = async () => {
        try {
            const exists = users.filter(user => user.email === email);

            if (exists.length > 0) {
                setUserExists(true);
                setErrorMsg(`There is an account already exists under this email : [ ${email} ]`);
            } else {
                setUserExists(false);
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const user = {
                    username: username,
                    email: email,
                    password: hashedPassword
                }

                axios.post('http://127.0.0.1:8000/api/users', user).then((res) => {
                    navigate('/users');
                })
            }
        } catch (error) {
            console.log(error)
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
                                                <p>Create New User Now </p>
                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form2Example11" className="form-control"
                                                        placeholder="Username"
                                                        onChange={(event) => setUsername(event.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example11">Username</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="form2Example11" className="form-control"
                                                        placeholder="Email Address"
                                                        onChange={(event) => setEmail(event.target.value)}
                                                    />
                                                    <label className="form-label" htmlFor="form2Example11">Email Address</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example22"
                                                        className="form-control"
                                                        onChange={(event) => setPassword(event.target.value)}

                                                    />
                                                    <label className="form-label" htmlFor="form2Example22">Password</label>
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"
                                                        onClick={add}
                                                    >
                                                        Create New User
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

export default AddUser