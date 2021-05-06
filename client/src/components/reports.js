import React, {Component} from 'react';
import "../styles/myreservations.css"


class Reports extends Component{

  constructor(props){
    super(props);
    this.state = {reports: [],

    };


  }

///this method gets called and it populates the reservations array
  componentDidMount(){
    if(this.props.user.type == "ADMIN"){
      fetch("http://localhost:9000/report")
        .then(res => res.text())
        .then(res => this.setState({reports: JSON.parse(res).result}))
        .catch(err => err);
    }

  }



  render() {
    return(
      <div>
          {this.state.reports.map((item)=><div><p>{"User "+item.from_user+" reported:"}</p><p>{item.message}</p></div>)}
      </div>
    )
  }

}

export default Reports;
