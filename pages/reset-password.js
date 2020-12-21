import Layout from "@/containers/Layout/Layout";
import PasswordResetForm from "@/containers/PasswordResetForm/PasswordResetForm";
import PageHead from "@/components/PageHead/PageHead";

function ResetPassword () {
  return (
    <>
    <PageHead
    currentURL="upRoar"
    description="Forgotten your upRoar music account password? Reset it here."
    title="upRoar - Password reset"
    />
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
    </>
  );
}

export default ResetPassword;
