import React, {Component} from 'react';
import '../styles/confirmation.css';
import check from '../resources/pictures/check_mark.png'

class ConfirmationPage extends Component{
  render() {
    return(
        <div className="confirmation">
            <p> You have successfully scheduled a pick up !!!</p>
            <img src={check} height="400px"/>
            <div className="confirmation-page-buttons">
              <a href="/">
                <button className="produce4U-green-button">
                    Back to Home Page
                  </button>
               </a>
              <a href="/myReservations">
                <button className="produce4U-green-button">
                    See My reservations
                  </button>
               </a>
            </div>
        </div>
    );
  }

}

export default ConfirmationPage;
