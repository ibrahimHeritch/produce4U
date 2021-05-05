import React, { Component } from 'react';
import '../App.css';
import "../styles/myreservations.css"


class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: null,
            header: ["Name", "described Issue"],
            widths: [200, 115, 190]
        };
    }

   
    componentDidMount() {
        if (this.props.user.type == "USER") {
            fetch("http://localhost:9000/report?user=" + this.props.user.username)
                .then(res => res.text())
                .then(res => this.setState({ error: JSON.parse(res).error, reports: JSON.parse(res).result }))
                .catch(err => err);
        }

        if (this.props.user.type == "PRODUCER") {
            fetch("http://localhost:9000/report?producer_name=" + this.props.user.username)
                .then(res => res.text())
                .then(res => this.setState({ error: JSON.parse(res).error, reports: JSON.parse(res).result }))
                .catch(err => err);
        }
    }

    getReport() {
        return (
            this.state.reports.map((item) => (this.getRow(
                <p>{item.from_user}</p>,
                <p>{item.message}</p>)))
        );

    }

    getHeader() {
        return (
            <div className="table-header table produce4U-tile" style={{ maxWidth: ((this.state.widths.reduce((a, b) => (a + b), 0) + 300) + "px") }} >
                <div className="table-header-item produce4U-greentext" style={{ width: "200px" }}><p>Report</p></div>
                {this.state.header.map(
                    (item, i) => (
                        <div className="table-header-item" style={{ width: this.state.widths[i + 1] + "px" }}><p>{item}</p></div>
                    )
                )}
            </div>
        );
    }
    ////This function gets the row of the table
    getRow(items) {
        return (
            <div className="table-row table produce4U-tile" style={{ maxWidth: ((this.state.widths.reduce((a, b) => (a + b), 0) + 300) + "px") }} >
                {items.map(
                    (item, i) => (
                        <div style={{ width: this.state.widths[i] + "px" }}>{item}</div>
                    )
                )}
            </div>
        );
    }

    render() {
        if (this.state.reports == null) {
            return <p>Loading...</p>
        }
        return (

            <div>

                <p>Reports</p>
                {this.getHeader()}
                {(this.state.reports.length > 0 ? this.getReport() : " ")}
            </div>
        );
    }

 
    
}

export default Reports;
