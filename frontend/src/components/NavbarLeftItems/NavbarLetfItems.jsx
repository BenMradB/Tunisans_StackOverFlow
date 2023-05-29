import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLeftItems = () => {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" to='/users'>
                        Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/posts'>
                        Posts
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default NavbarLeftItems