import { initStore } from '@/store';
import '@/styles/globals.css';
import 'antd/dist/antd.css';
import '@/services';
import { isBrowser } from '@/utils';


export default function App({pageProps, Component, store, ...props}) {
	if (!isBrowser) {
		(global as any).store = store || (global as any).store;
	}
	return (
		<Component {...props} />
	);
}

App.getInitialProps = ({ ctx, pathname }) => {
	ctx.req.store = initStore(pathname || '/');
	return { store: ctx.req.store };
};
