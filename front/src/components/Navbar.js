import React from "react";
import logo from "../imagenes/thebox3.png";
import "../css/homeStyle.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default class Navbar extends React.Component {
  render() {
    return (
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
          <img id="navBox" src={logo} alt="boxImage" />
          <p className="brand">
            THEBOX
          </p>
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
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inventory">
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./statistics">
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a type="button" className="nav-link" href="./transactions">
                  Transactions
                </a>
              </li>
              <li className="nav-item">
                <a type="button" className="nav-link" href="./profile">
                  Profile
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="btn btn-dark btn-nav" href="./loginlogup">
                  Sign in/Sign up
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
