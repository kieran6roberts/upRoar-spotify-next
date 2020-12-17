import React, { useState } from "react";
import { parseCookies } from "nookies";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

import EditUserForm from "src/containers/EditUserForm/EditUserForm";
import Layout from "src/containers/Layout/Layout"; 
import ChangePasswordForm from "src/containers/ChangePasswordForm/ChangePasswordForm";

const { publicRuntimeConfig } = getConfig();

const User = ({ data: { username, name, created_at, email } }) => {
  const [ currentTab, setCurrentTab ] = useState("overview");

  const renderHeader = param => {
    switch(param) {
      case "overview":
        return "Your Profile";
      case "edit profile":
        return "update your profile information";
      case "change password":
        return "change your password";
      default:
        return "Your Profile";
    };
  };

  return (
    <Layout>
      <main>
          <h2 className="text-md text-txt my-4">
            Hi {name}
          </h2>
          <p className="text-md text-gray-400 text-gray-400 mb-2">
            {renderHeader(currentTab)}
          </p>
          <section className="flex flex-col md:flex-row justify-between items-top pt-8">
            <div className="md:w-2/5">
              <ul className="flex md:flex-col justify-evenly text-sm text-txt capitalize">
                <li className="mb-8 md:mb-16">
                  <button onClick={() => setCurrentTab("overview")}
                  className="">
                    <a className="p-2 md:p-4 bg-pri rounded hover:bg-gray-200 hover:text-pri">
                      account overview
                    </a>
                  </button>
                </li>
                <li className="mb-8 md:mb-16">
                  <button onClick={() => setCurrentTab("edit profile")}>
                    <a className="p-2 md:p-4 bg-pri rounded hover:bg-gray-200 hover:text-pri">
                      edit profile
                    </a>
                  </button>
                </li>
                <li className="mb-8 md:mb-16">
                  <button onClick={() => setCurrentTab("change password")}>
                    <a className="p-2 md:p-4 bg-pri rounded hover:bg-gray-200 hover:text-pri">
                      change password
                    </a>
                  </button>
                </li>
              </ul>
            </div>
            <div className={`${currentTab !== "overview" ? "hidden" : "flex"} flex-col justify-center items-end md:items-center w-full flex-auto`}>
              <div className="h-64 w-full p-x4 text-sm">
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
            {currentTab === "edit profile" && <EditUserForm />}
            {currentTab === "change password" && <ChangePasswordForm />}
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