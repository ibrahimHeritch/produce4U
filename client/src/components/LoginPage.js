import React, {Component} from 'react';
import logo from '../resources/noTextLogo.svg';
import '../App.css';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        username:'',
        password:'',
        user : null,
        error: "ALL OK"
    }
  }

/////TODO; validate input
  isValidInput(){
      return true;
  }

  tryLogin(){
    return fetch("http://localhost:9000/login?username=" +this.state.username+"&password="+this.state.password)
        .then(res => res.text())
        .then(res => this.setState({user:JSON.parse(res)}))
        .then(res => this.state.user != null)
        .catch(err => err);
  }

  async handleSubmit(event){
    event.preventDefault()
    if(this.isValidInput()){
      var isLoggedin = await this.tryLogin()
      if(isLoggedin){
        console.log(this.state.user)
        localStorage.setItem('user',JSON.stringify({username:this.state.user.username,type:this.state.user.account_type,token:null}))
        this.props.onLogin({username:this.state.user.username,type:this.state.user.account_type,token:null})
      }else{
        this.setState({error:"Username or Password Are worng"})
      }
    }else{
      //// TODO: Display a message to tell user what they did wrong

    }

  }

  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

/////TODO: CSS it up
  render() {
    if(this.props.user!=null){
        return <Redirect to='/Home' />
    }else{
      return(
        <div className="App">
          <p className="App-intro">Edit components/LoginPage.js to change</p>
          <p className="App-intro">Log In:</p>
          <form onSubmit = {this.handleSubmit} >
              <label>Username:</label>
              <input type="text" name="username" onChange={this.handleChange} value={this.state.username} />
              <label>Password:</label>
              <input type="Password" name="password" onChange={this.handleChange} value={this.state.password} />
              <input type="submit" value="Submit" onClick = {this.handleSubmit}/>
          </form>
          <p style={{color:'red'}}>{this.state.error == "ALL OK"? '':this.state.error}</p>
        </div>
      );
    }

  }
}


export default LoginPage;
