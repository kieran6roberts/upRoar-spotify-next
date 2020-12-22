import React from "react";

import PageHead from "@/components/PageHead/PageHead";
import LoginForm from "@/containers/Forms/LoginForm/LoginForm";
import Layout from "@/containers/Layout/Layout";

function Login () {
  return (
    <>
    <PageHead
    currentURL="upRoar"
    description="Login to your upRoar music account and get playing your songs."
    title="upRoar - Login"
    />
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
    </>
  );
}

export default Login;
