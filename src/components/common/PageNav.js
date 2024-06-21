import { Pagination } from 'antd';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </>
      ) : (
        <button onClick={loginWithRedirect}>Login</button>
      )}
    </nav>
  );
};



export default Navigation;
