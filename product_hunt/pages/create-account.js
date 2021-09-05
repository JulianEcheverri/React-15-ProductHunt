import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Form, Div, Submit, Error } from "../components/ui/Form";
import { css } from "@emotion/react";

// Validations
import useValidation from "../hooks/useValidation";
import validateCreateAccount from "../validations/create-account_validationRules";

const CreateAccount = () => {
  const initialState = {
    name: '',
    email: '',
    password: ''
  };

  const { values, errors, submitForm, handleChange, handleSubmit, handleBlur } = useValidation(initialState, validateCreateAccount, createAccount);
  const { name, email, password } = values;

  function createAccount() {
    console.log('Creating an account');
  }

  return (
    <div>
      <Layout>
        <>
          <h1 css={css`
        text-align: center;
        margin-top: 5rem;
        `}>Create Account</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name..."
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Div>

            {errors.name && <Error>{errors.name}</Error>}

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

            <Submit
              type="submit"
              value="Create Account"
            />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default CreateAccount;
