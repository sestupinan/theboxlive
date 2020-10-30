import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));