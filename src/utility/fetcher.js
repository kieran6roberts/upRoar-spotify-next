import fetch from "isomorphic-fetch";

// eslint-disable-next-line func-style
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
