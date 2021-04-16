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
      {imageSrc: "https://image.sciencenordic.com/1440035.jpg?imageId=1440035&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630",
       name: "Organic Corn",
       price: 1.5,
       pricingType: "per Lb",
       distance: 30,
       stars: 3.5,
       producer: "Perdu Farms",
       dir: "left"
      },
      {imageSrc: "https://www.arabind.com/app/f/m/e/pimage/r_0/A108885/62104/FRESH@1%20500g%20SEA%20BASS.JPG",
       name: "Fresh Fish",
       price: 5.5,
       pricingType: " Each",
       distance: 55,
       stars: 5,
       producer: "Farma Fish",
       dir: "right"
      },
      {imageSrc: "https://previews.123rf.com/images/andreadonetti/andreadonetti1209/andreadonetti120900057/15471596-a-glass-jar-of-fresh-healthy-golden-honey-being-dispensed-with-a-metal-dipper-or-drizzler.jpg",
       name: "Golden Honey",
       price: 45.5,
       pricingType: " per Oz",
       distance: 23,
       stars: 5,
       producer:"Buzn'BeeZ"
      },
      {imageSrc: "https://image.sciencenordic.com/1440035.jpg?imageId=1440035&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630",
       name: "Organic Corn",
       price: 1.5,
       pricingType: " per Lb",
       distance: 30,
       stars: 3.5,
       producer: "Perdu Farms"
      },
      {imageSrc: "https://www.arabind.com/app/f/m/e/pimage/r_0/A108885/62104/FRESH@1%20500g%20SEA%20BASS.JPG",
       name: "Fresh Fish",
       price: 5.5,
       pricingType: " Each",
       distance: 55,
       stars: 5,
       producer: "Farma Fish"
      },
      {imageSrc: "https://previews.123rf.com/images/andreadonetti/andreadonetti1209/andreadonetti120900057/15471596-a-glass-jar-of-fresh-healthy-golden-honey-being-dispensed-with-a-metal-dipper-or-drizzler.jpg",
       name: "Golden Honey",
       price: 45.5,
       pricingType: " per Oz",
       distance: 23,
       stars: 5,
       producer:"Buzn'BeeZ"
      }
    ]};
  }


  render() {
    return(
      <div style={{marginTop: "-50px"}}>
        <img src = {image} alt="freshproduce" style ={{width: "100%",height: "100%"}} />
        <br /><br />
        <Search />Browse Available Produce{'   '}<Schedule />Schedule a pick up time{'   '}<Commute />Pick up your Produce{'   '}<Eat />Enjoy your fresh local Produce
        <br /><br />
        <form ><input type ='text' name ="search" placeholder="Search"/>{' '}<select name="distance"><option value = "50">50 miles</option></select>{' '}<input type ='text' name ="location" placeholder="Location"/></form>
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
        <button type="button">More</button>
      </div>
    );
  }
}


export default HomePage;
