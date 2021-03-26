import React, {Component} from 'react';
import logo from '../resources/headerLogo.png';
import Navbar from 'react-bootstrap/Navbar';

class Header extends Component{
  render() {
    return(
      <Navbar className="navbar ">

          <div className="header-left">
            <a href="/Home" className="header-item">
              <p>Home</p>
            </a>
            <a className="header-item" href="/myReservations">
              <p>My Reservations</p>
            </a>
          </div>
          <div className="header-center">
            <img className="header-logo" src={logo} />
          </div>
          <div className="header-right">
            <a className="header-item" href="/myProfile">
              <p>My Profile</p>
            </a>
            <a class="btn header-button" href="/Login">
              Log Out
            </a>
          </div>

      </Navbar>
    );
  }

}

export default Header;
