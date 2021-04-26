import React, { Component } from 'react';
import '../App.css';
import '../styles/PostProductPage.css';
import axios from 'axios';
import Datetime from "react-datetime";


class PostProductPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            owner_username: this.props.user.username,
            product_title: "",
            description: "",
            quantity: "",
            price: null,
            rating: 5.0,
            product_type: "OTHER",
            pricing_type: "Pc",
            date_harversted: "",
            picture_url: null,
            error:"ALL OK"
        }
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this)
        this.isValidInput = this.isValidInput.bind(this);

    }

    isValidInput(){
      if(this.state.product_title == ""){
        this.setState({error: "Must include Product Name"})
        return false;
      }
      if(this.state.description == ""){
        this.setState({error: "Must include Product Description"})
        return false;
      }
      if(this.state.quantity == '' || isNaN(this.state.quantity) ){
        this.setState({error: "Must include Quantity as Number"})
        return false;
      }
      if(this.state.price == null || isNaN(this.state.price)){
        this.setState({error: "Must include Price as Number"})
        return false;
      }
      if(this.state.picture_url == null){
        this.setState({error: "Must include picture"})
        return false;
      }

      return true;
    }


    addProduct(event){
          if(this.isValidInput()){
            fetch("http://localhost:9000/postProduct", { method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
              }).then(function(response) {
                console.log(response)
                return response.json();
              });
          }else{
            event.preventDefault()
          }

    }

    uploadHandler(event) {
      const data = new FormData();
    data.append('file', event.target.files[0]);

    axios.post('http://localhost:9000/postProduct/uploadImg', data)
      .then((res) => {
        console.log(res.data)
        this.setState({ picture_url: "http://localhost:9000/"+res.data.path.split("/")[1] });
      });
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }



    render() {
        if(this.props.user.type != "PRODUCER"){
          return <p>This Page is for producers Only</p>
        }
        return (
            <div className="App">
                <form action="http://localhost:3000/myProduct" onSubmit={this.addProduct}>
                    <section className="post-out-border produce4U-tile">
                    <label className="post-top">Post Your Product</label>
                    <br />
                    <br />
                    <br />

                    <label className="post-info"> Product Title:
                    <br />
                    <input

                    type="text"
                    value={this.state.name}
                    name="product_title"
                    placeholder="Product Title"
                    onChange={this.handleChange}
                    className="post-border"
                    />
                    </label>
                    <br />

                    <label className="post-info"> Description:
                    <br />
                    <textarea

                                value={this.state.textAreaValue}
                                onChange={this.handleChange}
                                rows={10}
                                cols={53}
                                name="description"
                                placeholder="Descripe Your Product"
                                className="post-border"
                    />
                    </label>
                        <br />
                        <label className="post-info">Quantity:
                    <br />
                            <input
                                type="text"
                                name="quantity"
                                placeholder="Quantity"
                                className="post-border"
                                onChange={this.handleChange} />
                        </label>
                        <br />


                    <label className="post-info">Product Price:
                    <br />
                            <input
                                type="text"
                                name="price"
                                className="post-border"
                                placeholder="Price"
                                onChange={this.handleChange} />
                    </label>
                        <br />



                    <label className="post-info">Select a Product Category:</label>
                    <br />
                     <select
                            value={this.state.product_type}
                        onChange={this.handleChange}
                        className="post-border"
                            name="product_type"
                >

                    <option value="VEGETABLE">Vegtable</option>
                    <option value="FRUITS">Fruits</option>
                    <option value="BREAD">Bread</option>
                    <option value="JUICES">Juices</option>
                            <option value="TEA">Tea</option>
                            <option value="OTHER">Other</option>

                     </select>
                        <br />
                    <label className="post-info">Pricing Type:
                    <br />

                    <select
                         onChange={this.handleChange}
                         className="post-border"
                         name="pricing_type"
                       >

                           <option value="Pc">Each</option>
                           <option value="Lb">Per Pound</option>
                           <option value="Oz">Per Ounce</option>
                           <option value="Dz">Per Dozen</option>
                           <option value="Pkg">Per Package</option>


                            </select>
                    </label>
                    <br />

                    <label className="post-info">Date Harversted:
                        <br />
                        <div className="post-date-harversted">
                        <Datetime input={false} timeFormat={false}  />
                        </div>
                    </label>
                    <br />
                    <label className="post-info">Product Picture:
                      <br />
                      <input type="file" onChange={this.uploadHandler} className="produce4U-font"/>
                      <br />
                      <br />
                      <button className="produce4U-green-button">Submit</button>
                      <br />
                      {this.state.error=="ALL OK"?" " : <p style={{color:'red'}}>{this.state.error}</p>}
                    </label>
                    </section>
                </form>

            </div>

        );
    }
}


export default PostProductPage;
