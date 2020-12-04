import React from "react";
import { parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import Layout from "../../../src/containers/Layout/Layout";
import Link from "next/link";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const User = ({ data: { username, name, created_at, email } }) => {
  return (
    <Layout>
      <main>
            <h2 className="text-md text-txt mb-4">
              Hi {name}
            </h2>
            <p className="text-md text-acc text-gray-400 mb-2">
              Your Profile
            </p>
        <section className="flex flex justify-between items-top pt-8">
            <div className="w-1/5 flex-auto">
              <h2 className="mb-8">
                Profile nav
              </h2>
              <ul className="text-sm text-txt">
                <li className="mb-8">
                  <Link href="/" passHref>
                    <a className="capitalize p-4">
                      account overview
                    </a>
                  </Link>
                </li>
                <li className="mb-8">
                  <Link href="/" passHref>
                    <a className="capitalize p-4">
                      edit profile
                    </a>
                  </Link>
                </li>
                <li className="mb-8 p-4">
                  <Link href="/" passHref>
                    <a className="">
                      change password
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-end md:items-center w-full flex-auto">
              <div className="h-64 w-3/5 p-4 capitalize text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-400">
                    user since
                  </p>
                  <span className="text-sm text-txt">
                    {created_at.substring(0, 10)}
                  </span>
                </div>
                <div className="h-0.5 w-full bg-gray-100 my-8 mx-auto" />
                <div className="flex justify-between">
                  <p className="text-gray-400">
                    username
                  </p>
                  <span className="text-sm text-txt">
                    {username}
                  </span>
                </div>
                <div className="h-0.5 w-full bg-gray-100 my-8 mx-auto" />
                <div className="flex justify-between">
                  <p className="text-gray-400">
                    email
                  </p>
                  <span className="text-sm text-txt">
                    {email}
                  </span>
                </div>
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