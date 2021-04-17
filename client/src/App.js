import React, {Component} from 'react';
import logo from './resources/noBngLogo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ProductPage from './components/ProductPage.js';
import ReservePage from './components/ReservePage.js';
import ConfirmationPage from './components/ConfirmationPage.js';
import MyReservationsPage from './components/MyReservationsPage.js'
import PostProductPage from './components/PostProductPage.js';
import MyproductsPage from './components/myproductsPage.js'
import HomePage from './components/HomePage.js';
import ProducerProfilePage from './components/ProducerProfilePage.js';
import SignupPage from './components/Signup.js';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




class App extends Component{
  constructor(props){
    super(props);
    this.state = {apiResponse: ["test failed no API"], value: "", userAccount:JSON.parse(localStorage.getItem('user'))};
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.callAPI();
  }

  callAPI(){
    fetch("http://localhost:9000/test")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: JSON.parse(res)}))
      .catch(err => err);
  }

  handleSubmit(event){
    fetch("http://localhost:9000/test", { method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

  }


  getTestValues(){
    return this.state.apiResponse.map(item => {return <p> {item.value} </p>;});
  }

  handleValueChange(event){
    this.setState({value: event.target.value});
  }
  render() {
    return(
      <div className="App">
        <Header user={this.state.userAccount}/>
        <Router>
          <div style={{minHeight:"90vh", paddingBottom:"180px", paddingTop:"50px"}}>


            <Switch>
              <Route path ="/home">
                <HomePage user={this.state.userAccount}/>
              </Route>
              <Route path="/Login">
                <LoginPage user={this.state.userAccount} onLogin={(user)=>{this.setState({userAccount:user})}}/>
              </Route>
              <Route path="/Signup">
                <SignupPage user={this.state.userAccount} onLogin={(user)=>{this.setState({userAccount:user})}}/>
              </Route>
              <Route path="/PostProduct">
                            <PostProductPage user={this.state.userAccount}/>
              </Route>
              <Route path="/MyProduct">
                            <MyproductsPage user={this.state.userAccount}/>
              </Route>

              <Route path="/reserve">
                <ReservePage user={this.state.userAccount}/>
              </Route>

              <Route path="/Product">
                  <ProductPage user={this.state.userAccount}/>
              </Route>

              <Route path="/Confirmation">
                  <ConfirmationPage user={this.state.userAccount}/>
              </Route>

              <Route path="/myReservations">
                  <MyReservationsPage user={this.state.userAccount}/>
              </Route>

              <Route path="/ProducerProfilePage">
                <ProducerProfilePage user={this.state.userAccount}/>
              </Route>

              <Route path="/Debug">
              <div>

                <ul> {this.getTestValues()} </ul>

                <form onSubmit = {this.handleSubmit}>
                    <label for="fname">Test Database: </label>
                    <input type="text" id="fname" name="fname"onChange={this.handleValueChange} />
                    <input type="submit" value="Submit" />
                  </form>

                  <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/Login">Login</a></li>
                    <li><a href="/PostProduct">Post Product</a></li>
                    <li><a href="/MyProduct">My Products</a></li>
                    <li><a href="/reserve">Reserve a Product</a></li>
                    <li><a href="/Product">View a Product</a></li>
                    <li><a href="/Confirmation">Confirmation Page</a></li>
                    <li><a href="/myReservations">my Reservations</a></li>
                    <li><a href="/ProducerProfilePage">My Profile</a></li>
                  </ul>
              </div>
              </Route>
              <Route path="/">
                <HomePage user={this.state.userAccount}/>
              </Route>

            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}


export default App;
