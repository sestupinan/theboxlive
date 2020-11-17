import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import "../css/perfilcss.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PasswordStrength from "./PasswordStrength";
import Modal from "react-bootstrap/Modal";

function LogupForm() {
  //Valores iniciales para campos del formulario
  const initialValues = {
    userNameLogUp: "",
    emailLogUp: "",
    IdLogUp: "",
    passwordLogUp: "",
    userPositionLogUp: "",
    NITLogUp: "",
    policy:"",
  };
  //Funcion para renderizacion condicional de password strength
  const PasswordStrengthRender = (passwordField) => {
    if (passwordField != "") {
      return <PasswordStrength percentage={passwordLvl} />;
    } else {
      return <div> </div>;
    }
  };
  const [passwordLvl, setPasswordLvl] = useState(1);
  const [rendering, setRendering] = useState(
    PasswordStrengthRender(initialValues.passwordLogUp)
  );

  //Funcion de validacion para campos del formulario, nivel de password y mensajes de error
  const validater = (values) => {
    let errors = {};
    if (!values.userNameLogUp) {
      //se ha ingresado un valor en userName
      errors.userNameLogUp = "Your username is required";
    } else if (values.userNameLogUp.length < 4) {
      errors.userNameLogUp =
        "Your username should be at least 4 characters long";
    }
    if (!values.emailLogUp) {
      //se ha ingresado un valor en emailLogUp
      errors.emailLogUp = "Your email is required";
    } else if (!values.emailLogUp.includes("@")) {
      errors.emailLogUp = "Your email doesn't have the correct format";
    }
    if (!values.passwordLogUp) {
      //se ha ingresado un valor en passwordLogUp
      errors.passwordLogUp = "Your password is required";
    } else {
      setPasswordLvl(1);
      setRendering(PasswordStrengthRender(values.passwordLogUp));
      if (values.passwordLogUp.length < 6) {
        errors.passwordLogUp =
          "Your password should be at least 6 characters long";
        setPasswordLvl(1);
      }
      if (/\d/.test(values.passwordLogUp)) {
        //password contiene un numero
        setPasswordLvl(passwordLvl + 1);
      }
      if (/A-Z/.test(values.passwordLogUp)) {
        //password contiene una mayuscula
        setPasswordLvl(passwordLvl + 1);
      }
      if (
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(values.passwordLogUp) &&
        passwordLvl < 3
      ) {
        //password contiene un simbolo especial
        setPasswordLvl(passwordLvl + 1);
      }
    }

    if (!values.IdLogUp) {
      //se ha ingresado un valor en IdLogUp
      errors.IdLogUp = "Your ID is required";
    }
    if (!values.userPositionLogUp) {
      //se ha ingresado un valor en userPositionLogUp
      errors.userPositionLogUp = "Your Job title/App role position is required";
    }
    if (!values.NITLogUp) {
      //se ha ingresado un valor en NITLogUp
      errors.NITLogUp = "The NIT of your company is required";
    } else if (toString(values.NITLogUp).length < 9) {
      errors.NITLogUp =
        "The NIT must have a minimum of 10 digits including the verification digit";
    }
    if(!values.policy){
      errors.policy = "Your consent is required for registration";
    }
    return errors;
  };
  //Handles modal for Login Up
  const [showDl, setShowDl] = useState(false);
  const handleCloseDl = () => setShowDl(false);
  const handleShowDl = () => {
    setShowDl(true);
  };
  //Funcion de submit para el formulario que previene el comportamiento default html
  const onSubmit = (values) => {
    handleShowDl();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validater}
      onSubmit={onSubmit}
    >
      <div className="col-md-5">
        <div className="row">
          <div className="col-11 align-items-center text-center rounded amarilloPollito">
            <Form
              className="needs-validation signUpForm"
              noValidate
            >
              <fieldset>
                <p className="text-uppercase pull-center logCategory">
                  SIGN UP
                </p>
                <div className="form-group">
                  <Field
                    type="text"
                    id="usernameLogup"
                    className="form-control input-lg userNameLogUp"
                    placeholder="User name"
                    aria-label="your new Username"
                    name="userNameLogUp"
                    required
                  />
                  <ErrorMessage name="userNameLogUp">
                    {(errorMsg) => (
                      <div className="errorMessage">{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-group">
                  <Field
                    type="email"
                    id="email"
                    className="form-control input-lg emailLogUp"
                    placeholder="Email Address"
                    aria-label="your new emailaddress"
                    name="emailLogUp"
                    required
                  />
                  <ErrorMessage name="emailLogUp">
                    {(errorMsg) => (
                      <div className="errorMessage">{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-group">
                  <Field
                    type="password"
                    id="passwordSignup"
                    className="form-control input-lg passwordLogUp"
                    placeholder="Password"
                    aria-label="your new password"
                    name="passwordLogUp"
                    required
                  />
                  <div className="row">
                    <div className="col-12">{rendering}</div>
                  </div>
                  <ErrorMessage name="passwordLogUp">
                    {(errorMsg) => (
                      <div className="row">
                        <div className="col-12 errorMessage">{errorMsg}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-group">
                  <Field
                    type="number"
                    id="userID"
                    className="form-control input-lg IdLogUp"
                    placeholder="Identification"
                    aria-label="your new userID"
                    name="IdLogUp"
                    required
                  />
                  <ErrorMessage name="IdLogUp">
                    {(errorMsg) => (
                      <div className="errorMessage">{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-group">
                  <Field
                    type="text"
                    id="userposition"
                    className="form-control input-lg userPositionLogUp"
                    placeholder="Work Position"
                    aria-label="your new Job Position"
                    name="userPositionLogUp"
                    required
                  />
                  <ErrorMessage name="userPositionLogUp">
                    {(errorMsg) => (
                      <div className="errorMessage">{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-group">
                  <Field
                    type="number"
                    id="NIT"
                    className="form-control input-lg NITLogUp"
                    placeholder="NIT of your Company"
                    aria-label="your new NIT"
                    name="NITLogUp"
                    required
                  />
                  <ErrorMessage name="NITLogUp">
                    {(errorMsg) => (
                      <div className="errorMessage">{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-check">
                  <label className="form-check-label linkdark">
                    <Field
                      type="checkbox"
                      className="form-check-input"
                      name="policy"
                    />
                    
                    <div className="invalid-feedback">
                      Please accept the policy & terms to use our application.
                    </div>
                    By Clicking register you're agree to our policy & terms
                    <ErrorMessage name="policy">
                      {(errorMsg) => (
                        <div className="errorMessage">{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </label>
                </div>
              </fieldset>
              <div>
                <button type="submit" className="btn" id="btn-nav-SignUp">
                  Sign up
                </button>
                <Modal show={showDl} onHide={handleCloseDl}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <div className="text-center">Logging Up Sent</div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="md-form mb-5">
                      <i className="fas fa-envelope prefix grey-text"></i>
                      Thanks you for chosing THEBOX, we will send you a
                      confirmation email once we validate your info.
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div>
                      <a
                        className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                        onClick={handleCloseDl}
                      >
                        <b> Understood!</b>
                      </a>
                    </div>
                  </Modal.Footer>
                </Modal>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default LogupForm;
