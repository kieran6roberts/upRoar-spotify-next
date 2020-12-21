import React from "react";

import Layout from "@/containers/Layout/Layout";
import RegisterForm from "@/containers/RegisterForm/RegisterForm";

function Register () {
  return (
    <Layout>
      <main>
        <section
        className="pt-8"
        id="login"
        >
          <h2 className="mb-4 text-center text-md text-txt">
              Welcome to upRoar!
          </h2>
          <p className="mb-4 text-center text-pink-400 text-md">
              Create a free account with us below.
          </p>
          <p className="mb-8 text-xs text-center text-txt">
              In order to access upRoar's music once registered, we will require that you connect
              an existing spotify profile to enable access to all of our features.
          </p>
          <p className="mb-2 text-xs text-center uppercase text-txt">
              All fields required
          </p>
          <RegisterForm />
        </section>
      </main>
    </Layout>
  );
}

export default Register;
