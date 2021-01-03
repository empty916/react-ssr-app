import { Http } from '@/utils/action-ctx';

const state = {
	name: '',
};

const actions = {
	fetch: async (name: string = 'empty916', time: number = 100, http?: Http) => {
		await new Promise<void>(res => setTimeout(() => {
			res();
		}, time));
		return {name};
	},
};

export default {
	state,
	actions,
};
