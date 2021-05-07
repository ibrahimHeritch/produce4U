import React, { Component } from 'react';
import '../App.css';
import '../styles/review.css';
import axios from 'axios';
import Datetime from "react-datetime";


class EditReview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            author_username: this.props.user.username,
            text: "",
            rating: 5.0,
            picture_url: null,
            error:"ALL OK"
        }
        this.handleChange = this.handleChange.bind(this)
        this.addReview = this.addReview.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this)
        this.isValidInput = this.isValidInput.bind(this);

    }

    isValidInput(){
        if(this.state.product_title == ""){
            this.setState({error: "Must include Product Name"})
            return false;
        }
        if(this.state.text == ""){
            this.setState({error: "Must include your review text"})
            return false;
        }

        if(this.state.picture_url == null){
            this.setState({error: "Must include picture"})
            return false;
        }

        return true;
    }


    addReview(event){
        if(this.isValidInput()){
            fetch("http://localhost:9000/review/edit", { method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({state: this.state, id:this.props.match.params.id})
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

        axios.post('http://localhost:9000/review/uploadImg', data)
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


    componentDidMount(){
        fetch("http://localhost:9000/review/"+this.props.match.params.id)
            .then(res => res.text())
            .then(res => JSON.parse(res).result)
            .then(review => this.setState({
                author_username: review.author_username,
                text: review.text,
                rating: review.rating,
                picture_url:review.picture,
                product_id: review.product_id
            }))
            .catch(err => err);
    }

    render() {
    
        return (
            <div className="App">
                <form action="http://localhost:3000/" onSubmit={this.addReview}>
                    <section className="post-out-border produce4U-tile">
                        <label className="post-top">Reply to Review</label>
                        <br />
                        <br />
                        <br />

                        <label className="post-info"> Review Reply
                            <br />
                            <input

                                type="text"
                                value={this.state.producer_reply}
                                name="producer_reply"
                                placeholder="Review Reply"
                                onChange={this.handleChange}
                                className="post-border"
                            />
                        </label>
                        <br />

                    </section>
                </form>

            </div>

        );
    }
}


export default EditReview;
