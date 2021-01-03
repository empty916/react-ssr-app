import { createStore, createInject, Store } from 'natur';
import {
	promiseMiddleware,
	shallowEqualMiddleware,
	thunkMiddleware,
	filterUndefinedMiddleware,
	fillObjectRestDataMiddleware,
} from 'natur/dist/middlewares';
import { localStorageMiddleware, getData, clearData } from './plugins/persist';
import app from './app';
import * as page2 from './page2/store';
import { createPromiseWatcherMiddleware } from 'natur-promise-watcher';
import { isBrowser, isPromise } from '@/utils';
import { services } from '../utils/collect-class';
import { createHttp } from '../http';


const modules = {
	app,
	page2,
};

export type M = typeof modules;
export type LM = {};



export const initStore = (data: any = {}) => {
	const http = createHttp();

	const {
		collectPromiseMiddleware,
		promiseActionsFinishedPromise,
	} = createPromiseWatcherMiddleware();

	const store = createStore(modules, {}, {
		initStates: data,
		interceptors: [
			isBrowser ? null : () => next => record => {
				record.actionArgs.push(http);
				return next(record);
			},
			() => next => record => {
				try {
					return next(record);
				} catch (error) {
					console.log(record.moduleName, record.actionName, error);
				}
			},
		].filter(Boolean),
		middlewares: [
			thunkMiddleware,
			() => next => record => {
				const res = next(record);
				if (isPromise(record.state)) {
					return res.then(data => promiseActionsFinishedPromise()
						.then(() => data)).catch(error => {
						console.log(record.moduleName, record.actionName, error);
						throw error;
					});
				}
				return res;
			},
			isBrowser ? null : collectPromiseMiddleware,
			promiseMiddleware,
			fillObjectRestDataMiddleware,
			shallowEqualMiddleware,
			filterUndefinedMiddleware,
			isBrowser ? localStorageMiddleware : null,
			() => next => record => {
				console.log(record.moduleName, record.actionName, record.state);
				return next(record);
			},
		].filter(Boolean),
	});

	const serviceInsArr = isBrowser ? [] : services.map(s => new s(store));

	return store;
};


export type StoreType = typeof store.type;

const initServerData = (global as any)?.__NEXT_DATA__?.props?.pageProps || {};

const lsData = isBrowser ? (getData() || {}) : {};

const store = initStore({
	...lsData,
	...initServerData,
});
export type S = Store<M, LM>;
(global as any).store = store;
export default store;
export const inject = createInject({
	storeGetter: () => (global as any).store as typeof store,
});
