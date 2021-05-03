import React, { component } from 'react';
import '../App.css';
import '../styles/ReportedUser.css';

class ReportedUser extends component {
    constructor(props) {
        super(props)
            this.state = {
                message: "",
                type: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.addReport = this.addReport.bind(this)
        this.isValidInput = this.isValidInput.bind(this);
        
    }

    isValidInput() {
        
        if (this.state.message == "") {
            this.setState({ error: "Must include a Review" })
            return false;
        }

        return true;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addReport(event) {
        if (this.isValidInput()) {
            fetch("http://localhost:9000/reportedUser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            }).then(function (response) {
                console.log(response)
                return response.json();
            });
        } else {
            event.preventDefault()
        }

    }

    render() {
        return (
            <div className="App" >
                <form action="http://localhost:3000/Reports" onSubmit={this.addReport}>
                    <section className="post-out-border produce4U-tile">
                        <label className="post-info">Flagges as Inappropriate
                        </label>
                        <br />
                        <textarea

                            value={this.state.textAreaValue}
                            onChange={this.handleChange}
                            rows={10}
                            cols={53}
                            name="message"
                            placeholder="Write Your Review"
                            className="post-border"
                        />
                        <br />
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="inappropriate"
                                className="post-info"
                                checked={this.state.type == "inappropriate"}
                                onChange={this.handleChange}
                            />Inappropriate, remove review.
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="appropriate"
                                className="post-info"
                                checked={this.state.type == "appropriate"}
                                onChange={this.handleChange}
                            />Appropriate, keep review.
                        </label>
                        <br />
                        <button className="produce4U-green-button">Submit</button>
                        <br />
                    </section>
                </form>
            </div>
        )
    }


}

export default ReportedUser;
