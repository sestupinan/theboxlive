import React,{useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import LoginForm from "./LoginForm";
import LogupForm from "./LogupForm";
import {IntlProvider,FormattedMessage} from 'react-intl';
import localeEsMessages from '../local/LoginEs.json';
import localeZhMessages from '../local/LoginZh.json';


function LoginLogup() {
  let messages = {"Null":"Null"};
  if(navigator.language.startsWith("es")){
    messages = localeEsMessages;
  }
  if(navigator.language.startsWith("zh")){
    messages = localeZhMessages;
  }
  return (
    <IntlProvider locale ={navigator.language} messages ={messages}>
    <div className="container-fluid">
      <div className="row justify-content-around">
        <div className="col-10 loginCol rounded">
          <h1 className="text-center" id="title">
            <FormattedMessage id="Welcome" defaultMessage="Welcome to THEBOX"/>
          </h1>
          <p className="text-center">
            <small id="ourPasswordHelpInline">
            <FormattedMessage id="Message" defaultMessage="Here your inventory will be safe and counted, no more messy
              inventory papers and unknown responsabilities"/>
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
        <small id="passwordHelpInline">
        <FormattedMessage id="Developer" defaultMessage="Developer:"/>
          <a
            href="https://github.com/isis3710-uniandes/202020_S2_E6"
            target="_blank"
            className="h6 linkdark"
          >
            {" "}
            ISIS3710-Group6
          </a>
          . Universidad de Los Andes @2020 Credits:
          <a href="https://v4-alpha.getbootstrap.com/" className="h6 linkdark">
            {" "}
            boostrap v4.
          </a>
        </small>
      </p>
    </div>
    </IntlProvider>
  );
}
export default LoginLogup;
