import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';

const Header = () => {
  return(
    <React.Fragment>
      <AppBar position="relative">
        <div className="navLinks">
          <Link to='/'><h3>Home</h3></Link>
          <Link to='/log'><h3>Log</h3></Link>
        </div>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
