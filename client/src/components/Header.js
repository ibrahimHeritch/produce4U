import React, {Component} from 'react';
import logo from '../resources/headerLogo.png';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/header.css';
import socket from "../chatService.js";

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      unread_messages: 0
    }
    this.logoutifLoggedin = this.logoutifLoggedin.bind(this);

  }

  componentDidMount(){
    if(this.props.user){
      console.log("Emiting new message")
      socket.emit('Request Unread Message', this.props.user.username)
      socket.removeAllListeners();

      socket.on('Unread Messages:'+this.props.user.username, (messages) => {
          console.log(messages)
          this.setState({unread_messages:messages})
      })
    }

  }

  componentDidUpdate(){
    if(this.props.user){
      socket.removeAllListeners();

      socket.on('Unread Messages:'+this.props.user.username, (messages) => {
          console.log(messages)
          this.setState({unread_messages:messages})
        })
    }
  }

  logoutifLoggedin(){

    if(this.props.user != null){

        localStorage.removeItem('user')
        this.props.onLogout()
        window.location.href = "http://localhost:3000/Login";
      }
    window.location.href = "http://localhost:3000/Login";
  }

  render() {

    if(this.props.user == null){
      return(
        <Navbar className="navbar ">

            <div className="header-left">
              <a href="/Home" className="header-item">
                <p>Home</p>
              </a>
              <a className="header-item" href="/">
                    <p>About Us</p>
              </a>

            </div>
            <div className="header-center">
              <img className="header-logo" src={logo} />
            </div>
            <div className="header-right">
              <a className="header-item" href="/Signup">
                <p>Sign Up</p>
              </a>
              <a class="btn header-button" onClick={this.logoutifLoggedin} >
                {this.props.user == null? "Log In" : "Log Out"}
              </a>
            </div>

        </Navbar>
      );
    }else if (this.props.user.type == "USER") {
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
            <a className="header-item" href="/Chat/ALL">

              <p>
              <span>Messages</span>
              {this.state.unread_messages != 0 && <span className="chat-unread-messages">{this.state.unread_messages}</span>}
              </p>
            </a>
              <a className="header-item" href="/myProfile">
                <p>My Profile</p>
              </a>
              <a class="btn header-button" onClick={this.logoutifLoggedin} >
                {this.props.user == null? "Log In" : "Log Out"}
              </a>
            </div>

        </Navbar>
      );
    }else if(this.props.user.type == "PRODUCER"){
      return(
        <Navbar className="navbar ">

            <div className="header-left">
              <a href="/Home" className="header-item">
                <p>Home</p>
              </a>
              <a className="header-item" href="/MyProduct">
                    <p>My Produce</p>
              </a>
              <a className="header-item" href="/myReservations">
                    <p>Reservations</p>
              </a>
            </div>
            <div className="header-center">
              <img className="header-logo" src={logo} />
            </div>
            <div className="header-right">
              <a className="header-item" href="/PostProduct">
                <p>Add Product</p>
              </a>
              <a className="header-item" href="/Chat/ALL">

                <p>
                <span>Messages</span>
                {this.state.unread_messages != 0 && <span className="chat-unread-messages">{this.state.unread_messages}</span>}
                </p>
              </a>
              <a className="header-item" href="/myProfile">
                <p>Profile</p>
              </a>
              <a class="btn header-button" onClick={this.logoutifLoggedin}>
                {this.props.user == null? "Log In" : "Log Out"}
              </a>
            </div>

        </Navbar>

      );
    }else {
      return(
        <Navbar className="navbar ">
        <a class="btn header-button" onClick={this.logoutifLoggedin}>
          {this.props.user == null? "Log In" : "Log Out"}
        </a>
        </Navbar>
      );
    }

  }

}

export default Header;
