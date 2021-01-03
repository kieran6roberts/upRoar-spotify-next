import { parseCookies } from "nookies";
import React, { useState } from "react";

import PageHead from "@/components/PageHead/PageHead";
import ChangePasswordForm from "@/containers/Forms/ChangePasswordForm/ChangePasswordForm";
import EditUserForm from "@/containers/Forms/EditUserForm/EditUserForm";
import Layout from "@/containers/Layout/Layout";
import { fetcher } from "@/utility/fetcher";

function User ({ data: { username, name, created_at, email } }) {
  const [
    currentTab,
    setCurrentTab
  ] = useState("overview");

  function renderHeader (param) {
    switch (param) {
    case "overview":
      return "Your Profile";
    case "edit profile":
      return "Change your email address";
    case "change password":
      return "Change your password";
    default:
      return "Your Profile";
    }
  }

  return (
    <>
    <PageHead
    currentURL={`https://uproar-music.vercel.app/dashboard/users/${username}`}
    description="User profile page."
    title="upRoar - My Profile"
    />
    <Layout>
      <main>
        <h2 className="my-4 text-md text-txt">
            Hi {name}
        </h2>
        <p className="mb-2 text-gray-400 text-md">
          {renderHeader(currentTab)}
        </p>
        <section className="flex flex-col items-start justify-between pt-8 2xl:pt-32 md:flex-row">
          <div className="md:w-2/5">
            <ul className="flex-col mb-20 text-sm justify-evenly text-txt md:mb-0">
              <li className="mb-8 md:mb-16 xl:mb-24">
                <button
                className="focus:outline-none focus:ring-2 focus:ring-pink-200"
                onClick={() => setCurrentTab("overview")}
                type="button"
                >
                  <a className="py-2 uppercase rounded md:p-4 bg-pri hover:bg-gray-200 hover:text-pri">
                      account overview
                  </a>
                </button>
              </li>
              <li className="mb-8 md:mb-16 xl:mb-24">
                <button
                className="focus:outline-none focus:ring-2 focus:ring-pink-200"
                onClick={() => setCurrentTab("edit profile")}
                type="button"
                >
                  <a className="py-2 uppercase rounded md:p-4 bg-pri hover:bg-gray-200 hover:text-pri">
                      change email
                  </a>
                </button>
              </li>
              <li className="mb-8 md:mb-16 xl:mb-24">
                <button
                className="focus:outline-none focus:ring-2 focus:ring-pink-200"
                onClick={() => setCurrentTab("change password")}
                type="button"
                >
                  <a className="py-2 uppercase rounded md:p-4 bg-pri hover:bg-gray-200 hover:text-pri">
                      change password
                  </a>
                </button>
              </li>
            </ul>
          </div>
          <div className={`${currentTab !== "overview"
          ? "hidden"
          : "flex"} flex-col justify-center items-end md:items-center w-full flex-auto`}
          >
            <div className="w-full h-64 text-sm p-x4">
              <div className="flex justify-between">
                <p className="text-gray-400">
                    user since
                </p>
                <span className="text-sm text-txt">
                  {created_at.substring(0, 10)}
                </span>
              </div>
              <div className="h-0.5 w-full bg-gray-100 2xl:my-20 my-8 mx-auto" />
              <div className="flex justify-between">
                <p className="text-gray-400">
                    username
                </p>
                <span className="text-sm text-txt">
                  {username}
                </span>
              </div>
              <div className="h-0.5 w-full bg-gray-100 2xl:my-20 my-8 mx-auto" />
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
    </>
  );
}

export async function getServerSideProps (ctx) {
  const { user } = parseCookies(ctx);
  const { jwt } = parseCookies(ctx);
  const userResponse = await fetcher(`${process.env.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  if (ctx.query.id !== user) {
    return {
      redirect: {
        destination: `/dashboard/users/${user}`,
        permanent: false
      }
    };
  }

  return {
    props: {
      data: userResponse
    }
  };
}

export default User;
