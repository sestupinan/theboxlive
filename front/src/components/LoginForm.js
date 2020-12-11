import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import {FormattedMessage} from 'react-intl';


let opcionesIniciales = {
  "es":{"UsernameR":"Tienes que ingresar el usuario!", "PasswordR":"Tienes que ingresar la contraseña!", "Username":"Usuario","Password":"Contraseña"},
  "en":{"UsernameR":"Your username is required", "PasswordR":"Your password is required", "Username":"Username","Password":"Password"},
  "zh":{"UsernameR":"您的用户名是必填项", "PasswordR":"您的密码是必需的", "Username":"用户名","Password":"密码"}
}
let opciones ={}
function LoginForm() {
  let cambio = false; 
    if(navigator.language.startsWith("es")){
      opciones = opcionesIniciales.es;
    }
    else if(navigator.language.startsWith("zh")){
      opciones = opcionesIniciales.zh;
    }
    else{
      opciones = opcionesIniciales.en;
    }
    cambio = true;
    
  const [showDl, setShowDl] = useState(false);
  const handleCloseDl = () => setShowDl(false);
  const handleShowDl = () => {
    setShowDl(true);
  };
  //Objeto Formik para uso de estados y funciones de forma abreviada
  const formik = useFormik({
    initialValues: {
      usernameLogin: "",
      passwordLogin: "",
    },
    onSubmit: (values) => {
      handleShowDl()
    },
    onReset: ()=>{
    },
    validate: (values) => {
      let errors = {};
      if (!values.usernameLogin) {
        errors.usernameLogin =  opciones.UsernameR;
      }
      if (!values.passwordLogin) {
        errors.passwordLogin = opciones.PasswordR;
      }
      
      return errors;
    },
  });
  return (
    <div className="col-md-4 align-items-center text-center">
      <div className="row">
        <div className="col-11 rounded amarilloPollito">
          <form
            className="needs-validation signInForm"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            noValidate
          >
            <fieldset>
              <p className="text-uppercase logCategory">
                <FormattedMessage id="Login" defaultMessage="Login using your account:"/>
              </p>

              <div className="form-group">
                <input
                  type="text"
                  name="usernameLogin"
                  id="usernameLogin"
                  aria-label="youUsername"
                  className="form-control input-lg"
                  placeholder={opciones.Username}
                  onChange={formik.handleChange}
                  value={formik.values.usernameLogin}
                  required
                />
                {formik.errors.usernameLogin ? (
                  <div className="errorMessage">
                    {formik.errors.usernameLogin}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="passwordLogin"
                  id="passwordLogin"
                  className="form-control input-lg"
                  aria-label="yourPassword"
                  placeholder={opciones.Password}
                  onChange={formik.handleChange}
                  value={formik.values.passwordLogin}
                  required
                />
                {formik.errors.passwordLogin ? (
                <div className="errorMessage">
                  {formik.errors.passwordLogin}
                </div>
              ) : null}
              </div>
              
              <div>
                <button type="submit" className="btn" id="btn-nav-SignIn">
                <FormattedMessage id="SignIn" defaultMessage="Sign In"/>
                </button>
                <button type="reset" className="btn" id="btn-nav-CleanInfo">
                <FormattedMessage id="Clean" defaultMessage="Clean Info"/>
                </button>
                <Modal show={showDl} onHide={handleCloseDl}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <div className="text-center"><FormattedMessage id="LoggedIn" defaultMessage="Logged In"/></div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="md-form mb-5">
                      <i className="fas fa-envelope prefix grey-text"></i>
                      <FormattedMessage id="Start" defaultMessage="Start enjoying all that THEBOX has ready for you! "/>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div>
                      <a
                        className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                        onClick={handleCloseDl}
                      >
                        <b> <FormattedMessage id="Nice" defaultMessage="Nice!"/></b>
                      </a>
                    </div>
                  </Modal.Footer>
                </Modal>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
