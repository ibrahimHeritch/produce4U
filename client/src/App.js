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
import ProfilePage from './components/ProfilePage.js';
import EditProductPage from './components/EditProductPage.js';
import Chat from './components/Chat.js';
import ReportABug from './components/ReportABug.js';
import ReportedUser from './components/ReportedUser.js';
import Reports from './components/Reports.js';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import http from "./utils/http";

import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription
} from "./push-notifications";



class App extends Component{
  constructor(props){
    super(props);
    this.state = { userAccount:JSON.parse(localStorage.getItem('user'))};

  }


  render() {

    if(this.state.userAccount != null ){
      askUserPermission().then(consent => {

          if(consent == "granted"){
            registerServiceWorker()
            .then(createNotificationSubscription()
              .then( (userSubscription)=>{

                http.post("/subscription", {username: this.state.userAccount.username,request: userSubscription})


            })
          )
        }
      })
    }

    return(
      <div className="App">
        <Header user={this.state.userAccount} onLogout={()=>{this.setState({userAccount:null})}}/>
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
              <Route path="/report">
                            <ReportABug user={this.state.userAccount}/>
              </Route>
              <Route path="/reportReview">
                            <ReportedUser user={this.state.userAccount}/>
              </Route>
              <Route path="/reports">
                            <Reports user={this.state.userAccount}/>
              </Route>
              <Route path="/product/edit/:id" render={(props) => (<EditProductPage {...props} user={this.state.userAccount} />)}/>

              <Route path="/MyProduct" >
                            <MyproductsPage user={this.state.userAccount}/>
              </Route>


              <Route path="/reserve/:id" render={(props) => (<ReservePage {...props} user={this.state.userAccount} />)}/>

              <Route path="/product/:id" render={(props) => (<ProductPage {...props} user={this.state.userAccount} />)}/>

              <Route path="/Confirmation">
                  <ConfirmationPage user={this.state.userAccount}/>
              </Route>

              <Route path="/myReservations">
                  <MyReservationsPage user={this.state.userAccount}/>
              </Route>

              <Route path="/ProducerProfile/:username" component={ProducerProfilePage}>

              </Route>

              <Route path="/myProfile">
                <ProfilePage user={this.state.userAccount}/>
              </Route>

              <Route path="/Chat/:user" render={(props) => (<Chat {...props} user={this.state.userAccount} />)}/>


              <Route path="/Debug">
              <div>

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
