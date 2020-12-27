import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import store, { inject, S } from "../store";
import utilStyles from "../styles/utils.module.css";
import { getServerSidePropsArg } from "../utils";

const injector = inject("app");

function Home({ app }: typeof injector.type) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>email: empty916@qq.com</p>
				<p>name: {app.state.name}</p>
				<p>
					(This is a sample website - you’ll be building a site like
					this in{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>
					.)
				</p>
			</section>
		</Layout>
	);
}

export default injector(Home);

export const getServerSideProps = async ({ req, query }: getServerSidePropsArg) => {
	await req.store.dispatch("app", "fetch", query.user, Number(query.time));
	return { props: req.store.getAllStates() };
};
