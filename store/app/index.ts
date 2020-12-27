
const state = {
    name: '',
}

const actions = {
    fetch: async (name: string = '1111', ctx?: any) => {
        await new Promise<void>(res => setTimeout(() => {
            res();
        }, 100));
        // console.log(ctx.http);
        return {name};
    }
}

export default {
    state,
    actions,
}