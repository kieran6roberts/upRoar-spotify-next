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
        <h2 className="text-md mb-4">
          Welcome to upRoar
        </h2>
        <p className="text-md mb-2">
          Create a free account with us below.
        </p>
        <RegisterForm />
      </section>
    </main>
  </Layout>
  )
};

export default Register;