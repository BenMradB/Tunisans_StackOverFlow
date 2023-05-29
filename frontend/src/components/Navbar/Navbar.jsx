import './Navbar.css'
import Login from '../Auth/Login/Login'
import User from '../User/User'
import NavbarRightItems from '../NavbarRightItems/NavbarRightItems'
import { Link, Route, Routes } from 'react-router-dom'
import Register from '../Auth/Register/Register'
import EditUser from '../EditUser.jsx/EditUser'
import AddUser from '../AddUser/AddUser'
import Post from '../Post/Post'
import AddPost from '../AddPost/AddPost'
import Answer from '../Answer/Answer'
import NavbarLeftItems from '../NavbarLeftItems/NavbarLetfItems'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* Container wrapper */}
                <div className="container-fluid">
                    {/* Toggle button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Navbar brand */}
                        <Link to='/' className="link">
                            <div className="navbar-brand mt-2 mt-lg-0"
                                style={
                                    {
                                        width: '50px',
                                        height: '50px',
                                        background: '#FFF',
                                        borderRadius: '50%'
                                    }
                                }
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    height="15"
                                    alt="MDB Logo"
                                    loading="lazy"
                                    style={
                                        {
                                            width: '100%',
                                            height: '100%'
                                        }
                                    }
                                />
                            </div>
                        </Link>
                        {/* Left links */}
                        <NavbarLeftItems />
                        {/* Left links */}
                    </div>
                    {/* Collapsible wrapper */}

                    {/* Right elements */}
                        <NavbarRightItems />
                    {/* Right elements */}
                </div>
                {/* Container wrapper */}
            </nav>

            <Routes>
                <Route path='/users' element={<User />} />
                <Route path='/dshb' element={<User />} />
                <Route path='/login' element={<Login />} />
                <Route path='/posts' element={<Post />} />
                <Route path='/register' element={<Register />} />
                <Route path='/edit-user' element={<EditUser />} />
                <Route path='/add-user' element={<AddUser />} />
                <Route path='/add-post' element={<AddPost />} />
                <Route path='/answering/post' element={<Answer />} />
            </Routes>
        </>
    )
}

export default Navbar