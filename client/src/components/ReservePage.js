import React, {Component} from 'react';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';



class ReservePage extends Component{



  render() {
    var yesterday = moment().subtract( 1, 'day' );
    var valid = function( current ){
      return current.isAfter( yesterday ) && current.day() !== 0 && current.day() !== 6;
    };


    return(
        <div className="reserve">
          <div className=" reservation-step ">
                <p>
                <span>Choose a convenient time to pick-up your</span>
                 <span className="reservation-product"> Fresh Organic Strawberries</span>
                 <span>:</span>
                </p>
                <div className="reservation-datetime">
                  <div>
                    <p>Date:</p>
                    <Datetime input={false} timeFormat={false} isValidDate={ valid }/>
                  </div>
                  <div width="50%">
                    <p>Time:</p>
                  </div>
                </div>
          </div>
          <div className=" reservation-step ">
                <p>
                  <span>Choose how many ounces of </span>
                  <span className="reservation-product">Fresh Organic Strawberries</span>
                  <span> do you want to reserve:</span>
                </p>
          </div>
          <div className=" reservation-step ">
                <p>
                  <span>Since you're already going, why not reserve some other products by</span>
                  <span className="reservation-product"> Perdu Farms</span>
                  <span>:</span>
                </p>
          </div>
        </div>
    );
  }

}

export default ReservePage;
