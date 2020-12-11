import React from "react";
import logo from "../imagenes/thebox3.png";
import "../css/homeStyle.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {IntlProvider,FormattedMessage} from 'react-intl';
import localeEsMessages from '../local/NavEs.json';
import localeZhMessages from '../local/NavZh.json';

export default class Navbar extends React.Component {
  render() {
    let messages = {"Null":"Null"}; 
    if(navigator.language.startsWith("es")){
      messages = localeEsMessages;

    }
    if(navigator.language.startsWith("zh")){
      messages = localeZhMessages;
    }
    return (
      <IntlProvider locale={navigator.language} messages = {messages}>
        <div>
          <script src="jquery/jquery.min.js"></script>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
            crossOrigin="anonymous"
          />
          <script src="js/bootstrap.min.js"></script>
          <link
            href="https://fonts.googleapis.com/css?family=Lobster"
            rel="stylesheet"
          />
          <nav className="navBar navbar navbar-expand-md navbar-light justify-content around">
          <Link to="/"> <img id="navBox" src={logo} alt="boxImage" /> </Link>
          <Link to="/"> <p className="brand">THEBOX</p> </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="btn btn-dark btn-nav" to="/loginlogup">
                  <FormattedMessage id= "Login" defaultMessage="Sign in/ Sign up"/>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </IntlProvider>
    );
  }
}
