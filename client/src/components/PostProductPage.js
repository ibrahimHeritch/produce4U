import React, { Component } from 'react';
import '../App.css';
import '../styles/PostProductPage.css';



class PostProductPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            owner_username: "",
            name: "",
            description: "",
            quantity: "",
            price: "",
            rating: "",
            product_type: "",
            pricing_type: "",
            date_harversted: "",
            picture: null,
            //product_owner: this.props.user.username
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
                    value={this.state.name}
                    name="name"
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
                                defaultValue="0.0"
                                onChange={this.handleChange} />
                    </label>
                        <br />

                        <label className="post-info">Rating:
                    <br />
                            <input
                                type="text"
                                name="rating"
                                className="post-border"
                                defaultValue="5.0"
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
                    <option value="allProduct">All Product</option>
                    <option value="vegtable">Vegtable</option>
                    <option value="fruits">Fruits</option>
                    <option value="bread">Bread</option>
                    <option value="juices">Juices</option>
                            <option value="tea">Tea</option>
                            <option value="other">Other</option>

                     </select>
                        <br />
                    <label className="post-info">Pricing Type:
                    <br />
                        <input
                            type="text"
                            name="pricing_type"
                                placeholder="pricing type: (e.g., 'Lb','Oz','Pc','Dz','Pkg')"
                            className="post-border"
                            onChange={this.handleChange} />
                    </label>
                    <br />

                        <label className="post-info">Date Harversted:
                    <br />
                    <input
                    type="text"
                                name="date_harversted"
                                placeholder="Date Harversted"
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
