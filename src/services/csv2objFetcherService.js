import _orderBy from "lodash.orderby";
import _zipObject from "lodash.zipobject";

const csv2objConverterService = (url) =>
  fetch(url).then(async (res) => {
    // Fetch by default will not throw an error for 4xx status codes.
    if (res.status >= 400 && res.status <= 499) {
      throw new Error("API Client Error");
    }

    const result = await res.json();

    let converted = [];
    for (let i = 1; i < result.length; i++) {
      converted.push(_zipObject(result[0], result[i]));
    }

    const data = _orderBy(converted, ["NAME"], ["asc"]);

    const response = {
      data: res.status === 200 ? data : null,
      status: res.status,
    };

    return response;
  });

export default csv2objConverterService;
