import React, { Component } from 'react';
import "../styles/myreservations.css"
import ReactModal from 'react-modal';

class MyproductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            header: ["Total Quantity","Price","Status","Actions"],
            widths: [200,115,50,50,190],
            show:false,
            current_product: null
        };

        this.deleteProduct = this.deleteProduct.bind(this);
        this.addStock = this.addStock.bind(this);

    }


    deleteProduct(id){
      this.state.products = this.state.products.filter(item => item.id != id)
      this.setState({products:this.state.products})
      fetch("http://localhost:9000/products/delete", { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id:id})
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
    }
///this method gets called and it populates the products array
    componentDidMount(){
        fetch("http://localhost:9000/postProduct?user="+this.props.user.username)
          .then(res => res.text())
          .then(res => this.setState({products: JSON.parse(res).result}))
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

                      <a onClick={()=>{this.setState({show:true,current_product:item})}}><p className="produce4U-bluetext table-row-product">Add</p></a>
                      <a href={"/product/edit/"+item.id}><button className="produce4U-green-button table-edit">Edit</button></a>
                     <button className="produce4U-red-button table-delete" onClick={() => {
                         this.deleteProduct(item.id)
                     }}>Delete</button>
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

    addStock(product,value){
      product.quantity+=value
      this.setState({products:this.state.products,show:false})
      fetch("http://localhost:9000/products/add", { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id:product.id,value:value})
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
    }

    render() {
      if(this.state.products==null){
        return <p>Loading...</p>
      }
      return(

          <div className="myReservations">

            {this.state.current_product!= null && <MyVerticallyCenteredModal
                                                      isOpen={this.state.show}
                                                      onCancel={() => {this.setState({show:false})}}
                                                      product={this.state.current_product}
                                                      onAdd={this.addStock}
                                                      />}
              <p> Your Products</p>
              {this.getHeader()}
              {(this.state.products.length > 0? this.getProducts():" ")}

          </div>
      );
    }
}

function MyVerticallyCenteredModal(props) {
  const [value, updateValue] = React.useState(0);
  return (
    <ReactModal
      {...props}
    >
    <form>
    <label>
    <p>How much stock do you want to add to {props.product.name}?</p>
    <input
    type="text"
    value={value}
    onChange={(event)=>{updateValue(parseInt(event.target.value))}}
    />
    {props.product.pricing_type}
    </label>
    </form>
    <div>
    <span><button onClick={props.onCancel}>Cancel</button><button onClick={()=>{props.onAdd(props.product,value)}}>Add</button></span>
    </div>
    </ReactModal>
  );
}

export default MyproductsPage;
