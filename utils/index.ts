import { S } from "../store";

export const isBrowser = !!process.browser;

export const isPromise = (target: any): target is Promise<any> => {
	return (
		typeof target?.then === "function" &&
		typeof target?.catch === "function" &&
		typeof target?.finally === "function"
	);
};

export type getServerSidePropsArg = {
	req: {
        store: S
    };
    query: {
        [s: string]: string;
    }
};