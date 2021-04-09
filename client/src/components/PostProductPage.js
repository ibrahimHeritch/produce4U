import React, { Component } from 'react';
import '../App.css';



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
            postPic: null
        }
        this.handleChange = this.handleChange.bind(this)

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="App">
            <p className="App-intro">Edit components/PostProductPage.js to change</p>

            <form onSubmit={this.handleSubmit}>
                <label> Product Title:
                    <br />
                    <input
                    type="text"
                    value={this.state.productTitle}
                    name="productTitle"
                    placeholder="Product Title"
                    onChange={this.handleChange}
                    />
                </label>
                <br />
                <label> Description:
                    <br />
                    <textarea
                    value={"Description of your product"}
                    onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>Select a Product Category:</label>
                <br />
                <select
                    value={this.state.selectProductCategory}
                    onChange={this.handleChange}
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
                <label>Product Price:
                    <br />
                    <input
                    type="text"
                    name="productPrice"
                    placeholder="Product Price"
                    onChange={this.handleChange} />
                </label>
                <br />
                <label>Quantity:
                    <br />
                    <input
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                        onChange={this.handleChange} />
                </label>
                <br />
                <label>Location:
                    <br />
                    <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={this.handleChange} />
                </label>
                <br />
                <label>Phone:
                    <br />
                    <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={this.handleChange} />
                </label>
                <br />
                <input type="file" onChange={this.fileSelectedHandler} />
                <br />
                <button>Submit</button>
            </form>

            </div>

        );
    }
}


export default PostProductPage;
