import React, {Component} from 'react';
import logo from '../resources/noTextLogo.svg';
import '../App.css';


class LoginPage extends Component{

  
  render() {
    return(
      <div className="App">
        <p className="App-intro">Edit components/LoginPage.js to change</p>
        <p className="App-intro">Log In:</p>
        <form action="/action_login">
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname" />
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname" />
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


export default LoginPage;
