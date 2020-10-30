import React from "react";
import fblogo from "../imagenes/fb.png";
import walogo from "../imagenes/wa.png";
import mailogo from "../imagenes/mail.png";
import "../css/homeStyle.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="page-footer font-small pt-4 navBar">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-10 mt-md-0 mt-3">
                <h5 className="brand text-uppercase">®THEBOX</h5>
              </div>
              <hr className="clearfix w-100 d-md-none pb-3" />
              <div className="col-md-2 mb-md-0 mb-3 ">
                <h5 className="text-uppercase colorBox">Contact</h5>

                <a
                  className="colorBox"
                  href="https://www.facebook.com/andres.rojas.1297/"
                  target="_blank"
                >
                  <img src={fblogo} className="logo" alt="Facebook logo"></img>
                </a>
                <a
                  className="colorBox"
                  href="mailto:thebox_inventario@outlook.com"
                  target="_blank"
                >
                  <img src={mailogo} className="logo" alt="Facebook logo"></img>
                </a>
                <a
                  className="colorBox"
                  href="https://api.whatsapp.com/send?phone=3002164037"
                  target="_blank"
                >
                  <img src={walogo} className="logo" alt="Facebook logo"></img>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
