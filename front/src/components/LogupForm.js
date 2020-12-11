import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import "../css/perfilcss.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PasswordStrength from "./PasswordStrength";
import Modal from "react-bootstrap/Modal";
import {FormattedMessage} from 'react-intl';


let opcionesIniciales = {
  "es":{"UsernameR":"Tienes que ingresar el usuario!", 
  "PasswordR":"Tienes que ingresar la contraseña!", 
  "Username":"Usuario",
  "Password":"Contraseña",
  "UsernameL":"Tu usuario debe ser de más de 4 caracteres",
  "PasswordL":"Tu contraseña debe ser de más de 6 caracteres",
  "Email":"Correo",
  "EmailR":"Tienes que ingresar tu correo",
  "EmailF":"Eso no es un correo",
  "IDR":"Se requiere su numero de identificacion",
  "Position":"Cargo",
  "PositionR":"Tienes que indicar tu cargo",
  "NIT":"NIT de tu compañia",
  "NITR":"El NIT es requerido",
  "NITL":"El NIT es de almenos 10 digitos",
  "Consent":"Tienes que estar de acuerdo con los terminos y condiciones",
  "Identification":"Identificación" },

  "en":{"UsernameR":"Your username is required", 
  "PasswordR":"Your password is required", 
  "Username":"Username",
  "Password":"Password",
  "UsernameL":"Your username should be at least 4 characters long",
  "PasswordL":"Your password should be at least 6 characters long",
  "Email":"Email",
  "EmailR":"Your email is required",
  "EmailF":"Your email doesn't have the correct formato",
  "IDR":"Your ID is required",
  "Position":"Work Position",
  "PositionR":"Your Job title/App role position is required",
  "NIT":"NIT of your company",
  "NITR":"The NIT of your company is required",
  "NITL":"El NIT es de almenos 10 digitos",
  "Consent":"Your consent is required for registration",
  "Identification":"Identification"},


  "zh":{"UsernameR":"您的用户名是必填项", 
  "PasswordR":"您的密码是必需的", 
  "Username":"用户名",
  "Password":"密码",
  "UsernameL":"您的用户名至少应包含4个字符",
  "PasswordL":"您的密码至少应为6个字符",
  "Email":"电子邮件",
  "EmailR":"您的电子邮件为必填项",
  "EmailF":"您的电子邮件格式不正确",
  "IDR":"您的ID为必填项",
  "Position":"工作职位",
  "PositionR":"您的职位/应用角色职位是必填项",
  "NIT":"贵公司的NIT",
  "NITR":"您公司的NIT是必填项",
  "NITL":"NIT至少为10位数字",
  "Consent":"注册需要您的同意",
  "Identification":"身份证明"}
}
let opciones={}
function LogupForm() {
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
      errors.userNameLogUp = opciones.UsernameR;
    } else if (values.userNameLogUp.length < 4) {
      errors.userNameLogUp = opciones.UsernameL;
    }
    if (!values.emailLogUp) {
      //se ha ingresado un valor en emailLogUp
      errors.emailLogUp = opciones.EmailR;
    } else if (!values.emailLogUp.includes("@")) {
      errors.emailLogUp = opciones.EmailF;
    }
    if (!values.passwordLogUp) {
      //se ha ingresado un valor en passwordLogUp
      errors.passwordLogUp = opciones.PasswordR;
    } else {
      setPasswordLvl(1);
      setRendering(PasswordStrengthRender(values.passwordLogUp));
      if (values.passwordLogUp.length < 6) {
        errors.passwordLogUp = opciones.PasswordL;
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
      errors.IdLogUp = opciones.IDR;
    }
    if (!values.userPositionLogUp) {
      //se ha ingresado un valor en userPositionLogUp
      errors.userPositionLogUp = opciones.PositionR;
    }
    if (!values.NITLogUp) {
      //se ha ingresado un valor en NITLogUp
      errors.NITLogUp = opciones.NITR;
    } else if (toString(values.NITLogUp).length < 9) {
      errors.NITLogUp = opciones.NITL;
    }
    if(!values.policy){
      errors.policy = opciones.Consent;
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
                  <FormattedMessage id="SignUp" defaultMessage="SIGN UP"/> 
                </p>
                <div className="form-group">
                  <Field
                    type="text"
                    id="usernameLogup"
                    className="form-control input-lg userNameLogUp"
                    placeholder= {opciones.Username}
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
                    placeholder={opciones.Email}
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
                    placeholder={opciones.Password}
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
                    placeholder={opciones.Identification}
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
                    placeholder={opciones.Position}
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
                    placeholder={opciones.NIT}
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
                      <FormattedMessage id="ConditionsF" defaultMessage="Please accept the policy & terms to use our application."/> 
                    </div>
                    <FormattedMessage id="Conditions" defaultMessage=" By Clicking register you're agree to our policy & terms"/>
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
                   <FormattedMessage id ="SignUp" defaultMessage="Sign up"/> 
                </button>
                <Modal show={showDl} onHide={handleCloseDl}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <div className="text-center"><FormattedMessage id ="LogginUp" defaultMessage="Logging Up Sent"/></div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="md-form mb-5">
                      <i className="fas fa-envelope prefix grey-text"></i>
                      <FormattedMessage id ="RegisterMessage" defaultMessage="Thanks you for chosing THEBOX, we will send you a
                      confirmation email once we validate your info."/>T
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div>
                      <a
                        className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                        onClick={handleCloseDl}
                      >
                        <b> <FormattedMessage id="Understood" defaultMessage ="Understood!"/></b>
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
