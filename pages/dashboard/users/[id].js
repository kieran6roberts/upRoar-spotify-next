import React from "react";
import Layout from "../../../src/containers/Layout/Layout";
import { parseCookies } from "nookies";

const User = () => {
  return (
    <Layout>

    </Layout>
  )
};

export async function getServerSideProps(ctx) {
  const user = parseCookies(ctx).user;

  if (ctx.query.id !== user) {
    return {
      redirect: {
        destination: `/dashboard/users/${user}`,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default User;