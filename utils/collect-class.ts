
export const services = [];
export const collect = <T extends any>(t: T) => {
    services.push(t);
    return t;
}