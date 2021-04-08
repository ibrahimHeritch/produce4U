import React, { Component } from 'react';


class myproductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    imageSrc: "https://image.sciencenordic.com/1440035.jpg?imageId=1440035&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630",
                    name: "Organic Corn",
                    price: 1.5,
                    pricingType: "Lb",
                    totalQuantity: 500,
                },
                {
                    imageSrc: "https://www.arabind.com/app/f/m/e/pimage/r_0/A108885/62104/FRESH@1%20500g%20SEA%20BASS.JPG",
                    name: "Fresh Fish",
                    price: 5.5,
                    pricingType: "Each",
                    totalQuantity: 550,
                },
                {
                    imageSrc: "https://previews.123rf.com/images/andreadonetti/andreadonetti1209/andreadonetti120900057/15471596-a-glass-jar-of-fresh-healthy-golden-honey-being-dispensed-with-a-metal-dipper-or-drizzler.jpg",
                    name: "Golden Honey",
                    price: 45.5,
                    pricingType: "Oz",
                    totalQuantity: 5000,
                },
            ]
        };
    }

    render() {
        return (

            //{ this.state.products[0].name }

            //<p className="App-intro">Edit components/PostProductPage.js to change</p>

        );
    }
}


export default myproductsPage;