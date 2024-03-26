import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginInfoContext from '../Context/LoginContext';

export default function Header() {
    const { email } = useContext(LoginInfoContext);

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Pdf Trimmer
                </Link>
                {!email && (
                    <Link className="navbar-brand" to="/login">
                        Login
                    </Link>
                )}
                {email && (
                    <Link className="navbar-brand" to="/login">
                        {email}
                    </Link>
                )}
            </div>
        </nav>
    );
}
