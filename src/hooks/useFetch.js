import fetch from "isomorphic-fetch";
 /*
export const fetcher = async (...args) => {
  try {
    const response = await fetch(...args);
    const data = await response.json();
    return data;
  }
    catch(err) {
      console.error(err);
    }
};*/

export const fetcher = (...args) => fetch(...args).then(res => res.json()); 