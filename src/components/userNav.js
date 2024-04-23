import React from 'react';
import { Link } from 'react-router-dom'; // Changed from BrowserRouter to Link

const userNav = () => {
    const handleLogout=()=>{
        localStorage.removeItem('accessToken');
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'}>
            Pdf Summarizer
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"onClick={handleLogout}>
                <Link className="nav-link" to={'/sign-in'}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default userNav;
