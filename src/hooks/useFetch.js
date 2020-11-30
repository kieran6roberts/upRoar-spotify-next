import useSWR from "swr";
import fetch from "isomorphic-fetch";

export const fetcher = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
    catch(err) {
      console.error(err);
    }
};

const useSWRFetch = (baseUrl, path) => {
  if (!path) throw new Error("Required path");

  const url = `${baseUrl}/${path}`;

  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};

export default useSWRFetch;