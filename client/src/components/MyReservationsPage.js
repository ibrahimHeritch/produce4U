import React, {Component} from 'react';
import "../styles/myreservations.css"


class MyReservationsPage extends Component{

  constructor(props){
    super(props);
    this.state = {reservations: [],
                  header: ["Producer","Quantity","Total","Pick Up Time","Status","Actions"],
                  widths: [200,100,60,50,160,80,190]
    };


  }

///this method gets called and it populates the reservations array
  componentDidMount(){
    fetch("http://localhost:9000/reservation")
      .then(res => res.text())
      .then(res => this.setState({reservations: JSON.parse(res)}))
      .catch(err => err);
  }
  
  getReservations(){
    return(
      this.state.reservations.map((item)=>(this.getRow(
              [<a href="/product"><p className=" table-row-product produce4U-greentext ">{item.product_name}</p></a>,
               <p className="produce4U-producer">{item.producer_name}</p>,
               <p>{item.quantity}</p>,
               <p>${parseFloat(item.price).toFixed(2)}</p>,
               <p>{item.niceDate}</p>,
               <p>{item.order_status}</p>,
               <div className="table-actions">
                    <a href="/confirmation"><p className="produce4U-bluetext table-row-product">View</p></a>
                    <a href="/reserve"><button className="produce4U-green-button table-edit">Edit</button></a>
                    <button className="produce4U-red-button table-delete">Delete</button>
               </div>]))

      )
    );
  }

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

            <p> Your Upcoming Reservations</p>
            {this.getHeader()}
            {this.getReservations()}
        </div>
    );
  }

}

export default MyReservationsPage;
