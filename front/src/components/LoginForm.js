import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
function LoginForm() {
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
        errors.usernameLogin = "Your username is required";
      }
      if (!values.passwordLogin) {
        errors.passwordLogin = "Your password is required";
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
                Login using your account:
              </p>

              <div className="form-group">
                <input
                  type="text"
                  name="usernameLogin"
                  id="usernameLogin"
                  aria-label="youUsername"
                  className="form-control input-lg"
                  placeholder="User name"
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
                  placeholder="Password"
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
                  Sign In
                </button>
                <button type="reset" className="btn" id="btn-nav-CleanInfo">
                  Clean Info
                </button>
                <Modal show={showDl} onHide={handleCloseDl}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <div className="text-center">Logged In</div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="md-form mb-5">
                      <i className="fas fa-envelope prefix grey-text"></i>
                      Start enjoying all that THEBOX has ready for you! 
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div>
                      <a
                        className="btn btn-default btn-rounded mb-4 btnModalAddEmployee"
                        onClick={handleCloseDl}
                      >
                        <b> Nice!</b>
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
