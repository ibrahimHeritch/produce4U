import React, {Component} from 'react';
import logo from '../resources/noTextLogo.svg';
import '../App.css';


class SignupPage extends Component{
  constructor(props){
    super(props);
    this.state = {
        username:'',
        fname:'',
        lname:'',
        email:'',
        pass1:'',
        pass2:'',
        userType:'USER',
        profile_picture:null,
        error:'ALL OK',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /////TODO: do more input validation
  isValidInput(){
    if(this.state.pass1 != this.state.pass2){
      this.setState({error: "Passwords Don't match"})
      return false;
    }
    if(this.state.username == ''){
      this.setState({error: "Must include username"})
      return false;
    }
    if(this.state.email == ''){
      this.setState({error: "Must include Email"})
      return false;
    }
    return true;
  }
  trySignup(){
    return fetch("http://localhost:9000/signup?state=" + JSON.stringify(this.state))
        .then(res => res.text())
        .then(res => this.setState({error: JSON.parse(res)}))
        .then(res => this.state.error == "ALL OK")
        .catch(err => err);
  }
  tryLogin(){
    return fetch("http://localhost:9000/login?username=" +this.state.username+"&password="+this.state.pass1)
        .then(res => res.text())
        .then(res => JSON.parse(res))
        .catch(err => err);
  }
  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleSubmit(event){
      if(this.isValidInput() && this.trySignup() && this.tryLogin()){
        localStorage.setItem('user',JSON.stringify({username:this.state.username,type:this.state.userType,token:null}))
        this.props.onLogin({username:this.state.username,type:this.state.userType,token:null})
      }else{
        //// TODO: Display a message to tell user what they did wrong
        event.preventDefault()
        console.log(this.state)
      }



  }
 //// TODO: Add CSS to this thing
  render() {
    return(
      <div className="App">

        <p className="App-intro">Sign up:</p>
        <form action="http://localhost:3000/Home"  onSubmit = {this.handleSubmit}>
            <label >I am a:</label>
            <select name="userType" onChange={this.handleChange}><option value = "USER">Customer</option><option value = "PRODUCER">Producer</option></select>
            <label>Username:</label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
            <label>First Name:</label>
            <input name="fname" type="text" value={this.state.fname}  onChange={this.handleChange}/>
            <label>Last Name:</label>
            <input name="lname" type="text" value={this.state.lname} onChange={this.handleChange} />
            <label >Email:</label>
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
            <label >Password:</label>
            <input name="pass1" type="Password" value={this.state.pass1} onChange={this.handleChange} />
            <label >Password:</label>
            <input name="pass2" type="Password" value={this.state.pass2} onChange={this.handleChange} />
            <input type="submit" value="Sign Up"  />
        </form>
        <p style={{color:'red'}}>{this.state.error == "ALL OK"? '':this.state.error}</p>
      </div>
    );
  }
}


export default SignupPage;
