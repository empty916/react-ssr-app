import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import utilStyles from '@/styles/utils.module.css';
import { getServerSidePropsArg } from '@/utils';
import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { inject } from '@/store';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const injector = inject('app', 'page2');

function Home({ app, page2 }: typeof injector.type) {
	const onFinish = React.useCallback(values => {
		console.log('Success:', values);
	}, []);

	const onFinishFailed = React.useCallback(errorInfo => {
		console.log('Failed:', errorInfo);
	}, []);

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p className="ml-8">email: empty916@qq.com</p>
				<p>
					name:
					{' '}
					{app.state.name}
				</p>
				<p>
					(This is a sample website - you’ll be building a site like
					this in
					{' '}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>
					.)
				</p>
			</section>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					{...tailLayout}
					name="remember"
					valuePropName="checked"
				>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Layout>
	);
}

export default injector(Home);

export const getServerSideProps = async ({
	req,
	query,
}: getServerSidePropsArg) => {
	await req.store.dispatch('app', 'fetch', query.user, Number(query.time));
	return { props: req.store.getAllStates() };
};
