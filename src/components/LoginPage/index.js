import { Component } from "react";
import Cookies from "js-cookie";

import "./index.css";

class LoginForm extends Component {
  componentDidMount() {
    // NOTE: We wrote this code here because we kept redirect URL as login route, if you give a different route, make sure to move this code to the respective route or App.js

    const hashKey = this.getHashKeyFromLocationAfterLogin();

    if (hashKey.access_token) {
      this.postHashKeyAsMessage(hashKey);
    }

    this.getMessageAndsetAccessTokenInCookies();
  }

  getHashKeyFromLocationAfterLogin = () => {
    const { location } = this.props;

    const { hash } = location;
    const hashKey = {};
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams);
    const error = queryParams.get("error");

    if (error === "access_denied") {
      window.close();
    }

    hash
      .replace(/^#\/?/, "")
      .split("&")
      .forEach((keyValue) => {
        const spl = keyValue.indexOf("=");
        if (spl !== -1) {
          hashKey[keyValue.substring(0, spl)] = keyValue.substring(spl + 1);
        }
      });
    return hashKey;
  };

  postHashKeyAsMessage = (hashKey) => {
    window.opener.postMessage(
      JSON.stringify({
        type: "access_token",
        access_token: hashKey.access_token,
        expires_in: hashKey.expires_in || 0,
      }),
      "*"
    );
    window.close();
  };

  getMessageAndsetAccessTokenInCookies = () => {
    window.addEventListener(
      "message",
      (event) => {
        const hash = JSON.parse(event.data);
        if (hash.type === "access_token") {
          const oneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
          console.log(oneHour);
          Cookies.set("pa_token", hash.access_token, {
            expires: oneHour,
          });
          window.location.replace("/");
        }
      },
      false
    );
  };

  isDevelopmentEnvironment = () => {
    if (
      process.env.NODE_ENV === "development" ||
      window.location.hostname === "localhost"
    ) {
      return true;
    }
    return false;
  };

  getRedirectURL = () => {
    if (this.isDevelopmentEnvironment()) {
      /* ADD THIS URL to your Application Redirect URIs to redirect after authentication success OR failure */
      return "http://localhost:3004/login";
    }
    /* Change this redirectURL accordingly before publishing your project and ADD THIS URL to your Application Redirect URIs to redirect after authentication success OR failure */
    return "https://sample.ccbp.tech/login";
  };

  openLoginModal = () => {
    // YOU NEED TO ADD YOUR CLIENT ID HERE
    const clientId = "d32a655e-0836-4d5c-99ad-afa79aefcb46";

    const redirectUrl = this.getRedirectURL();
    const token = "bcf18ff3-0a1e-494d-9586-128fd519604d";
    const string = "sriram";

    const url = `https://api.aniapi.com/v1/oauth?
    response_type=${token}
    &client_id=${clientId}
    &redirect_uri=${redirectUrl}&state=${string}`;

    const width = 450;
    const height = 730;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      url,
      "Spotify",
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height = ${height}, top = ${top}, left = ${left}`
    );
  };

  submitForm = async (event) => {
    event.preventDefault();
    this.openLoginModal();
  };

  render() {
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://aniapi.com/img/aniapi_icon.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <button type="submit" className="login-button">
            LOG IN ANIAPI
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
