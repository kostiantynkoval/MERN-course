import React, {Fragment, useContext, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

const Navbar = () => {
    useEffect(() => {
        const elems = document.querySelectorAll('.sidenav');
        window.M.Sidenav.init(elems);
    }, [])
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = evt => {
        evt.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <Fragment>
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <span className="brand-logo">Shorten Links</span>
                    <a href="/" onClick={event => {event.preventDefault()}} data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">=</i>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/create">Create</NavLink></li>
                        <li><NavLink to="/links">Links</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
        </Fragment>


    );
};

export default Navbar;