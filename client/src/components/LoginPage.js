import React, {Component} from 'react';
import logo from '../resources/noTextLogo.svg';
import '../App.css';
import '../styles/LoginPage.css';
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
        .then(res => this.setState({error:JSON.parse(res).error,user:JSON.parse(res).result}))
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
      }
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
        <div className="produce4U-blackLoginText">
          <p className="App-intro"></p>
            <p className="App-intro">Log In:</p>
          <form onSubmit = {this.handleSubmit} >
              <input className = "produce4U-form-inputLogin" name="username" type="text" placeholder="Username" onChange={this.handleChange} value={this.state.username}/>
              <br></br><br></br>
              <input className = "produce4U-form-inputLogin" name="password" type="Password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
              <br></br><br></br>
              <input className = "produce4U-green-button-submit" type="submit" value="Login" onClick = {this.handleSubmit}/>
          </form>
            <div>
                <p className = "produce4U-regularText">Don't have an account? <span className="produce4U-blackBoldText">Sign Up!</span> </p>
                <p className = "produce4U-blackBoldText">Forgot Your Password?</p>
            </div>
          <p style={{color:'red'}}>{this.state.error == "ALL OK"? '':this.state.error}</p>
        </div>

      );
    }

  }
}


export default LoginPage;
