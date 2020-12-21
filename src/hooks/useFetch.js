import fetch from "isomorphic-fetch";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
