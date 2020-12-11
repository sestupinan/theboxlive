import React from "react";
import fblogo from "../imagenes/fb.png";
import walogo from "../imagenes/wa.png";
import mailogo from "../imagenes/mail.png";
import "../css/homeStyle.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {IntlProvider,FormattedMessage} from 'react-intl';
import localeEsMessages from '../local/FooterEs.json';
import localeZhMessages from '../local/FooterZh.json';


export default class Footer extends React.Component {
  render() {
    let messages = {"Null":"Null"}; 
    if(navigator.language.startsWith("es")){
      messages = localeEsMessages;

    }
    if(navigator.language.startsWith("zh")){
      messages = localeZhMessages;
    }
    return (
      <IntlProvider locale={navigator.language} messages={messages}>
      <div>
        <footer className="page-footer font-small pt-4 navBar">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-2 mt-md-0 mt-3">
                <p className="brand text-uppercase">®THEBOX</p>
              </div>
              <div className="col-md-8 mt-md-0 mt-3 centered">
              <ul>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                  <FormattedMessage id= "Home" defaultMessage="Home"/>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inventory">
                  <FormattedMessage id= "Inventory" defaultMessage="Inventory"/>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/statistics">
                  <FormattedMessage id= "Statistics" defaultMessage="Statistics"/>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link type="button" className="nav-link" to="/transactions">
                  <FormattedMessage id= "Transactions" defaultMessage="Transactions"/>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link type="button" className="nav-link" to="/profile">
                  <FormattedMessage id= "Profile" defaultMessage="Profile"/>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link type="button" className="nav-link" to="/FAQ">
                  <FormattedMessage id= "FAQ" defaultMessage="FAQ"/>
                  </Link>
                </li>
              </ul>
              </div>
              <hr className="clearfix w-100 d-md-none pb-3" />
              <div className="col-md-2 mb-md-0 mb-3 ">
                <p className="text-uppercase colorBox"><FormattedMessage id= "Contact" defaultMessage="Contact Us!"/></p>

                <a
                  className="colorBox"
                  href="https://www.facebook.com/andres.rojas.1297/"
                  target="_blank"
                  aria-label="Find more info at our facebook page"
                >
                  <img src={fblogo} className="logo" alt="Facebook logo"></img>
                </a>
                <a
                  className="colorBox"
                  href="mailto:thebox_inventario@outlook.com"
                  target="_blank"
                  aria-label="Find more info at our mail page"
                >
                  <img src={mailogo} className="logo" alt="Facebook logo"></img>
                </a>
                <a
                  className="colorBox"
                  href="https://api.whatsapp.com/send?phone=3002164037"
                  target="_blank"
                  aria-label="Find more info at our whatsapp"
                >
                  <img src={walogo} className="logo" alt="Facebook logo"></img>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </IntlProvider>
    );
  }
}
