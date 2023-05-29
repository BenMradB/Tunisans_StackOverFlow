import axios from 'axios';
import Alert from '../../Alerts/Alert';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import bcrypt from 'bcryptjs'
import '../Login.css';
import User from '../../User/User';

const LoginCode = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [unAuth, setUnAuth] = useState('Auth');
  const [errorMsg, setErrorMsg] = useState('')
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users').then(res => {
      setUsers(res.data['hydra:member']);
    })
  }, [])

  const login = async () => {
    const exists = users.filter(user => user.email === email)[0]

    if (!exists) {
      setUnAuth('UnAuth');
      setErrorMsg(`There is no account under that email : [ ${email} ]`)
    } else {
      if (! await bcrypt.compare(password, exists.password)) {
        setUnAuth('UnAuth');
        setErrorMsg(`Wrong Email Or Password`)
      } else {
        setIsAuth(true);
        setUnAuth('Auth');
        localStorage.setItem('userId', exists.id);
        localStorage.setItem('userRole', exists.role);

        navigate('/dshb')
      }
    }
  }
  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              {unAuth === 'UnAuth' ? <Alert error={errorMsg} /> : ''}
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
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example11" className="form-control"
                            placeholder="Email Adress"
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
                            onClick={login}
                          >Log
                            in</button>
                          <a className="text-muted" href="#!">Forgot password?</a>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to='/register' className="link" state={users}>
                            <button type="button" className="btn btn-outline-danger">Create new</button>
                          </Link>
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

const Login = () => {
  return (
    <>
      {
        localStorage.getItem('userId') === null ? <LoginCode /> : <User />
      }
    </>
  )
}

export default Login