import React from "react";
import { parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import Layout from "../../../src/containers/Layout/Layout";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const User = ({ data: { username, name, created_at } }) => {
  return (
    <Layout>
      <main>
        <section className="">
          <h1 className="text-md mt-8">
            Hi, {name}.
          </h1>
          <div className="h-64 w-2/4 m-auto p-4 bg-light-bg">
            <p className="mb-4">
              user since: {created_at}
            </p>
            <p className="mb-4">
              username: {username}
            </p>
            <p className="mb-4">
              email: {username}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const user = parseCookies(ctx).user;
  const jwt = parseCookies(ctx).jwt;
  const userResponse = await fetch(`${publicRuntimeConfig.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  const userData = await userResponse.json();

  if (ctx.query.id !== user) {
    return {
      redirect: {
        destination: `/dashboard/users/${user}`,
        permanent: false
      }
    }
  }

  return {
    props: {
      data: userData
    }
  }
}

export default User;