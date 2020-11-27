import Layout from "../../../src/containers/Layout/Layout";
import getConfig from "next/config";
import { useAuth } from "src/context/AuthContext";

const { publicRuntimeConfig } = getConfig();

const Profile = () => {
  const { authUser } = useAuth();
  console.log(authUser);
  
  return (
    <Layout>

    </Layout>
  )
};

export default Profile;