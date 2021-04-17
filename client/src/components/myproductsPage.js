import React, { Component } from 'react';
import "../styles/myreservations.css"

class MyproductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    imageSrc: "https://image.sciencenordic.com/1440035.jpg?imageId=1440035&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630",
                    name: "Blueberries",
                    price: 1.5,
                    pricingType: "Lb",
                    totalQuantity: 330,
                    status:"Active"
                },
                {
                    imageSrc: "https://www.arabind.com/app/f/m/e/pimage/r_0/A108885/62104/FRESH@1%20500g%20SEA%20BASS.JPG",
                    name: "Fresh Organic Strawberies",
                    price: 5.5,
                    pricingType: "Each",
                    totalQuantity: 550,
                    status:"Active"
                },
                {
                    imageSrc: "https://previews.123rf.com/images/andreadonetti/andreadonetti1209/andreadonetti120900057/15471596-a-glass-jar-of-fresh-healthy-golden-honey-being-dispensed-with-a-metal-dipper-or-drizzler.jpg",
                    name: "Golden Honey",
                    price: 45.5,
                    pricingType: "Oz",
                    totalQuantity: 5000,
                    status:"Paused"
                },
            ],
            header: ["Total Quantity","Price","Status","Actions"],
            widths: [200,115,50,50,190]
        };
    }

////TODO: make edit add and delete buttons do somehtingS
/////translates products into html elements
    getProducts(){
      return(
        this.state.products.map((item)=>(this.getRow(
                [<a href="/product"><p className=" table-row-product produce4U-greentext ">{item.name}</p></a>,
                 <p>{item.totalQuantity}</p>,
                 <p>${parseFloat(item.price).toFixed(2)}</p>,

                 <p>{item.status}</p>,
                 <div className="table-actions">

                      <a href="/confirmation"><p className="produce4U-bluetext table-row-product">Add</p></a>
                      <a href="/reserve"><button className="produce4U-green-button table-edit">Edit</button></a>
                      <button className="produce4U-red-button table-delete">Delete</button>
                 </div>]))

        )
      );
    }

////this function gets the haeder of the table
    getHeader(){
      return(
        <div className = "table-header table produce4U-tile" style={{maxWidth:((this.state.widths.reduce((a,b)=>(a + b),0)+300)+"px")}} >
          <div className="table-header-item produce4U-greentext" style={{width:"200px"}}><p>Product</p></div>
          {this.state.header.map(
            (item, i)=>(
              <div className="table-header-item" style={{width:this.state.widths[i + 1]+"px"}}><p>{item}</p></div>
            )
          )}
        </div>
      );
    }
////This function gets the row of the table
    getRow(items){
      return(
        <div className = "table-row table produce4U-tile" style={{maxWidth:((this.state.widths.reduce((a,b)=>(a + b),0)+300)+"px")}} >
          {items.map(
            (item, i)=>(
              <div style={{width:this.state.widths[i]+"px"}}>{item}</div>
            )
          )}
        </div>
      );
    }

    render() {
      return(

          <div className="myReservations">

              <p> Your Products</p>
              {this.getHeader()}
              {this.getProducts()}
          </div>
      );
    }
}


export default MyproductsPage;
