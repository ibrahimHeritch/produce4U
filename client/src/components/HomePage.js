import React, {Component} from 'react';
import image from '../resources/pictures/fresh-produce.jpg';
import {ReactComponent as Search} from '../resources/Icons/search-24px.svg';
import {ReactComponent as Schedule} from '../resources/Icons/schedule-24px.svg';
import {ReactComponent as Commute} from '../resources/Icons/commute-24px.svg';
import {ReactComponent as Eat} from '../resources/Icons/restaurant-24px.svg';
import ProduceCard from '../components/ProduceCard'
import Geocode from "react-geocode";




class HomePage extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getProduceCards = this.getProduceCards.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      product_type:"ALL",
      produce:null,
      error:"ALL OK",
      search:null,
      distance:"50",
      location:null,
      longitude:null,
      latitude:null
    };
  }

  handleClick(event){
    this.setState({
        product_type: event.target.value
    },
    this.submitSearch)
  }

  submitSearch(){
    console.log(this.state.latitude,this.state.longitude)
    fetch("http://localhost:9000/Search?product_type="+this.state.product_type+"&search="+this.state.search+"&longitude="+this.state.longitude+"&latitude="+this.state.latitude+"&distance="+this.state.distance)
      .then(res => res.text())
      .then(res => this.setState({error:JSON.parse(res).error, produce: JSON.parse(res).result}))
      .catch(err => err);
  }
  handleChange(event) {
      if(event.target.name == "location"){
        Geocode.setApiKey('AIzaSyDiAVMs1DJpi5C8bkFHY2WZ6DTDq7K0pU0');
        Geocode.fromAddress(event.target.value).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;

              this.setState({
                  longitude:lng,
                  latitude:lat
                })
            },
            (error) => {
              console.error(error);
            }
          )
      }
      this.setState({
          [event.target.name]: event.target.value
      })


  }

  componentDidMount(){
      fetch("http://localhost:9000/Search?product_type="+this.state.product_type)
        .then(res => res.text())
        .then(res => this.setState({error:JSON.parse(res).error, produce: JSON.parse(res).result}))
        .catch(err => err);
  }

  handleKeyDown(ev){
    if(ev.keyCode ===13){ // enter button
      this.submitSearch()
    }
  }

////This function maps produce to the cards and returns a list of produce cards
  getProduceCards(){
    return this.state.produce.map(item => {return <ProduceCard product = {item} /> ;});

  }

  render() {
     if(this.state.produce==null){
       return <p>Loading....</p>
     }
     if(this.state.error!="ALL OK"){
       return <p style={{color:'red'}}>{this.state.error}</p>
     }
      return(
        <div onKeyDown={this.handleKeyDown} style={{marginTop: "-50px", marginBottom:"-100px"}}>
          <img src = {image} alt="freshproduce" style ={{width: "100%",height: "600px",objectFit:"cover"}} />
          <br /><br />

            <div className = "produce4U-textForIcons-greenText"><Search />Browse <span className = "produce4U-textForIcons-blackText">Available Produce{'   '}</span><Schedule />Schedule<span className="produce4U-textForIcons-blackText"> A Pick-Up Time{'   '}</span><Commute />Pick-Up<span className="produce4U-textForIcons-blackText"> Your Produce{'   '}</span><Eat />Enjoy<span className="produce4U-textForIcons-blackText"> Your Fresh Local Produce</span></div>
        <br /><br />
          <p className = "produce4U-headlineWelcome">Fresh. Healthy. Local.</p>
          <form ><input className="produce4U-form-input" type ='text' name ="search" placeholder="Search" onChange={this.handleChange}/>{' '}<select className="produce4U-distance-button" name="distance" onChange={this.handleChange}><option value = "50">50 miles</option><option value = "100">100 miles</option><option value = "150">150 miles</option></select>{' '}<input className="produce4U-form-input" type ='text' name ="location" placeholder="Location" onChange={this.handleChange}/></form>
          <br />

          <div>
            <button type="button" className="produce4U-green-button" onClick={this.handleClick} value="ALL">All Products</button> {' '}
            <button type="button" className="produce4U-green-button" onClick={this.handleClick} value="VEGETABLE">Vegetables</button> {' '}
            <button type="button" className="produce4U-green-button" onClick={this.handleClick} value="FRUITS">Fruits</button> {' '}
            <button type="button" className="produce4U-green-button" onClick={this.handleClick} value="BREAD">Bread</button> {' '}
            <button type="button" className="produce4U-green-button" onClick={this.handleClick} value="JUICES">Juices</button> {' '}
            <button type="button" className="produce4U-green-button" onClick={this.handleClick} value="TEA">Tea</button>
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
