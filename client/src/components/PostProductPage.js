import React, { Component } from 'react';
import '../App.css';
import '../styles/PostProductPage.css';



class PostProductPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            owner_username: this.props.user.username,
            product_title: "",
            description: "",
            quantity: "",
            price: 0.0,
            rating: 5.0,
            product_type: "OTHER",
            pricing_type: "Pc",
            date_harversted: "",
            picture_url: null, //temporary
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
        if(this.props.user.type != "PRODUCER"){
          return <p>This Page is for producers Only</p>
        }
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
                                rows={5}
                                cols={5}
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
                                defaultValue="0.0"
                                onChange={this.handleChange} />
                    </label>
                        <br />

                        <label className="post-info">Picture Url (temp will change later):
                    <br />
                            <input
                                type="text"
                                name="picture_url"
                                className="post-border"
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
                        <input
                            value={this.state.pricing_type}
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
                              value={this.date_harversted}
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
