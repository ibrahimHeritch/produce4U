import React, { Component } from 'react';
import '../App.css';
import '../styles/review.css';



class PostReview extends Component{
    constructor(props) {
        super(props)
        this.state = {
            author_username: this.props.user.username,
            picture: this.props.user.profile_picture,
            text: "",
            product_id: this.props.product.id,
            rating: 5.0
        }
        this.handleChange = this.handleChange.bind(this)
        this.addReview = this.addReview.bind(this);
        this.isValidInput = this.isValidInput.bind(this);
        }

    isValidInput(){

        if(this.state.text == ""){
            this.setState({error: "Must include Text in Your Review"})
            return false;
        }
        if(this.state.review == '' || isNaN(this.state.quantity) ){
            this.setState({error: "Must include Rating as Number"})
            return false;
        }

        return true;
    }

    addReview(event) {
        if (this.isValidInput()) {
            fetch("http://localhost:9000/review", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            }).then(function (response) {
                console.log(response)
                return response.json();
            });
        } else {
            event.preventDefault()
        }
    }

        handleChange(event) {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        render() {
            return(
                <div className="App">
                    <form action="http://localhost:3000/review/" onSubmit={this.addReview}>
                        <section className="post-out-border produce4U-tile">
                            <label className="post-top">Write Your Review</label>
                            <br />
                            <br />

                            <label className="post-info">
                                <br />
                                <input

                                    type="text"
                                    value={this.state.username}
                                    name="author_username"
                                    placeholder="Author Username"
                                    onChange={this.handleChange}
                                    className="post-border"
                                />
                            </label>
                            <br />
                            <label className="post-info">
                                <br />
                                <input

                                    type="image"
                                    value={this.state.user.profile_picture}
                                    name="picture"
                                    onChange={this.handleChange}
                                    className="post-border"
                                />
                            </label>
<br/>
                            <label className="post-info">
                                <br />
                                <input

                                    type="number"
                                    value={this.state.product.product.id}
                                    name="product_id"
                                    onChange={this.handleChange}
                                    className="post-border"
                                />
                            </label>
                            <br/>
                            <label className="post-info"> What do you want to say?:
                                <br />
                                <textarea

                                    value={this.state.textAreaValue}
                                    onChange={this.handleChange}
                                    rows={10}
                                    cols={53}
                                    name="text"
                                    placeholder="Write your Review"
                                    className="post-border"
                                />
                            </label>
                            <br />
                            <label className="post-info">Rating(1-5):
                                <br />
                                <input
                                    type="number"
                                    name="rating"
                                    placeholder="Rating"
                                    className="post-border"
                                    onChange={this.handleChange} />
                            </label>
                            <br />




                            <br />
                            <label className="post-info">
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





export default PostReview;

