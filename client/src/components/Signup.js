import React, {Component} from 'react';
import logo from '../resources/noTextLogo.svg';
import '../App.css';
import '../styles/Signup.css';


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
        .then(res => this.setState({user:JSON.parse(res).result}))
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

        console.log(this.state)
      }



  }
 //// TODO: Add CSS to this thing
  render() {
    return(
      <div className="App">

        <p className="produce4U-blackSignUpText">Sign up:</p>
        <form >
            <label className="produce4U-blackBoldTextSignUp" >I am a: </label>
            <select name="userType" onChange={this.handleChange}><option value = "USER">Customer</option><option value = "PRODUCER">Producer</option></select>
            <br></br>
            <input className = "produce4U-form-inputSignupName" name="fname" type="text" placeholder = "First Name" value={this.state.fname}  onChange={this.handleChange}/>
            <input className = "produce4U-form-inputSignupName" name="lname" type="text" placeholder = "Last Name" value={this.state.lname} onChange={this.handleChange} />
            <br></br>
            <input className = "produce4U-form-inputSignup" name="username" type="text" placeholder = "Username" value={this.state.username} onChange={this.handleChange}/>
            <br></br>
            <input className = "produce4U-form-inputSignup" name="email" type="text" placeholder = "Email" value={this.state.email} onChange={this.handleChange} />
            <br></br>
            { this.state.userType == "PRODUCER" &&
            <label>Farm Name:</label>
            }
            { this.state.userType == "PRODUCER" &&
            <input name="farm_name" type="text" value={this.state.farm_name} onChange={this.handleChange} />
            }
            <input className = "produce4U-form-inputSignup" name="pass1" type="Password" placeholder =  "Password" value={this.state.pass1} onChange={this.handleChange} />
            <input className = "produce4U-form-inputSignup" name="pass2" type="Password" placeholder = "Retype your password" value={this.state.pass2} onChange={this.handleChange} />
            <br></br>
            <input className = "produce4U-green-button-submit" type="submit" value="Sign Up" onClick = {this.handleSubmit} />
        </form>
          <div>
              <p className = "produce4U-regularTextSignUp">Already have an account? <span className="produce4U-blackBoldTextSignUp">Log in!</span> </p>
              <p className = "produce4U-blackBoldTextSignUp">Forgot Your Password?</p>
          </div>
        <p style={{color:'red'}}>{this.state.error == "ALL OK"? '':this.state.error}</p>

      </div>
    );
  }
}


export default SignupPage;
