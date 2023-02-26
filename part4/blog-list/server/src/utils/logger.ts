const out = (...params: unknown[]) => {
    if (process.env.NODE_ENV !== "test")
        console.log(...params);
}
const err = (...params: unknown[]) => {
    if (process.env.NODE_ENV !== "test")
        console.error(...params)
};

export default {
    out,
    err
};