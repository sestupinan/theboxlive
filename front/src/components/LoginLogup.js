import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import LoginForm from "./LoginForm";
import LogupForm from "./LogupForm";

function LoginLogup() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-around">
        <div className="col-10 loginCol rounded">
          <h2 className="text-center" id="title">
            Welcome to THEBOX
          </h2>
          <p className="text-center">
            <small id="ourPasswordHelpInline">
              Here your inventory will be safe and counted, no more messy
              inventory papers and unknown responsabilities
            </small>
          </p>
          <hr />
          <div className="row justify-content-center">
            <LoginForm />
            <LogupForm />
          </div>
        </div>
      </div>
      <p className="text-center">
        <small id="passwordHelpInline" className="text-muted">
          Developer:
          <a
            href="https://github.com/isis3710-uniandes/202020_S2_E6"
            target="_blank"
            className="h6"
          >
            {" "}
            ISIS3710-Group6
          </a>
          . Universidad de Los Andes @2020 Credits:
          <a href="https://v4-alpha.getbootstrap.com/" className="h6">
            {" "}
            boostrap v4.
          </a>
        </small>
      </p>
    </div>
  );
}
export default LoginLogup;
