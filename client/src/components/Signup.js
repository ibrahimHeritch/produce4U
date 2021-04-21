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
        farm_name:'',
        error:'ALL OK',
        user:null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isValidInput = this.isValidInput.bind(this);
  }
  /////TODO: do more input validation
  isValidInput(){
    if(this.state.pass1 != this.state.pass2){
      this.setState({error: "Passwords Don't match"})
      return false;
    }
    if(this.state.pass1.length < 8){
      console.log("Password Should be at least 8 characters long")
      this.setState({error: "Password Should be at least 8 characters long"})
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
    if(this.state.farm_name == '' && this.state.userType == "PRODUCER"){
      this.setState({error: "Must include Farm Name"})
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
    console.log("this is being called");
    return fetch("http://localhost:9000/login?username=" +this.state.username+"&password="+this.state.pass1)
        .then(res => res.text())
        .then(res => this.setState({user:JSON.parse(res)}))
        .then(res => this.state.user != null)
        .catch(err => err);
  }
  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  async handleSubmit(event){
      event.preventDefault()

      if(this.isValidInput() && await this.trySignup() && (await this.tryLogin())){

          localStorage.setItem('user',JSON.stringify({username:this.state.user.username,type:this.state.user.account_type,token:null}))
          this.props.onLogin({username:this.state.user.username,type:this.state.user.account_type,token:null})
          window.location.href = "http://localhost:3000/Login";
      }else{
        //// TODO: Display a message to tell user what they did wrong

        console.log(this.state)
      }



  }
 //// TODO: Add CSS to this thing
  render() {
    return(
      <div className="App">

        <p className="App-intro">Sign up:</p>
        <form >
            <label >I am a: </label>
            <select name="userType" onChange={this.handleChange}><option value = "USER">Customer</option><option value = "PRODUCER">Producer</option></select>
            <label>Username:</label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
            <label>First Name:</label>
            <input name="fname" type="text" value={this.state.fname}  onChange={this.handleChange}/>
            <label>Last Name:</label>
            <input name="lname" type="text" value={this.state.lname} onChange={this.handleChange} />
            <label >Email:</label>
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
            { this.state.userType == "PRODUCER" &&
            <label>Farm Name:</label>
            }
            { this.state.userType == "PRODUCER" &&
            <input name="farm_name" type="text" value={this.state.farm_name} onChange={this.handleChange} />
            }
            <label >Password:</label>
            <input name="pass1" type="Password" value={this.state.pass1} onChange={this.handleChange} />
            <label >Password:</label>
            <input name="pass2" type="Password" value={this.state.pass2} onChange={this.handleChange} />
            <input type="submit" value="Sign Up" onClick = {this.handleSubmit} />
        </form>
        <p style={{color:'red'}}>{this.state.error == "ALL OK"? '':this.state.error}</p>
      </div>
    );
  }
}


export default SignupPage;
