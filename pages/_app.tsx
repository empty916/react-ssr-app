import { initStore } from "../store";
import "../styles/globals.css";
import "../services";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import zhLocale from 'date-fns/locale/zh-CN';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider, jssPreset, StylesProvider } from '@material-ui/core/styles';
import materialTheme from '../theme/material';
import { CssBaseline } from '@material-ui/core';
import { isBrowser } from "../utils";
// const _JSXStyle = require('styled-jsx/style').default

// if (typeof global !== 'undefined') {
// 	Object.assign(global, { _JSXStyle })
// }

class LocalizedUtils extends DateFnsUtils {
	dateFormat = 'yyyy-MM-dd';

	yearFormat = 'yyyy';

	yearMonthFormat = 'yyyy-MM';

	dateTime12hFormat= 'yyyy-MM-dd HH:mm:ss';

	dateTime24hFormat= 'yyyy-MM-dd HH:mm:ss';
}

export default function App(props) {
	if (!process.browser) {
		(global as any).store = props.store || (global as any).store;
	}
	const { Component, pageProps } = props;
	return (
		<MuiPickersUtilsProvider utils={LocalizedUtils} locale={zhLocale}>
			<Component {...pageProps} />
		</MuiPickersUtilsProvider>
	);
}



App.getInitialProps = ({ ctx, pathname }) => {
	ctx.req.store = initStore(pathname || "/");
	return { store: ctx.req.store };
};
