import Layout from "@/containers/Layout/Layout";
import ResetForm from "@/containers/ResetForm/ResetForm";
import PageHead from "@/components/PageHead/PageHead";

function Reset () {
  return (
    <>
    <PageHead
    currentURL="upRoar"
    description="Enter your new password."
    title="upRoar - New password"
    />
    <Layout>
      <main>
        <section
        className="pt-8"
        id="reset"
        >
           <h2 className="mb-4 text-center text-md text-txt">
              Forgotten your password?
           </h2>
            <p className="mb-4 text-center text-pink-400 text-md">
              Reset it below.
            </p>
          <ResetForm />
        </section>
      </main>
    </Layout>
    </>
  );
}

export default Reset;
