import React, {Component} from 'react';
import '../styles/confirmation.css';


class ConfirmationPage extends Component{
  render() {
    return(
        <div className="confirmation">
            <p> You have successfully scheduled a pick up !!!</p>
            <div className="confirmation-page-buttons">
              <a href="/">
                <button className="produce-button">
                    Back to Home Page
                  </button>
               </a>
              <a href="/confirmation">
                <button className="produce-button">
                    See My reservations
                  </button>
               </a>
            </div>
        </div>
    );
  }

}

export default ConfirmationPage;
