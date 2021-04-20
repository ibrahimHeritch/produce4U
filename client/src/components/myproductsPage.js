import React, { Component } from 'react';
import "../styles/myreservations.css"

class MyproductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            header: ["Total Quantity","Price","Status","Actions"],
            widths: [200,115,50,50,190]
        };
    }

///this method gets called and it populates the products array
    componentDidMount(){
        fetch("http://localhost:9000/postProduct?user="+this.props.user.username)
          .then(res => res.text())
          .then(res => this.setState({products: JSON.parse(res)}))
          .catch(err => err);
    }

////TODO: make edit add and delete buttons do somehtingS
/////translates products into html elements
    getProducts(){
      return(
        this.state.products.map((item)=>(this.getRow(
                [<a href="/product"><p className=" table-row-product produce4U-greentext ">{item.name}</p></a>,
                 <p>{item.quantity}</p>,
                 <p>${parseFloat(item.price).toFixed(2)}</p>,

                 <p>Active</p>,
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
              {(this.state.products.length > 0? this.getProducts():" ")}
          </div>
      );
    }
}


export default MyproductsPage;
