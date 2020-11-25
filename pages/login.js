import React from "react";
import Layout from "../src/containers/Layout/Layout";
import LoginForm from "../src/containers/LoginForm/LoginForm";

const Login = () => {
  return(
      <Layout>
        <main>
          <section 
          id="login"
          className="pt-8">
            <h2 className="text-md mb-4">
              Already have an account?
            </h2>
            <p className="text-md mb-2">
              Sign in below.
            </p>
            <LoginForm />
          </section>
        </main>
      </Layout>
  )
};

export default Login;