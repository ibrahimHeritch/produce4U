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
    fetch("http://localhost:9000/Search?product_type="+event.target.value)
      .then(res => res.text())
      .then(res => this.setState({produce: JSON.parse(res)}))
      .catch(err => err);
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

            <div className = "produce4U-textForIcons-greenText"><Search />Browse <span className = "produce4U-textForIcons-blackText">Available Produce{'   '}</span><Schedule />Schedule<span className="produce4U-textForIcons-blackText"> A Pick-Up Time{'   '}</span><Commute />Pick-Up<span className="produce4U-textForIcons-blackText"> Your Produce{'   '}</span><Eat />Enjoy<span className="produce4U-textForIcons-blackText"> Your Fresh Local Produce</span></div>
        <br /><br />
          <p className = "produce4U-headlineWelcome">Fresh. Healthy. Local.</p>
          <form ><input className="produce4U-form-input" type ='text' name ="search" placeholder="Search"/>{' '}<select className="homepage-dropdown-input" name="distance"><option value = "50">50 miles</option></select>{' '}<input className="produce4U-form-input" type ='text' name ="location" placeholder="Location"/></form>
          <br />

          <div>
            <button type="button" onClick={this.handleClick} value="ALL">All Products</button> {' '}
            <button type="button" onClick={this.handleClick} value="VEGETABLE">Vegetables</button> {' '}
            <button type="button" onClick={this.handleClick} value="FRUITS">Fruits</button> {' '}
            <button type="button" onClick={this.handleClick} value="BREAD">Bread</button> {' '}
            <button type="button" onClick={this.handleClick} value="JUICES">Juices</button> {' '}
            <button type="button" onClick={this.handleClick} value="TEA">Tea</button>
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
