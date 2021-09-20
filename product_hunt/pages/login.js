import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Form, Div, Submit, Error } from "../components/ui/Form";
import { css } from "@emotion/react";
import Router from "next/router";

// Firebase
import firebase from "../firebase";

// Validations
import useValidation from "../hooks/useValidation";
import validateLogIn from "../validations/log-in-validationRules";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [error, setError] = useState(false);
  const { values, errors, handleChange, handleSubmit, handleBlur } = useValidation(initialState, validateLogIn, logIn);
  const { email, password } = values;

  async function logIn() {
    try {
      await firebase.logIn(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Something went wrong login the user", error);
      let errorMessage = error.message
        .split(" ")
        .slice(-1)
        .pop()
        .replace("(", "")
        .replace(")", "")
        .toUpperCase();
      setError(errorMessage);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Log In
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email..."
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Div>

            {errors.email && <Error>{errors.email}</Error>}

            <Div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password..."
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Div>

            {errors.password && <Error>{errors.password}</Error>}

            <Submit type="submit" value="Log In" />

            {error && <Error>{error}</Error>}
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default Login;
