import React, {Component} from 'react';
import '../styles/product.css';


class ProductPage extends Component{
  render() {
    return(
        <div className="product">
            <div className="product-left">
              <img className="product-image" src="https://images.ctfassets.net/zma7thmmcinb/6QUAiho9YwaL9G54t28W3A/a6bb3ad9bdf6043fcc1050b3da0897be/How-to-start-a-strawberry-patch-pv.jpg"/>
              <div className=" product-info ">
                  <p className="product-title">Fresh Organic Strawberries</p>
                  <p className="product-describtion">These Strawberries are fresh and organic. They taste mostly like Strawberries. Which is not that surprising. Anyway please buy my strawberries. Cash Only. IRS not welcome</p>
                  <div className=" produce4U-producer product-producer">
                    By Perdu Farms
                  </div>
                  <div>
                    <p> 22 miles away </p>
                    <p> $ 3.50 per Oz. </p>
                  </div>
                  <p> Only 50 Oz. left </p>
              </div>
              <div style={{marginTop:"25px"}}>
                Got Questions?
                <a class="contact-producer" href="/Login">
                  Contact Producer
                </a>
              </div>

              <a href="/reserve">
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
