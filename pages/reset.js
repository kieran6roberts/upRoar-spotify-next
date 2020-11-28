import Layout from "src/containers/Layout/Layout";
import ResetForm from "src/containers/ResetForm/ResetForm"

const Reset = () => {
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
          <ResetForm />
        </section>
      </main>
    </Layout>
  )
};

export default Reset;