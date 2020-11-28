import React from "react";
import { parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import Layout from "../../../src/containers/Layout/Layout";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const User = ({ data: { username, name, created_at, email } }) => {
  return (
    <Layout>
      <main>
        <section className="pt-8">
        <h2 className="text-md mb-4">
              Hi {name}
            </h2>
            <p className="text-md text-gray-400 mb-2">
              Your Profile
            </p>
          <div className="h-64 w-3/5 p-4 capitalize text-sm">
            <div className="flex justify-between">
              <p className="text-gray-400">
                user since
              </p>
              <span>
                {created_at.substring(0, 10)}
              </span>
            </div>
            <div className="h-0.5 w-full bg-gray-100 my-8 mx-auto" />
            <div className="flex justify-between">
              <p className="text-gray-400">
                username
              </p>
              <span>
                {username}
              </span>
            </div>
            <div className="h-0.5 w-full bg-gray-100 my-8 mx-auto" />
            <div className="flex justify-between">
              <p className="text-gray-400">
                email
              </p>
              <span>
                {email}
              </span>
            </div>
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