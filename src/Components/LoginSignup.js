import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./loginSignup.css";

export default function LoginSignup() {
  //toggle card bw sign up and login
  var login;
  var signUp;
  var btn;
  useEffect(() => {
    login = document.getElementById("login");
    signUp = document.getElementById("signUp");
    btn = document.getElementById("btn");
  });
  function signupf() {
    login.style.left = "-400px";
    signUp.style.left = "50px";
    btn.style.left = "110px";
  }
  function loginf() {
    login.style.left = "50px";
    signUp.style.left = "450px";
    btn.style.left = "0px";
  }
  //sign in
  const [show, setShow] = useState(false);
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  function submit_signup(e) {
    e.preventDefault();
    if (!user.name) {
      alert("Please enter the name");
    } else if (!user.email) {
      alert("Please enter the Email");
    } else if (!user.password) {
      alert("Password is empty");
    } else {
      let data = {
        username: user.name,
        email: user.email,
        password: user.password,
      };
      fetch("https://parseapi.back4app.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "X-Parse-Application-Id": "Zuwgx3kZm3oOLZi56uRzq9rJYfyohQ8u4B2mVX5J",
          "X-Parse-REST-API-Key": "B3UUNqFsT4NVQ3BXMXRnyLFkcvtDlzwIUITKxlWm",
          "X-Parse-Revocable-Session": 1,
        },
      })
        .then((result) => {
          result.json().then((res) => {
            if (res.code === 202) {
              alert("User already exist");
            }
          });
        })
        .catch((e) => {
          console.error("error occures : ", e);
        });
      setSubmit(true);
    }
  }
  function handleShowHide() {
    setShow(!show);
  }

  function submit_login() {}

  return (
    <>
      <div className="container">
        <div className="form_box">
          <div className="button_box">
            <div id="btn"></div>
            <button type="button" className="toggle_btn" onClick={loginf}>
              Login
            </button>
            <button type="button" className="toggle_btn" onClick={signupf}>
              Sign Up
            </button>
          </div>
          <form id="login" action="" className="input_group">
            <input
              type="text"
              className="input_field"
              placeholder="User Name"
              required
            />
            <input
              type="text"
              className="input_field"
              placeholder="Password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
            />
            <button
              type="submit"
              onClick={submit_login}
              className="submit_login_btn"
            >
              Log In
            </button>
          </form>
          <form
            id="signUp"
            action=""
            className="input_group"
            onSubmit={submit_signup}
          >
            <input
              type="text"
              className="input_field"
              placeholder="User Name"
              value={user.name}
              onChange={(event) => {
                setuser((user) => ({ ...user, name: event.target.value }));
              }}
            />
            <input
              type="email"
              className="input_field"
              placeholder="Email"
              value={user.email}
              onChange={(event) => {
                setuser((user) => ({ ...user, email: event.target.value }));
              }}
            />
            <input
              type={show ? "text" : "password"}
              className="input_field"
              placeholder="Password"
              value={user.password}
              onChange={(event) => {
                setuser((user) => ({
                  ...user,
                  password: event.target.value,
                }));
              }}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
            />
            {show ? (
              <FontAwesomeIcon
                icon={faEye}
                id="show_hide"
                onClick={handleShowHide}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                id="show_hide"
                onClick={handleShowHide}
              />
            )}
            <p id="msg">
              Password Must contains 7 characters, 1 number, 1 uppercase, 1
              lowercase letter, one special character.
            </p>
            <button type="submit" className="submit_SignUp_btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
