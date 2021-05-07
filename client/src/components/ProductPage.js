import React, {Component} from 'react';
import '../styles/product.css';
import ScrollReviews from '../components/ScrollReviews'

/////TODO: make this get information from database
class ProductPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      product:null,
      error: "ALL OK"
    }

  }


  componentDidMount(){
      fetch("http://localhost:9000/postProduct/"+this.props.match.params.id)
        .then(res => res.text())
        .then(res => this.setState({error:JSON.parse(res).error,product: JSON.parse(res).result}))
        .catch(err => err);
  }

  render() {
    console.log(this.state.product)
    if(this.state.product == null){
      return <p>Loading....</p>
    }
    if(this.state.error!="ALL OK"){
      return <p style={{color:'red'}}>{this.state.error}</p>
    }
    return(

        <div className="product">
            <div className="product-left">
              <img className="product-image" src={this.state.product.picture}/>
              <div className=" product-info ">
                  <p className="product-title">{this.state.product.name}</p>
                  <p className="product-describtion">{this.state.product.description}</p>
                  <a className="product-producer" href="/ProducerProfilePage">
                  <div className=" produce4U-producer product-producer">
                    By {this.state.product.owner_username}
                  </div>
                  </a>
                  <div>
                  
                    <p> $ {this.state.product.price} per {this.state.product.pricing_type} </p>
                  </div>
                  <p> Only {this.state.product.quantity} {this.state.product.pricing_type} left </p>
              </div>
              <div style={{marginTop:"25px"}}>
                Got Questions?
                <a class="contact-producer" href={"/Chat/"+this.state.product.owner_username} >
                  Contact Producer
                </a>
              </div>

              <a href={"/reserve/"+this.props.match.params.id}>
                 <button className="produce4U-green-button">
                    Schedule Pick up
                 </button>
              </a>

            </div>
            <div className="review">
                <ScrollReviews fetch_by="product_id"/>
            </div>

        </div>
    );
  }

}

export default ProductPage;
