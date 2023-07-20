import React, { useState } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/register-background.png";
import logo from "../assets/logo.png";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: black;

  .logo {
    height: 6rem;
    padding: 1rem;
  }

  @media screen and (min-width: 700px) {
    background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url(${backgroundImage}) center/cover no-repeat;
    .logo {
      height: 7rem;
    }
  }
`;

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  max-width: 400px;
  padding: 2rem 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;

  .new {
    text-align: center;
  }

  .title {
    text-align: center;
    margin-bottom: 2rem;

    h3 {
      font-size: 1.5rem;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input {
      padding: 0.5rem 1rem;
      width: 100%;
      background-color: #333333;
      color: white;
      border: none;
      outline: none;
      border-radius: 5px;
      font-size: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      width: 100%;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;
      border-radius: 5px;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .login {
      color: white;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  @media screen and (min-width: 700px) {
    margin-top: 1rem;
    max-width: 400px;
    background: rgba(0, 0, 0, 0.6);
    padding: 2rem 2rem 3rem 2rem;
    border-radius: 10px;
  }
`;

export default function Signup() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <img src={logo} alt="Logo" className="logo" />
      <Content>
        <div className="title">
          <h3>Signup</h3>
        </div>
        <div className="container form">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Password (atleast 6 characters)"
            name="password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button onClick={handleSignIn}>Sign Up</button>
          <p className="new">
            Have an Account?{" "}
            <a className="login" href onClick={() => navigate("/login")}>
              Login
            </a>
          </p>
        </div>
      </Content>
    </Container>
  );
}
