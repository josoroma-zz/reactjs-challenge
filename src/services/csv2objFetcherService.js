import csv2objConverterService from "./csv2objConverterService";

const fetcher = (url) =>
  fetch(url).then(async (res) => {
    const result = await res.json();
    const data = csv2objConverterService(result);
    return data;
  });

export default fetcher;
