import Layout from "../../src/containers/Layout/Layout";

const User = ({ authData, profileData }) => {
  console.log(authData, profileData);
  return (
    <Layout>

    </Layout>
  )
};

export async function getServerSideProps(context) {
  const userLogin = {
    identifier: "test@test.com",
    password: "testtestT1"
  };

  const login = await fetch(`${process.env.API_URL}/auth/local`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userLogin)
  });

  const loginResponse = await login.json();

  const profileResponse = await fetch(`${process.env.API_URL}/profiles`, {
    Authorization: `Bearer ${loginResponse.jwt}`
  });

  const profileData = await profileResponse.json();


  return {
    props: {
      authData: loginResponse,
      profileData: profileData
    }
  }

}

export default User;