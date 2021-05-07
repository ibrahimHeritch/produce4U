import React, { Component } from 'react';
import '../App.css';
import "../styles/myreservations.css"


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            header: ["Action"],
            widths: [200, 190]
        };
    }


    componentDidMount() {
        if (this.props.user.type == "ADMIN") {
            fetch("http://localhost:9000/user/all")
                .then(res => res.text())
                .then(res => this.setState({  users: JSON.parse(res).result }))
                .catch(err => err);
        }


    }

    getReport() {

        return(
            this.state.users.map((item) => (this.getRow(
                [ <p>{item.username}</p>,
                  <button className="produce4U-red-button" onClick={()=>{this.ban(item.username)}}>Ban</button>
                ]
              )
            )
        )
      )

    }

    getHeader() {
        return (
            <div className="table-header table produce4U-tile" style={{ maxWidth: ((this.state.widths.reduce((a, b) => (a + b), 0) + 300) + "px") }} >
                <div className="table-header-item produce4U-greentext" style={{ width: "200px" }}><p>Name</p></div>
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
    ban(id){
      this.state.users=this.state.users.filter(item => item.username != id)
      this.setState({users:this.state.users})
      fetch("http://localhost:9000/user/ban", { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({user:id})
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
    }
    render() {
        if (this.state.users == null) {
            return <p>Loading...</p>
        }
        return (

            <div>

                <p>Users</p>
                {this.getHeader()}
                {(this.state.users.length > 0 ? this.getReport() : " ")}
            </div>
        );
    }



}

export default Users;
