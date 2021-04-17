import React, { Component } from 'react';
import '../App.css';
import '../styles/PostProductPage.css';



class PostProductPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productTitle: "",
            description: "",
            selectProductCategory: "",
            productPrice: "",
            quantity: "",
            location: "",
            phone: "",
            postPic: null,
            product_owner: this.props.user.username
        }
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this);



    }
/////TODO: more input validiation
    addProduct(){
          fetch("http://localhost:9000/postProduct", { method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(this.state)
            }).then(function(response) {
              console.log(response)
              return response.json();
            });
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


//////////TODO: Remove location anf phone and replace it with date_harversted and pricing_type
    render() {
        return (
            <div className="App">
                <form action="http://localhost:3000/myProduct" onSubmit={this.addProduct}>
                    <section className="post-out-border">
                    <label className="post-top">Post Your Product</label>
                    <br />
                    <br />
                    <br />

                    <label className="post-info"> Product Title:
                    <br />
                    <input
                    type="text"
                    value={this.state.productTitle}
                    name="productTitle"
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
                                rows={5}
                                cols={5}
                                placeholder="Descripe Your Product"
                                className="post-border"
                    />
                    </label>
                    <br />

                    <label className="post-info">Select a Product Category:</label>
                    <br />
                     <select
                        value={this.state.selectProductCategory}
                        onChange={this.handleChange}
                        className="post-border"
                    name="selectProductCategory"
                >
                    <option value="allProduct">All Product</option>
                    <option value="vegtable">Vegtable</option>
                    <option value="fruits">Fruits</option>
                    <option value="bread">Bread</option>
                    <option value="juices">Juices</option>
                    <option value="tea">Tea</option>

                     </select>
                    <br />

                    <label className="post-info">Product Price:
                    <br />
                    <input
                    type="text"
                    name="productPrice"
                            placeholder="Product Price"
                            className="post-border"
                    onChange={this.handleChange} />
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

                    <label className="post-info">Location:
                    <br />
                    <input
                    type="text"
                    name="location"
                            placeholder="Location"
                            className="post-border"
                    onChange={this.handleChange} />
                    </label>
                    <br />

                    <label className="post-info">Phone:
                    <br />
                    <input
                    type="text"
                    name="phone"
                            placeholder="Phone"
                            className="post-border"
                    onChange={this.handleChange} />
                    </label>
                    <br />

                    <input type="file" onChange={this.fileSelectedHandler} className="produce4U-font"/>
                    <br />
                        <button className="produce4U-green-button">Submit</button>
                        </section>
                </form>

            </div>

        );
    }
}


export default PostProductPage;
