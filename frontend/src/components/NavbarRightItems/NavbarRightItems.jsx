import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavbarRightItems = () => {
    const navigate = useNavigate();
    const [logged, setLogged] = useState(true);
    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        setLogged(false)
    }

    useEffect(() => {
        if (!logged) {
            navigate('/login');
        }
    }, [logged, navigate]);

    return (
        <>
            <div className="d-flex align-items-center">
                {/* Icon */}
                <Link className="text-reset me-3" to=''>
                    <i className="fas fa-shopping-cart"></i>
                </Link>

                {/* Notifications */}
                <div className="dropdown">
                    <Link
                        className="text-reset me-3 dropdown-toggle hidden-arrow"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="fas fa-bell"></i>
                        <span className="badge rounded-pill badge-notification bg-danger">
                            1
                        </span>
                    </Link>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <li>
                            <Link className="dropdown-item" href="#">
                                Some news
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" href="#">
                                Another news
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" href="#">
                                Something else here
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Avatar */}
                <div className="dropdown">
                    <Link
                        className="dropdown-toggle d-flex align-items-center hidden-arrow"
                        href="#"
                        id="navbarDropdownMenuAvatar"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                            className="rounded-circle"
                            height="25"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                    </Link>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuAvatar"
                    >
                        <li>
                            <Link className="dropdown-item" href="#">
                                My profile
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" href="#">
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" href="#" onClick={logout}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavbarRightItems