import { is } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { useState } from "react";
import { FC } from "react";
import { Row } from "react-bootstrap";
import {
  AppStyle,
  background,
  borderWidth,
  cursorPointer,
  flexCenterInParent,
  flexHori,
  flexVerti,
  height,
  marginBottom,
  marginEnd,
  margin,
  paddingHori,
  minHeight,
  paddingVerti,
  radius,
  regular,
  textColor,
  width,
  marginVertical,
} from "../../AppStyle";
import ButtonView from "../../components/ButtonView";
import Column from "../../components/Column";
import TextView from "../../components/Text";
interface LoginButtonProps {
  onClick: () => void;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={AppStyle(
        cursorPointer(),
        flexHori(),
        marginBottom(20),
        width(300),
        paddingVerti(12),
        flexCenterInParent(),
        radius(15),
        borderWidth(0.5),
        background(props.backgroundColor)
      )}
    >
      <span style={AppStyle(regular(15), textColor(props.textColor))}>
        {props.text}
      </span>
    </button>
  );
};

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event: any) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event: any) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <Column style={AppStyle(marginVertical(12))}>
        <label htmlFor="email" style={textColor("white")}>
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          style={AppStyle(
            width(300),
            radius(15),
            paddingHori(15),
            borderWidth(0),
            height(40)
          )}
        />
      </Column>

      <Column style={AppStyle(marginVertical(12))}>
        <label htmlFor="password" style={textColor("white")}>
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          style={AppStyle(
            width(300),
            radius(15),
            paddingHori(15),
            borderWidth(0),
            height(40)
          )}
        />
      </Column>
      <div style={AppStyle(marginVertical(12))}>
        <button
          style={AppStyle(
            width(300),
            height(40),
            radius(15),
            marginVertical(24),
            background("blue"),
            textColor("white"),
            borderWidth(0)
          )}
        >
          Hoàn Thành
        </button>
      </div>
    </form>
  );
};

interface SignUpFormProps {}

const SignUpForm: FC<SignUpFormProps> = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event: any) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };
  const nameChangeHandler = (event: any) => {
    setEnteredName(event.target.value);
  };
  const phoneChangeHandler = (event: any) => {
    setEnteredPhone(event.target.value);
  };

  const passwordChangeHandler = (event: any) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
          <Column style={AppStyle(marginVertical(12))}>
              <label htmlFor="username" style={textColor("white")}>
                  Tên
              </label>
              <input
                  type="text"
                  value={enteredName}
                  onChange={nameChangeHandler}
                  style={AppStyle(
                      width(300),
                      radius(15),
                      borderWidth(0),
                      paddingHori(15),
                      height(40)
                  )} />
          </Column>
          <Column style={AppStyle(marginVertical(12))}>
              <label htmlFor="email" style={textColor("white")}>
                  E-Mail
              </label>
              <input
                  type="email"
                  id="email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  style={AppStyle(
                      width(300),
                      radius(15),
                      paddingHori(15),
                      borderWidth(0),
                      height(40)
                  )} />
          </Column>
          <Column style={AppStyle(marginVertical(12))}>
              <label style={textColor("white")}>Số điện thoại</label>
              <input
                  type="text"
                  id="phone-number"
                  value={enteredPhone}
                  onChange={phoneChangeHandler}
                  style={AppStyle(
                      width(300),
                      radius(15),
                      paddingHori(15),
                      borderWidth(0),
                      height(40)
                  )} />
          </Column>

          <Column style={AppStyle(marginVertical(12))} >
              <label htmlFor="password" style={textColor("white")}>
                  Mật khẩu
              </label>


          <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              style={AppStyle(
                  width(300),
                  radius(15),
                  paddingHori(15),
                  borderWidth(0),
                  height(40)
              )} />
      </Column>
      <Column style={AppStyle(marginVertical(12))}>
              <label htmlFor="password" style={textColor("white")}>
                  Nhập lại mật khẩu
              </label>
              <input
                  type="password"
                  style={AppStyle(
                      width(300),
                      radius(15),
                      paddingHori(15),
                      borderWidth(0),
                      height(40)
                  )} />
          </Column>
          <div style={AppStyle(marginVertical(12))}>
              <button
                  style={AppStyle(
                      width(300),
                      height(40),
                      radius(15),
                      marginVertical(24),
                      background("blue"),
                      textColor("white"),
                      borderWidth(0)
                  )}
              >
                  Hoàn Thành
              </button>
              </div>
    </form>
  );
}


export default function LoginScreen() {
  const [isClick, setIsClick] = useState(1);
  let [showLogInForm, setShowLogInForm] = useState(false);
  let [showSignUpForm, setShowSignUpForm] = useState(false);

  let handleLogInClick = () => {
    setShowLogInForm(!showLogInForm);
    setIsClick(1);
  };
  let handleSignUpClick = () => {
    setShowSignUpForm(!showSignUpForm);
    setIsClick(2);
  };
  const click = () => {
    if (isClick === 1) {
      return <Column>{showLogInForm && <LoginForm />}</Column>;
    } else if (isClick === 2) {
      <Column>{showSignUpForm && <SignUpForm />}</Column>;
    }
  };

  return (
    <div
      style={AppStyle(
        flexHori(),
        flexCenterInParent(),
        minHeight("100vh"),
        background("linear-gradient(180deg, #00C181 0%, #1F00C181 100%)")
      )}
    >
      <Column style={AppStyle(flexVerti(), flexCenterInParent())}>
        <h1 style={marginVertical(30)}> Dung </h1>
        {!showLogInForm && (
          <LoginButton
            onClick={handleLogInClick}
            text="Đăng nhập "
            textColor="#FFFFFF"
            backgroundColor="black"
          />
        )}
        {showLogInForm && <LoginForm />}
        {!showSignUpForm && (
          <LoginButton
            onClick={handleSignUpClick}
            textColor="#FFFFFF"
            text="Đăng kí"
            backgroundColor="black"
          />
        )}
        {showSignUpForm && <SignUpForm />}
        {click}
      </Column>
    </div>
  );
}
