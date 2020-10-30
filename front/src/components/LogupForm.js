import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/styleLoginLogup.css";
import { useFormik } from "formik";

function LogupForm() {
  //Objeto Formik para uso de estados y funciones de forma abreviada
  const formik = useFormik({
    initialValues: {
      userNameLogUp: "",
      emailLogUp: "",
      IdLogUp: "",
      passwordLogUp: "",
      userPositionLogUp: "",
      NITLogUp: "",
    },
    onSubmit: (values) => {
      values.preventDefault();
    },
    validate: (values) => {
      let errors = {};
      if (!values.userNameLogUp) {
        errors.userNameLogUp = "Your username is required";
      } else if (values.userNameLogUp.length < 4) {
        errors.userNameLogUp =
          "Your username should be at least 4 characters long";
      }
      if (!values.emailLogUp) {
        errors.emailLogUp = "Your email is required";
      } else if (!values.emailLogUp.includes("@")) {
        errors.emailLogUp = "Your email doesn't have the correct format";
      }
      if (!values.passwordLogUp) {
        errors.passwordLogUp = "Your password is required";
      } else if (values.passwordLogUp.length < 8) {
        errors.passwordLogUp =
          "Your password should be at least 8 characters long";
      }
      if (!values.IdLogUp) {
        errors.IdLogUp = "Your ID is required";
      }
      if (!values.userPositionLogUp) {
        errors.userPositionLogUp =
          "Your Job title/App role position is required";
      }
      if (!values.NITLogUp) {
        errors.NITLogUp = "The NIT of your company is required";
      }
      return errors;
    },
  });

  return (
    <div className="col-md-5">
      <div className="row">
        <div className="col-11 align-items-center text-center rounded amarilloPollito">
          <form
            role="form"
            className="needs-validation signUpForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <fieldset>
              <p className="text-uppercase pull-center logCategory">SIGN UP</p>
              <div className="form-group">
                <input
                  type="text"
                  name="userNameLogUp"
                  id="usernameLogup"
                  className="form-control input-lg userNameLogUp"
                  placeholder="User name"
                  onChange={formik.handleChange}
                  value={formik.values.userNameLogUp}
                  required
                />
                {formik.errors.userNameLogUp ? (
                  <div className="errorMessage">
                    {formik.errors.userNameLogUp}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="emailLogUp"
                  id="email"
                  className="form-control input-lg emailLogUp"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  value={formik.values.emailLogUp}
                  required
                />
                {formik.errors.emailLogUp ? (
                  <div className="errorMessage">{formik.errors.emailLogUp}</div>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="passwordLogUp"
                  id="passwordSignup"
                  className="form-control input-lg passwordLogUp"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordLogUp}
                  required
                />
                {formik.errors.passwordLogUp ? (
                  <div className="errorMessage">
                    {formik.errors.passwordLogUp}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="IdLogUp"
                  id="userID"
                  className="form-control input-lg IdLogUp"
                  placeholder="Identification"
                  onChange={formik.handleChange}
                  value={formik.values.IdLogUp}
                  required
                />
                {formik.errors.IdLogUp ? (
                  <div className="errorMessage">{formik.errors.IdLogUp}</div>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="userPositionLogUp"
                  id="userposition"
                  className="form-control input-lg userPositionLogUp"
                  placeholder="Work Position"
                  onChange={formik.handleChange}
                  value={formik.values.userPositionLogUp}
                  required
                />
                {formik.errors.userPositionLogUp != "" ? (
                  <div className="errorMessage">
                    {formik.errors.userPositionLogUp}
                  </div>
                ) : null}
              </div>
              <div className="form-group CompanyFieldSet1">
                <p className="text-uppercase pull-center logCategory">
                  COMPANY SIGN UP
                </p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="NITLogUp"
                  id="NIT"
                  className="form-control input-lg NITLogUp"
                  placeholder="NIT of your Company"
                  onChange={formik.handleChange}
                  value={formik.values.NITLogUp}
                  required
                />
                {formik.errors.NITLogUp != "" ? (
                  <div className="errorMessage">{formik.errors.NITLogUp}</div>
                ) : null}
              </div>
            </fieldset>
            <div className="CompanyFieldSet2">
              <fieldset>
                <div className="form-group">
                  <input
                    type="text"
                    name="companyname"
                    id="companyname"
                    className="form-control input-lg companyNameLogUp"
                    placeholder="Name of your Company"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="companyType"
                    id="companyType"
                    className="form-control input-lg companyTypeLogUp"
                    placeholder="your company type (business activity)"
                  />
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" />
                    <div className="invalid-feedback">
                      Please accept the policy & terms to use our application.
                    </div>
                    By Clicking register you're agree to our policy & terms
                  </label>
                </div>
              </fieldset>
            </div>
            <div>
              <button type="submit" className="btn" id="btn-nav-SignUp">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogupForm;
