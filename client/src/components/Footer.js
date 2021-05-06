import React, {Component} from 'react';
import logo from '../resources/footerLogo.svg';
import insta from '../resources/Icons/insta.svg'
import twitter from '../resources/Icons/twitter.svg'
import youtube from '../resources/Icons/youtube.svg'
import facebook from '../resources/Icons/facebook.svg'
import '../styles/footer.css';
//import insta from '../resources/Icons/insta.svg'

class Footer extends Component{
  render() {
    return(
      <div className="footer">
          <div className="footer-copyright">© Produce4U 2021, All Rights Reserved</div>
          <div className="footer-left">
            <p>Connect</p>
            <div>
              <a href="https://www.facebook.com/">
                <img className="footer-icon" src={facebook} height="50px"/>
              </a>
              <a href="https://www.youtube.com/">
                <img className="footer-icon" src={youtube} height="50px"/>
              </a>
              <a href="https://www.twitter.com/">
                <img className="footer-icon" src={twitter} height="50px"/>
              </a>
              <a href="https://www.instagram.com/">
                <img className="footer-icon" src={insta} height="50px"/>
              </a>
            </div>
          </div>
          <div>
            <img src={logo} width="170px"/>
          </div>
          <div className="footer-right">
              <ul>
                <li>
                  FAQ
                </li>
                <li>
                  About Us
                </li>
                <li>
                  Careers
                </li>
                <a href="/report"><li>
                   Report a Bug
                </li></a>
              </ul>
          </div>

      </div>
    );
  }

}

export default Footer;
