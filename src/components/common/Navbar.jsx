import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">Irrigation System</div>
                <ul className="nav-links">
                    <Link to={'/'}>
                        <li>Home</li>
                    </Link>
                    <Link to={'/about'}>
                        <li>About</li>
                 
                    </Link>

                    <Link to={'/services'}>
                        <li>Services</li>
                    </Link>

                    <Link to={'/contactus'}>
                        <li>Contact</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;