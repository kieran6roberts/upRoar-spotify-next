import Layout from "src/containers/Layout/Layout";
import PasswordResetForm from "src/containers/PasswordResetForm/PasswordResetForm"

const ResetPassword = () => {
  return (
    <Layout>
      <main>
        <section
        id="reset"
        className="pt-8">
          <h2 className="text-md mb-4">
            Forgotten your password? 
          </h2>
          <p className="text-md mb-2">
            Reset it below
          </p>
          <PasswordResetForm />
        </section>
      </main>
    </Layout>
  )
};

export default ResetPassword;