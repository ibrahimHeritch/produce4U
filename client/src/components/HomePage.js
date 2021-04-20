import React, {Component} from 'react';
import image from '../resources/pictures/fresh-produce.jpg';
import {ReactComponent as Search} from '../resources/Icons/search-24px.svg';
import {ReactComponent as Schedule} from '../resources/Icons/schedule-24px.svg';
import {ReactComponent as Commute} from '../resources/Icons/commute-24px.svg';
import {ReactComponent as Eat} from '../resources/Icons/restaurant-24px.svg';
import ProduceCard from '../components/ProduceCard'




class HomePage extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.getProduceCards = this.getProduceCards.bind(this)

    this.state = {
      product_type:"ALL",
      produce:[]
    };
  }
  ////TODO: Filtering functionality
  handleClick(event){

  }

  componentDidMount(){
      fetch("http://localhost:9000/Search?product_type="+this.state.product_type)
        .then(res => res.text())
        .then(res => this.setState({produce: JSON.parse(res)}))
        .catch(err => err);
  }


////This function maps produce to the cards and returns a list of produce cards
  getProduceCards(){
    return this.state.produce.map(item => {return <ProduceCard product = {item} /> ;});

  }

  render() {
      return(
        <div style={{marginTop: "-50px", marginBottom:"-100px"}}>
          <img src = {image} alt="freshproduce" style ={{width: "100%",height: "600px",objectFit:"cover"}} />
          <br /><br />
          <Search />Browse Available Produce{'   '}<Schedule />Schedule a pick up time{'   '}<Commute />Pick up your Produce{'   '}<Eat />Enjoy your fresh local Produce
          <br /><br />
          <form ><input className="produce4U-form-input" type ='text' name ="search" placeholder="Search"/>{' '}<select className="homepage-dropdown-input" name="distance"><option value = "50">50 miles</option></select>{' '}<input className="produce4U-form-input" type ='text' name ="location" placeholder="Location"/></form>
          <br />
          <div>
            <button type="button" onClick={this.handleClick}>All Products</button> {' '}
            <button type="button" onClick={this.handleClick}>Vegetables</button> {' '}
            <button type="button" onClick={this.handleClick}>Fruits</button> {' '}
            <button type="button" onClick={this.handleClick}>Bread</button> {' '}
            <button type="button" onClick={this.handleClick}>Juices</button> {' '}
            <button type="button" onClick={this.handleClick}>Tea</button>
          </div>
          <br />
          <div style = {{ display: "grid", gridTemplateColumns: "400px 400px 400px", justifyContent:"space-evenly"}}>
            {((this.state.produce.length == 0)?<p>No Products in your area</p>:this.getProduceCards())}
          </div>
          <br />
          <button className="produce4U-green-button"type="button">More</button>
        </div>
      );


  }
}


export default HomePage;
