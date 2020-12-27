import { initStore } from "../store";
import "../styles/globals.css";
import "../services";

export default function App(props) {
	if (!process.browser) {
		(global as any).store = props.store || (global as any).store;
	}
	const { Component, pageProps } = props;
	return <Component {...pageProps} />;
}

App.getInitialProps = ({ ctx, pathname }) => {
	ctx.req.store = initStore(pathname || "/");
	return { store: ctx.req.store };
};
