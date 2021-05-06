import React, { Component } from 'react';
import '../App.css';
import '../styles/PostProductPage.css';

class ReportABug extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from_user:this.props.user.username,
            message: "",
            error: "ALL OK"
        }
        this.handleChange = this.handleChange.bind(this)
        this.addReport = this.addReport.bind(this)
        this.isValidInput = this.isValidInput.bind(this);
    }

    isValidInput() {

        if (this.state.message == "") {
            this.setState({ error: "Must include a Report" })
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
            fetch("http://localhost:9000/report", {
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
            <div className="App">
                <form action="http://localhost:3000/Home" onSubmit={this.addReport}>
                    <section className="post-out-border produce4U-tile">
                        <label className="post-top">Report A Bug</label>
                        <br />
                        <br />
                        <br />

                        <label className="post-info">Please describe the issue you are experiencing.
                        </label>
                        <br />
                        <br />
                            <textarea

                                value={this.state.textAreaValue}
                                onChange={this.handleChange}
                                rows={20}
                                cols={53}
                                name="message"
                                placeholder="Write your description of the issue"
                                className="post-border"
                            />
                        <br />
                        <br />
                        <br />
                        <label className="post-info">Thank you for the feedback!
                        </label>
                        <button className="produce4U-red-button">Submit</button>
                        <br />
                        <br />
                        <br />
                        </section>
                </form>
                {this.state.error!="ALL OK" && <p style={{color:"red"}}>{this.state.error}</p>}
            </div>
            )
    }


}

export default ReportABug;
