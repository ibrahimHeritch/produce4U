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
    this.state = {product:[
      {imageSrc: "https://modernfarmer.com/wp-content/uploads/2018/07/how-to-grow-strawberries-1200x900.jpg",
       name: "Fresh Organic Strawberries",
       price: 3.6,
       pricingType: "per Oz.",
       distance: 30,
       stars: 3.5,
       producer: "Perdu Farms",

      },
      {imageSrc: "https://www.dayimaanfresheats.com/wp-content/uploads/2020/07/nati-egg.jpg",
       name: "Brown Eggs",
       price: 5.5,
       pricingType: " per Dz",
       distance: 55,
       stars: 5,
       producer: "Crack Eggs",
      },
      {imageSrc: "https://savannahbee.com/product_images/uploaded_images/savannah-bee-company-raw-acacia-honeycomb-easy-ways-to-eat.jpg",
       name: "Honeycomb",
       price: 4.5,
       pricingType: " per Oz",
       distance: 23,
       stars: 5,
       producer:"Buzn'BeeZ"
      },
      {imageSrc: "https://image.sciencenordic.com/1440035.jpg?imageId=1440035&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630",
       name: "Organic Corn",
       price: 1.5,
       pricingType: " per Lb",
       distance: 33,
       stars: 3.5,
       producer: "Perdu Farms"
      },
      {imageSrc: "https://www.mediastorehouse.com/p/191/freshly-caught-fish-port-negombo-sri-lanka-asia-10536760.jpg",
       name: "Fresh Fish",
       price: 5.5,
       pricingType: " Each",
       distance: 105,
       stars: 5,
       producer: "Farma Fish"
      },
      {imageSrc: "https://previews.123rf.com/images/andreadonetti/andreadonetti1209/andreadonetti120900057/15471596-a-glass-jar-of-fresh-healthy-golden-honey-being-dispensed-with-a-metal-dipper-or-drizzler.jpg",
       name: "Golden Honey",
       price: 5.5,
       pricingType: " per Oz",
       distance: 23,
       stars: 5,
       producer:"Buzn'BeeZ"
      }
    ]};
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
          <button type="button">All Products</button> {' '}
          <button type="button">Vegetables</button> {' '}
          <button type="button">Fruits</button> {' '}
          <button type="button">Bread</button> {' '}
          <button type="button">Juices</button> {' '}
          <button type="button">Tea</button>
        </div>
        <br />
        <div style = {{display: "inline-block"}}>
        <ProduceCard product = {this.state.product[0]} />
        <ProduceCard product = {this.state.product[1]} />
        <ProduceCard product = {this.state.product[2]} />
        </div>
        <br />
        <div style = {{display: "inline-block"}}>
        <ProduceCard product = {this.state.product[3]} />
        <ProduceCard product = {this.state.product[4]} />
        <ProduceCard product = {this.state.product[5]} />
        </div>
        <br />
        <button className="produce4U-green-button"type="button">More</button>
      </div>
    );
  }
}


export default HomePage;
