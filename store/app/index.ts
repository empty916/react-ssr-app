import { Ctx } from "../../utils/action-ctx";

const state = {
    name: '',
}

const actions = {
    fetch: async (name: string = 'empty916', time: number = 100, ctx?: Ctx) => {
        await new Promise<void>(res => setTimeout(() => {
            res();
        }, time));
        // console.log(ctx.http);
        return {name};
    }
}

export default {
    state,
    actions,
}