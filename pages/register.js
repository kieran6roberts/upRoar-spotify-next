import React from "react";
import Layout from "../src/containers/Layout/Layout";
import RegisterForm from "../src/containers/RegisterForm/RegisterForm";

const Register = () => {
  return(
  <Layout>
    <main>
      <section 
      id="login"
      className="pt-8">
        <h2 className="text-md text-txt text-center mb-4">
          Welcome to upRoar!
        </h2>
        <p className="text-md text-center text-pink-400 mb-2">
          Create a free account with us below.
        </p>
        <p className="text-xs text-txt uppercase text-center mb-2">
          All fields required
        </p>
        <RegisterForm />
      </section>
    </main>
  </Layout>
  )
};

export default Register;