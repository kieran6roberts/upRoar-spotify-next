import React from "react";

import Layout from "@/containers/Layout/Layout";
import LoginForm from "@/containers/LoginForm/LoginForm";

function Login () {
  return (
    <Layout>
      <main>
        <section
        className="pt-8"
        id="login"
        >
          <h2 className="mb-4 text-center text-md text-txt">
              Already have an account?
          </h2>
          <p className="mb-4 text-center text-pink-400 text-md">
              Sign in below.
          </p>
          <LoginForm />
        </section>
      </main>
    </Layout>
  );
}

export default Login;
