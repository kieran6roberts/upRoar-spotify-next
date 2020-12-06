import Layout from "src/containers/Layout/Layout";

const artists = () => {
    return (
        <Layout>
            
        </Layout>
    )
};

export async function getServerSideProps(ctx) {
    return {
        props: {}
    }
}

export default artists;