import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import { useFormik } from "formik";

function LoginForm() {
  //Objeto Formik para uso de estados y funciones de forma abreviada
  const formik = useFormik({
    initialValues: {
      usernameLogin: "",
      passwordLogin: "",
    },
    onSubmit: (values) => {
      values.preventDefault();
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
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordLogin}
                  required
                />
              </div>
              {formik.errors.passwordLogin ? (
                <div className="errorMessage">
                  {formik.errors.passwordLogin}
                </div>
              ) : null}
              <div>
                <button type="submit" className="btn" id="btn-nav-SignIn">
                  Sign In
                </button>
                <button type="reset" className="btn" id="btn-nav-CleanInfo">
                  Clean Info
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
