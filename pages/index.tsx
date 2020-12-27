import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { inject } from "../store";
import utilStyles from "../styles/utils.module.css";
import { getServerSidePropsArg } from "../utils";
import { Field, useFormik, FormikProvider } from 'formik';
import { TextField, RadioGroup } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import {
	Button,
	LinearProgress,
	FormControlLabel,
	Radio,
} from '@material-ui/core';
import _JSXStyle from 'styled-jsx/style'


const injector = inject("app", 'page2');

function Home({ app, page2}: typeof injector.type) {
	const { actions } = page2;
	const formikbag = useFormik({
		initialValues: {
			email: '',
			date: '',
			password: '',
			checked: false,
			activity: '',
		},
		onSubmit: (values, { setSubmitting }) => {
			setSubmitting(false);
			actions.changePageName(values.email);
			// console.log(JSON.stringify(values, null, 2));
		},
	});
	const { isSubmitting, submitForm } = formikbag;

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<style jsx>{`
				p {
					color: red;
					display: flex;
				}
				.my-p {
					border-top: 1px solid blue;
				}
				section {
					p {
						margin-top: 20px;
					}
					& > p {
						border-bottom: 1px solid #000;
					}
				}
			`}</style>
			<section className={utilStyles.headingMd}>
				<p className='my-p'>email: empty916@qq.com</p>
				<p>name: {app.state.name}</p>
				<p>
					(This is a sample website - you’ll be building a site like
					this in{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>
					.)
				</p>
			</section>
			<FormikProvider value={formikbag}>
				<Field
					component={DatePicker}
					label="date"
					cancelLabel="取消"
					okLabel="确定"
					name="date"
				/>
				<br />
				<Field
					component={TextField}
					name="email"
					type="email"
					label="Email"
					validate={(v: string) => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(v)
						? 'Invalid email address'
						: undefined)}
				/>
				<br />
				<br />
				<Field
					component={RadioGroup}
					name="activity"
					validate={(v: any) => (!!v ? undefined : 'acivity required!')}
				>
					<FormControlLabel
						value="painting"
						control={<Radio disabled={isSubmitting} />}
						label="Painting"
						disabled={isSubmitting}
					/>
					<FormControlLabel
						value="drawing"
						control={<Radio disabled={isSubmitting} />}
						label="Drawing"
						disabled={isSubmitting}
					/>
					<FormControlLabel
						value="none"
						control={<Radio disabled={isSubmitting} />}
						label="None"
						disabled
					/>
				</Field>
				<br />
				<Field
					component={TextField}
					type="password"
					label="Password"
					name="password"
				/>
				{isSubmitting && <LinearProgress />}
				<br />
				<Button
					variant="contained"
					color="primary"
					disabled={isSubmitting}
					onClick={submitForm}
				>
					Submit
				</Button>
			</FormikProvider>
		</Layout>
	);
}

export default injector(Home);

export const getServerSideProps = async ({ req, query }: getServerSidePropsArg) => {
	await req.store.dispatch("app", "fetch", query.user, Number(query.time));
	return { props: req.store.getAllStates() };
};
