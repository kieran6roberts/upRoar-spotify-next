import Layout from "@/containers/Layout/Layout";
import PasswordResetForm from "@/containers/PasswordResetForm/PasswordResetForm";

function ResetPassword () {
  return (
    <Layout>
      <main>
        <section
        className="pt-8"
        id="reset"
        >
          <h2 className="mb-4 text-md">
            Forgotten your password?
          </h2>
          <p className="mb-2 text-md">
            Reset it below
          </p>
          <PasswordResetForm />
        </section>
      </main>
    </Layout>
  );
}

export default ResetPassword;
