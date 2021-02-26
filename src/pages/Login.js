import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { getUserEmail, disableButton } from "../actions/user";
import store from "../store";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      inactive: true,
      count: "",
    };
  }

  dispatchButton() {
    const actualStore = store.getState().UserInfo;
    const disableButton = actualStore.disablebutton;

    console.log(disableButton);
    alert("oi");
  }

  emailValidation(event) {
    const email = event.target.value;
    let at = email.indexOf("@");
    let userName = email.substring(0, email.indexOf("@"));
    let domainEmail = email.substring(email.indexOf("@") + 1, email.length);
    let dotsIndomainEmail = Object.values(domainEmail).filter((item) =>
      item.includes(".")
    ).length;

    if (
      at !== "" &&
      at !== -1 &&
      at !== " " &&
      at !== null &&
      at !== undefined &&
      userName.length >= 2 &&
      userName.includes("@") === false &&
      userName.includes(" ") === false &&
      userName.includes(".") >= 0 &&
      domainEmail.length >= 3 &&
      domainEmail.includes("@") === false &&
      domainEmail.includes(" ") === false &&
      dotsIndomainEmail <= 2 &&
      (domainEmail.includes(".com") || domainEmail.includes(".com.br")) &&
      domainEmail.lastIndexOf(".") < domainEmail.length - 1
    ) {
      this.setState({
        count: 1,
        email: email,
      });
    

    }

    return this.state.count;
  }
  passValidation(event) {
    const pass = event.target.value;
    if (pass.length >= 6) {
      this.setState({
        inactive: false,
        count: 2,
      });
    }
    return this.state.count, this.state.inactive, this.cofirm;
  }

  cofirm() {
    const { count, email, inactive } = this.state;
    const btn = document.getElementById("button").disabled;
    if (count == 2 && inactive == false && btn === false) {
      this.props.get_user_email(email);
      // console.log(store.getState());
      this.props.history.push("/carteira");
      console.log(email);
      return count, inactive, btn;
    }
  
  }

  render() {
    const { inactive } = this.state;
    return (
      <>
        <div className="limiter">
          <div className="container-login container-login-bg">
            <div className="wrap-login">
              <form name="f1" className="login-form validate-form">
                <span className="login-form-logo">
                  <i className="zmdi zmdi-landscape"></i>
                </span>

                <span className="login-form-title">Log in</span>

                <div
                  className="wrap-input validate-input"
                  data-validate="Enter username"
                >
                  <input
                    data-testid="email-input"
                    onChange={this.emailValidation.bind(this)}
                    className="input"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  <i className=" focus-input" placeholder="&#xf644;"></i>
                </div>

                <div
                  className="wrap-input validate-input"
                  data-validate="Enter password"
                >
                  <input
                    data-testid="password-input"
                    onChange={this.passValidation.bind(this)}
                    className="input"
                    type="text"
                    name="pass"
                    placeholder="Password"
                  />
                  <span
                    className="focus-input"
                    data-placeholder="&#xf191;"
                  ></span>
                </div>

                <div className="contact-form-checkbox">
                  <input
                    className="input-checkbox"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
                  <label className="label-checkbox" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                <div className="container-login-form-btn">
                  <button
                    disabled={inactive}
                    name="input-email"
                    type="button"
                    id="button"
                    className="login-form-btn"
                    value="Entrar"
                    onClick={this.cofirm.bind(this)}
                  >
                    Entrar
                  </button>
                </div>

                <div className="text-center">
                  <a className="txt1" href="#">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.get_User_Email,
  disableButton: state.disableButton,
});

const mapDispatchToProps = (dispatch) => ({
  get_user_email: (get_User_Email) => dispatch(getUserEmail(get_User_Email)),
  disable_button: () => dispatch(disableButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// field.match(/^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/
// )
// const toDispatch = store.getState().user.email;
// this.props.get_user_email(field);
// field.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{1})*/i);
