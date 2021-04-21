import React, {Component} from 'react';
import '../styles/product.css';

/////TODO: make this get information from database
class ProductPage extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      product:{
        name:"sss",
        description:"description",
        price:0.00,
        quantity:2,
        owner_name: 'Perdu Farm',


      }
    }

  }

  componentDidMount(){
      fetch("http://localhost:9000/postProduct/"+this.props.match.params.id)
        .then(res => res.text())
        .then(res => this.setState({product: JSON.parse(res)}))
        .catch(err => err);
  }

  render() {
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
                    <p> 22 miles away </p>
                    <p> $ {this.state.product.price} per {this.state.product.pricing_type} </p>
                  </div>
                  <p> Only {this.state.product.quantity} {this.state.product.pricing_type} left </p>
              </div>
              <div style={{marginTop:"25px"}}>
                Got Questions?
                <a class="contact-producer" href="/Login">
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
              <p> We really enjoy their strawberries every so often. We usually buy 12lbs so our experience may be limited. That said, it is very tasty and the service is surprisingly fast. Their quality is so far ahead of the competition. </p>
            </div>
        </div>
    );
  }

}

export default ProductPage;
